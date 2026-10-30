# jhayward9.github.io

Personal site for Jesse Hayward, hosted on GitHub Pages:
**https://jhayward9.github.io/**

A mobile-first, single-page site built with plain HTML, CSS, and JavaScript — no
framework and no build step.

## Design

The projects page follows the visual language of **https://jhayward.org** without
recreating its Mac OS-inspired dock:

- Black canvas, Gaelic green (`#2d835b`) hero type, and bright green accents
- Press Start 2P for the name, labels, and badges; SF Pro/system sans for body copy
- Colorful macOS-style app-icon tiles for each project, with a per-project accent
- Subtle window chrome (title bar and traffic-light dots) on the profile, contact,
  and featured bet-slip panels
- A standard sticky top navigation, not a dock

## Structure

- `index.html` — page content, project cards, metadata, and social preview tags
- `style.css` — design tokens, layout, project accents, and responsive styles
- `script.js` — active nav, scroll reveals, live GitHub counts, the Edmonton
  clock, and project cards rendered from `projects.json`
- `projects.manifest.json` — hand-curated project copy: titles, icons, accents, tags
- `assets/` — avatar and favicon

## Projects manifest

`projects.manifest.json` is the source of truth for anything only a human can
write. Automation fills in the rest (description, language, stars, last push)
from the GitHub API.

To add a project, append an entry to `projects` with:

| Field | Purpose |
| --- | --- |
| `repo` | `owner/name`, or just `name` to use `defaultOwner` |
| `title`, `description` | Card copy |
| `icon` | Symbol name from `index.html` (e.g. `trophy` → `#i-trophy`) |
| `accent` | `green`, `pink`, `violet`, `blue`, `orange`, `indigo` |
| `badge` | Small label, optional |
| `tags`, `tagLabel` | Tag chips and their accessible label |
| `kicker` | Sub-heading, used on the featured card |
| `featured` | Promotes the card to the wide layout |
| `extraLinks` | Extra buttons, e.g. npm |
| `languageLabel`, `languageColor` | Override the repo's detected language |
| `keepWhenMissing` | Keep rendering if the repo is private or gone |
| `note` | Maintenance comment; never rendered |
| `visible` | Set `false` to hide without deleting |

Array order is display order. Language color resolution is
`languageColor` → `languageColors[languageLabel]` → `languageColors[repo language]`.

## Syncing project data

`projects.json` is generated — edit `projects.manifest.json` instead.

```powershell
node scripts/sync-projects.mjs          # regenerate
node scripts/sync-projects.mjs --check  # validate and fetch, write nothing
```

Requires Node 18+. Set `GITHUB_TOKEN` to raise the API limit from 60 to 5,000
requests per hour; CI sets it automatically. The script:

- keeps manifest order, then appends public repos you own that aren't listed yet
- drops a repo that has gone private, unless the entry sets `keepWhenMissing`
- flags unreachable repos with `missing: true` so the card can hide dead links
- fails on unknown icons, unknown accents, duplicate repos, or a rate limit, and
  leaves the previous `projects.json` untouched

Output is deterministic, so a sync only produces a commit when repo data
actually changed.

## Automation

`.github/workflows/sync-projects.yml` regenerates `projects.json` hourly and
whenever the manifest, script, or workflow changes, then commits the result.

- Scheduled for `:23` past each hour. GitHub can delay or skip scheduled runs,
  and disables them on public repos after 60 days without activity.
- Uses the built-in `GITHUB_TOKEN`, so no secrets are needed. Private repos stay
  invisible — listing those would require a personal access token.
- Bot commits touch only `projects.json`, which is not in the workflow's `paths`
  filter, so they cannot retrigger it.
- The bot commit lands on `main`, which triggers the branch-based Pages deploy.
- If `main` ever gains branch protection that blocks direct pushes, allow
  `github-actions[bot]` to push or the sync will fail.

Run it on demand from **Actions → Sync project data → Run workflow**.

## Local preview

Open `index.html` directly, or serve the folder:

```powershell
python -m http.server 4173
```

Then visit `http://127.0.0.1:4173/`.

## Notes

- The site is dark-only, matching the current personal site.
- Project cards and the section intro render from `projects.json` when it is
  reachable; the cards in `index.html` are the fallback for no JavaScript, an
  offline reader, or a failed fetch.
- GitHub profile counts are enhanced with a request to the GitHub API; the
  static values in the HTML are the fallback.
- The page works without JavaScript, and all motion respects
  `prefers-reduced-motion`.
