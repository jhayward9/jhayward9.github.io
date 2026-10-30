#!/usr/bin/env node
/* ==========================================================================
   sync-projects.mjs

   Turns projects.manifest.json (hand-curated copy) plus live GitHub repo
   metadata into projects.json, which the site renders at runtime.

   Usage:
     node scripts/sync-projects.mjs            # fetch, merge, write
     node scripts/sync-projects.mjs --check    # fetch and validate only
     node scripts/sync-projects.mjs --quiet    # suppress warnings

   Auth: set PROJECTS_TOKEN (a personal access token) to include private repos
   and raise the limit from 60 to 5,000 req/hr. GITHUB_TOKEN / GH_TOKEN also work.
   Override the endpoint with GITHUB_API_BASE (offline tests / Enterprise).
   Exits non-zero on any hard failure, so a broken sync never publishes.
   ========================================================================== */

import { readFile, writeFile, rename, unlink } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const MANIFEST_PATH = path.join(ROOT, "projects.manifest.json");
const OUTPUT_PATH = path.join(ROOT, "projects.json");
const HTML_PATH = path.join(ROOT, "index.html");
const CSS_PATH = path.join(ROOT, "style.css");

const API = process.env.GITHUB_API_BASE || "https://api.github.com";
const FALLBACK_LANGUAGE_COLOR = "#8b949e";

const args = new Set(process.argv.slice(2));
const CHECK_ONLY = args.has("--check");
const QUIET = args.has("--quiet");

const warnings = [];

function warn(message) {
  warnings.push(message);
  if (!QUIET) console.warn(`warning: ${message}`);
}

function info(message) {
  if (!QUIET) console.log(message);
}

/* --- GitHub API --------------------------------------------------------- */

const TOKEN_SOURCE = process.env.PROJECTS_TOKEN
  ? "PROJECTS_TOKEN"
  : process.env.GITHUB_TOKEN
  ? "GITHUB_TOKEN"
  : process.env.GH_TOKEN
  ? "GH_TOKEN"
  : null;

/* A personal access token can list private repos; github.token is an
   installation token and cannot call /user/repos, so it only gets the public
   listing. Both are cleared if the API rejects the credential. */
const IS_PAT = TOKEN_SOURCE === "PROJECTS_TOKEN" || TOKEN_SOURCE === "GH_TOKEN";

let TOKEN = TOKEN_SOURCE ? process.env[TOKEN_SOURCE] : "";
let TOKEN_REJECTED = false;
let CAN_LIST_ALL_REPOS = Boolean(TOKEN) && IS_PAT;

const HEADERS = {
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
  "User-Agent": "jhayward9.github.io-project-sync"
};

if (TOKEN) HEADERS.Authorization = `Bearer ${TOKEN}`;

async function request(url) {
  const response = await fetch(url, { headers: HEADERS });
  const status = response.status;

  let data = null;
  let message = "";

  try {
    data = await response.json();
    if (!response.ok && data && typeof data.message === "string") {
      message = data.message;
    }
  } catch {
    data = null;
  }

  return {
    url,
    status,
    ok: response.ok,
    data,
    message,
    remaining: response.headers.get("x-ratelimit-remaining"),
    reset: Number(response.headers.get("x-ratelimit-reset") || 0)
  };
}

/** Explains a failure precisely: rate limit, rejected credential, or other. */
function describeFailure(res) {
  const detail = res.message ? `: ${res.message}` : "";
  const reset = res.reset ? new Date(res.reset * 1000).toISOString() : "later";

  const limited =
    res.status === 429 ||
    (res.status === 403 &&
      (res.remaining === "0" || /rate limit/i.test(res.message)));

  if (limited) {
    return new Error(
      `GitHub API rate limited (${res.status}) on ${res.url}; resets ${reset}. ` +
        (TOKEN && TOKEN_SOURCE
          ? `Using ${TOKEN_SOURCE}.`
          : "No token set: the anonymous limit is 60/hour and is shared with other jobs on the runner.")
    );
  }

  if (res.status === 401 || res.status === 403) {
    return new Error(
      `GitHub API rejected ${TOKEN_SOURCE || "the anonymous request"} (${res.status}) ` +
        `on ${res.url}${detail}. Check that the token is valid and can read the repos you expect.`
    );
  }

  return new Error(`GitHub API ${res.status} on ${res.url}${detail}`);
}

/** Fails early when PROJECTS_TOKEN is broken, but keeps the public sync alive. */
async function preflight() {
  if (!CAN_LIST_ALL_REPOS) {
    info(
      `auth: ${
        TOKEN_SOURCE
          ? `${TOKEN_SOURCE} (installation token, public repos only)`
          : "anonymous (60 requests/hour)"
      }`
    );
    return;
  }

  const res = await request(`${API}/rate_limit`);

  if (res.ok) {
    info(`auth: ${TOKEN_SOURCE} (${res.data.resources.core.remaining} requests left)`);
    return;
  }

  const rejected =
    res.status === 401 ||
    (res.status === 403 && !/rate limit/i.test(res.message) && res.remaining !== "0");

  if (rejected) {
    TOKEN_REJECTED = true;
    TOKEN = "";
    CAN_LIST_ALL_REPOS = false;
    delete HEADERS.Authorization;
    warn(
      `${TOKEN_SOURCE} was rejected (${res.status}${
        res.message ? `: ${res.message}` : ""
      }); continuing with public repos only. Replace the secret to list private repos.`
    );
    return;
  }

  throw describeFailure(res);
}

/* --- Helpers ------------------------------------------------------------ */

function fullName(entry, fallbackOwner) {
  const raw = String(entry.repo || "").trim();
  if (!raw) return null;
  return raw.includes("/") ? raw : `${fallbackOwner}/${raw}`;
}

function prettify(name) {
  return name
    .replace(/[-_.]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .map((word) => (word ? word[0].toUpperCase() + word.slice(1) : word))
    .join(" ");
}

/** Normalises repo descriptions: collapses whitespace and drops wrapping quotes. */
function cleanText(value) {
  const text = String(value || "")
    .replace(/\s+/g, " ")
    .trim();

  if (text.length > 1) {
    const first = text[0];
    const last = text[text.length - 1];
    if ((first === '"' && last === '"') || (first === "'" && last === "'")) {
      return text.slice(1, -1).trim();
    }
  }

  return text;
}

function resolveLanguage(entry, repo, colors) {
  const label = entry.languageLabel || (repo && repo.language) || null;
  if (!label) return null;

  const color =
    entry.languageColor ||
    colors[label] ||
    (repo && repo.language && colors[repo.language]) ||
    FALLBACK_LANGUAGE_COLOR;

  if (!entry.languageColor && !colors[label] && !(repo && colors[repo.language])) {
    warn(`no colour known for language "${label}" (${entry.repo}); using fallback`);
  }

  return { label, color };
}

/* --- Manifest validation ------------------------------------------------ */

async function loadDesignTokens() {
  const tokens = { icons: new Set(), accents: new Set() };

  try {
    const html = await readFile(HTML_PATH, "utf8");
    for (const match of html.matchAll(/<symbol id="i-([a-z0-9-]+)"/g)) {
      tokens.icons.add(match[1]);
    }
  } catch {
    warn("index.html not readable; skipping icon validation");
  }

  try {
    const css = await readFile(CSS_PATH, "utf8");
    for (const match of css.matchAll(/\.project\[data-accent="([a-z]+)"\]/g)) {
      tokens.accents.add(match[1]);
    }
  } catch {
    warn("style.css not readable; skipping accent validation");
  }

  return tokens;
}

function validateEntry(entry, index, tokens, defaults) {
  const where = entry.repo || `projects[${index}]`;
  const problems = [];

  if (!entry.repo) problems.push("missing repo");
  if (!entry.description) problems.push("missing description");

  const icon = entry.icon || defaults.icon;
  const accent = entry.accent || defaults.accent;

  if (tokens.icons.size && !tokens.icons.has(icon)) {
    problems.push(`unknown icon "${icon}" (no #i-${icon} symbol)`);
  }
  if (tokens.accents.size && !tokens.accents.has(accent)) {
    problems.push(`unknown accent "${accent}" (no [data-accent="${accent}"] rule)`);
  }
  if (entry.tags && !Array.isArray(entry.tags)) problems.push("tags must be an array");

  return problems.map((problem) => `${where}: ${problem}`);
}

/* --- Build -------------------------------------------------------------- */

/**
 * Repos owned by the profile. /user/repos is the only listing that includes
 * private repos, and it only works for a personal access token. github.token is
 * an installation token and cannot call it, so that case uses the public list.
 */
async function listOwnedRepos(profile) {
  if (CAN_LIST_ALL_REPOS) {
    const privateRes = await request(
      `${API}/user/repos?per_page=100&affiliation=owner&visibility=all&sort=pushed`
    );

    if (privateRes.ok) return privateRes.data;

    if (privateRes.status === 403 || privateRes.status === 404) {
      warn(
        `/user/repos unavailable (${privateRes.status}` +
          `${privateRes.message ? `: ${privateRes.message}` : ""}); using public repos only`
      );
    } else {
      throw describeFailure(privateRes);
    }
  }

  const publicRes = await request(
    `${API}/users/${profile}/repos?per_page=100&type=owner&sort=pushed`
  );

  if (!publicRes.ok) throw describeFailure(publicRes);
  return publicRes.data;
}

async function build() {
  await preflight();

  const manifest = JSON.parse(await readFile(MANIFEST_PATH, "utf8"));
  const tokens = await loadDesignTokens();

  const profile = manifest.profile;
  const fallbackOwner = manifest.defaultOwner || profile;
  const colors = manifest.languageColors || {};
  const defaults = manifest.defaults || {};
  const auto = manifest.autoInclude || { enabled: false };

  if (!profile) throw new Error("manifest is missing a profile");

  const problems = [];
  const seen = new Set();

  for (const [index, entry] of (manifest.projects || []).entries()) {
    problems.push(...validateEntry(entry, index, tokens, defaults));

    const slug = fullName(entry, fallbackOwner);
    if (!slug) continue;
    if (seen.has(slug.toLowerCase())) problems.push(`${slug}: listed more than once`);
    seen.add(slug.toLowerCase());
  }

  if (problems.length) {
    throw new Error(`manifest validation failed:\n  ${problems.join("\n  ")}`);
  }

  /* Curated entries, in manifest order. */
  const projects = [];

  for (const entry of manifest.projects || []) {
    if (entry.visible === false) {
      info(`skip (hidden): ${entry.repo}`);
      continue;
    }

    const slug = fullName(entry, fallbackOwner);
    const res = await request(`${API}/repos/${slug}`);

    if (!res.ok && res.status !== 404) throw describeFailure(res);

    const repo = res.ok ? res.data : null;

    if (!repo && !entry.keepWhenMissing) {
      warn(
        CAN_LIST_ALL_REPOS
          ? `${slug} was not found; dropped from the page`
          : TOKEN_REJECTED
          ? `${slug} is not public and PROJECTS_TOKEN was rejected; dropped from the page`
          : `${slug} is not public and no PROJECTS_TOKEN is set; dropped from the page`
      );
      continue;
    }
    if (!repo) {
      warn(`${slug} was not found; keeping curated copy`);
    }

    const name = slug.split("/")[1];
    const owner = slug.split("/")[0];

    projects.push({
      repo: slug,
      name,
      owner,
      missing: !repo,
      private: repo ? Boolean(repo.private) : false,
      title: entry.title || prettify(name),
      kicker: entry.kicker || null,
      description: cleanText(entry.description || (repo && repo.description)),
      badge: entry.badge || defaults.badge || null,
      icon: entry.icon || defaults.icon,
      accent: entry.accent || defaults.accent,
      featured: Boolean(entry.featured),
      tagLabel: entry.tagLabel || defaults.tagLabel || "Details",
      tags: entry.tags || (repo && repo.topics) || [],
      language: resolveLanguage(entry, repo, colors),
      url: `https://github.com/${slug}`,
      homepage: (repo && repo.homepage) || null,
      stars: repo ? repo.stargazers_count : null,
      forks: repo ? repo.forks_count : null,
      pushedAt: repo ? repo.pushed_at : null,
      archived: repo ? Boolean(repo.archived) : false,
      fork: repo ? Boolean(repo.fork) : false,
      extraLinks: entry.extraLinks || []
    });
  }

  /* Public repos you own that the manifest has never heard of. */
  if (auto.enabled) {
    const skip = new Set((auto.skip || []).map((name) => name.toLowerCase()));
    const curated = new Set(
      (manifest.projects || []).map((entry) =>
        (fullName(entry, fallbackOwner) || "").toLowerCase()
      )
    );

    const listing = await listOwnedRepos(profile);

    if (!listing) {
      warn(`could not list repos for ${profile}; skipping auto-include`);
    } else {
      const fresh = listing
        .filter((repo) => !curated.has(repo.full_name.toLowerCase()))
        .filter((repo) => !skip.has(repo.name.toLowerCase()))
        .filter((repo) => !(auto.excludeForks && repo.fork))
        .filter((repo) => !(auto.excludeArchived && repo.archived))
        .sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at));

      for (const repo of fresh) {
        info(`auto-included: ${repo.full_name}`);
        projects.push({
          repo: repo.full_name,
          name: repo.name,
          owner: repo.owner.login,
          missing: false,
          private: Boolean(repo.private),
          title: prettify(repo.name),
          kicker: null,
          description: cleanText(repo.description),
          badge: repo.private ? "Private" : defaults.badge || null,
          icon: defaults.icon,
          accent: defaults.accent,
          featured: false,
          tagLabel: defaults.tagLabel || "Details",
          tags: repo.topics || [],
          language: resolveLanguage({ repo: repo.full_name }, repo, colors),
          url: repo.html_url,
          homepage: repo.homepage || null,
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          pushedAt: repo.pushed_at,
          archived: Boolean(repo.archived),
          fork: Boolean(repo.fork),
          extraLinks: []
        });
      }
    }
  }

  /* Count only repos that exist under your own account, public or private. */
  const count = projects.filter(
    (project) =>
      !project.missing && project.owner.toLowerCase() === profile.toLowerCase()
  ).length;

  if (!TOKEN && !TOKEN_REJECTED) {
    warn(
      "no PROJECTS_TOKEN set: private repos are invisible, so a 404 may mean private rather than deleted"
    );
  }

  const copy = manifest.copy || {};
  const introTemplate = copy.intro || "{count} public repositories.";
  const intro = introTemplate.replace(/\{count\}/g, String(count));

  return {
    schemaVersion: manifest.schemaVersion || 1,
    profile,
    count,
    intro,
    allRepositories: copy.allRepositories || "All repositories",
    repositoriesUrl: `https://github.com/${profile}?tab=repositories`,
    projects
  };
}

/* --- Write -------------------------------------------------------------- */

async function main() {
  const output = await build();
  const json = `${JSON.stringify(output, null, 2)}\n`;

  if (CHECK_ONLY) {
    info(`check ok: ${output.projects.length} projects, count ${output.count}`);
    return;
  }

  const temp = `${OUTPUT_PATH}.tmp`;
  await writeFile(temp, json, "utf8");
  try {
    await rename(temp, OUTPUT_PATH);
  } catch (error) {
    await unlink(temp).catch(() => {});
    throw error;
  }

  info(`wrote projects.json: ${output.projects.length} projects, count ${output.count}`);
  if (warnings.length) info(`${warnings.length} warning(s)`);
}

main().catch((error) => {
  console.error(`error: ${error.message}`);
  process.exitCode = 1;
});
