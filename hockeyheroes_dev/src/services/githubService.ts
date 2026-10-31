export interface GitHubCommitInfo {
  sha: string;
  shortSha: string;
  message: string;
  authorName: string;
  authorDate: string;
  htmlUrl: string;
}

export interface GitHubRepoStatus {
  connected: boolean;
  isPrivate: boolean;
  repoName: string;
  owner: string;
  defaultBranch: string;
  latestCommit?: GitHubCommitInfo;
  error?: string;
  lastChecked: string;
}

const STORAGE_KEY_TOKEN = 'hh_github_pat';
const STORAGE_KEY_REPO = 'hh_github_repo';
const DEFAULT_REPO = 'jhayward9/hockeyheroes';

export function getStoredGitHubToken(): string {
  try {
    return localStorage.getItem(STORAGE_KEY_TOKEN) || '';
  } catch {
    return '';
  }
}

export function setStoredGitHubToken(token: string): void {
  try {
    if (token) {
      localStorage.setItem(STORAGE_KEY_TOKEN, token.trim());
    } else {
      localStorage.removeItem(STORAGE_KEY_TOKEN);
    }
  } catch {
    // ignore local storage errors
  }
}

export function getStoredGitHubRepo(): string {
  try {
    return localStorage.getItem(STORAGE_KEY_REPO) || DEFAULT_REPO;
  } catch {
    return DEFAULT_REPO;
  }
}

export function setStoredGitHubRepo(repo: string): void {
  try {
    localStorage.setItem(STORAGE_KEY_REPO, repo.trim() || DEFAULT_REPO);
  } catch {
    // ignore
  }
}

/**
 * Checks connection to the GitHub repository.
 * Supports public access as well as Fine-Grained Personal Access Tokens for private repos.
 */
export async function fetchGitHubRepoStatus(
  repoFullName: string = DEFAULT_REPO,
  token?: string
): Promise<GitHubRepoStatus> {
  const effectiveToken = token !== undefined ? token.trim() : getStoredGitHubToken();
  const [owner, repo] = repoFullName.split('/');
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github.v3+json',
  };

  if (effectiveToken) {
    headers['Authorization'] = `Bearer ${effectiveToken}`;
  }

  const result: GitHubRepoStatus = {
    connected: false,
    isPrivate: false,
    repoName: repo || 'hockeyheroes',
    owner: owner || 'jhayward9',
    defaultBranch: 'main',
    lastChecked: new Date().toISOString(),
  };

  try {
    // 1. Fetch Repo Metadata
    const repoRes = await fetch(`https://api.github.com/repos/${repoFullName}`, { headers });
    
    if (repoRes.status === 404) {
      result.error = effectiveToken 
        ? 'Repository not found or token lacks permissions for this repository.'
        : 'Repository is private (GitHub returned 404). Add a read-only Personal Access Token to connect, or set the repository to public.';
      result.isPrivate = !effectiveToken;
      return result;
    }

    if (repoRes.status === 401 || repoRes.status === 403) {
      const data = await repoRes.json().catch(() => ({}));
      result.error = data.message || 'GitHub API rate-limit exceeded or authentication expired. Provide a Personal Access Token.';
      return result;
    }

    if (!repoRes.ok) {
      result.error = `GitHub API error: HTTP ${repoRes.status}`;
      return result;
    }

    const repoData = await repoRes.json();
    result.isPrivate = Boolean(repoData.private);
    result.defaultBranch = repoData.default_branch || 'main';

    // 2. Fetch Latest Commit
    const commitRes = await fetch(
      `https://api.github.com/repos/${repoFullName}/commits/${result.defaultBranch}`,
      { headers }
    );

    if (commitRes.ok) {
      const commitData = await commitRes.json();
      result.connected = true;
      result.latestCommit = {
        sha: commitData.sha,
        shortSha: commitData.sha.substring(0, 7),
        message: commitData.commit?.message?.split('\n')[0] || 'Update',
        authorName: commitData.commit?.author?.name || commitData.author?.login || 'Developer',
        authorDate: commitData.commit?.author?.date || new Date().toISOString(),
        htmlUrl: commitData.html_url || `https://github.com/${repoFullName}/commit/${commitData.sha}`,
      };
    } else {
      result.connected = true; // repo access worked even if commits endpoint had issue
    }

    return result;
  } catch (err) {
    result.error = err instanceof Error ? err.message : 'Network failure when connecting to GitHub API.';
    return result;
  }
}

/**
 * Fetches the contents of a file (e.g. PROGRESS_REPORT_CONTEXT.md or metrics.json) from the repo.
 */
export async function fetchFileFromRepo(
  filePath: string,
  repoFullName: string = DEFAULT_REPO,
  branch: string = 'main',
  token?: string
): Promise<{ success: boolean; content?: string; error?: string }> {
  const effectiveToken = token !== undefined ? token.trim() : getStoredGitHubToken();
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github.v3.raw',
  };

  if (effectiveToken) {
    headers['Authorization'] = `Bearer ${effectiveToken}`;
  }

  try {
    const res = await fetch(
      `https://api.github.com/repos/${repoFullName}/contents/${filePath}?ref=${branch}`,
      { headers }
    );

    if (!res.ok) {
      return { success: false, error: `File not found in ${repoFullName}@${branch} (HTTP ${res.status})` };
    }

    const text = await res.text();
    return { success: true, content: text };
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : 'Fetch failed' };
  }
}
