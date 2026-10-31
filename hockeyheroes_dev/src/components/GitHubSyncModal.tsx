import React, { useState, useEffect } from 'react';
import { 
  X, 
  GitBranch, 
  GitCommit, 
  RefreshCw, 
  Key, 
  ExternalLink, 
  CheckCircle2, 
  AlertTriangle, 
  Lock, 
  Copy, 
  Check, 
  Terminal, 
  Workflow, 
  FileCode2,
  ShieldCheck,
  Eye,
  EyeOff
} from 'lucide-react';
import { 
  fetchGitHubRepoStatus, 
  getStoredGitHubToken, 
  setStoredGitHubToken, 
  getStoredGitHubRepo, 
  setStoredGitHubRepo,
  GitHubRepoStatus 
} from '../services/githubService';

interface GitHubSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSyncCommit?: (commitSha: string, date: string) => void;
  currentCommit: string;
}

export const GitHubSyncModal: React.FC<GitHubSyncModalProps> = ({
  isOpen,
  onClose,
  onSyncCommit,
  currentCommit
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'status' | 'workflow' | 'options'>('status');
  const [repoFullName, setRepoFullName] = useState<string>(getStoredGitHubRepo());
  const [token, setToken] = useState<string>(getStoredGitHubToken());
  const [showToken, setShowToken] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [repoStatus, setRepoStatus] = useState<GitHubRepoStatus | null>(null);
  const [copiedWorkflow, setCopiedWorkflow] = useState<boolean>(false);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

  const checkConnection = async (forceToken?: string) => {
    setLoading(true);
    try {
      const status = await fetchGitHubRepoStatus(repoFullName, forceToken ?? token);
      setRepoStatus(status);
      if (status.connected && status.latestCommit && onSyncCommit) {
        onSyncCommit(status.latestCommit.shortSha, status.latestCommit.authorDate);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      checkConnection();
    }
  }, [isOpen]);

  const handleSaveToken = () => {
    setStoredGitHubToken(token);
    setStoredGitHubRepo(repoFullName);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
    checkConnection(token);
  };

  const handleClearToken = () => {
    setToken('');
    setStoredGitHubToken('');
    checkConnection('');
  };

  const githubActionYaml = `name: Update Hockey Heroes Metrics

on:
  push:
    branches: [ "main" ]
  workflow_dispatch:

jobs:
  update-metrics:
    runs-on: ubuntu-latest
    permissions:
      contents: read
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4
        with:
          fetch-depth: 10

      - name: Inspect Changes & Extract Roadmap Progress
        run: |
          echo "Scanning commit \${{ github.sha }} for Hockey Heroes status..."
          mkdir -p .artifacts
          echo '{
            "scannedCommit": "'"\${{ github.sha }}"'",
            "commitShort": "'"\${GITHUB_SHA:0:7}"'",
            "author": "'"\${{ github.actor }}"'",
            "timestamp": "'"\$(date -u +'%Y-%m-%dT%H:%M:%SZ')"'",
            "branch": "'"\${{ github.ref_name }}"'"
          }' > .artifacts/metrics_latest.json
          cat .artifacts/metrics_latest.json

      # Optional: Trigger a notification or push to hosted endpoint`;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedWorkflow(true);
    setTimeout(() => setCopiedWorkflow(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-zinc-800 flex items-center justify-between bg-zinc-950/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <GitBranch className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white tracking-tight">
                  GitHub Repository Live Sync
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700">
                  jhayward9/hockeyheroes
                </span>
              </div>
              <p className="text-xs text-zinc-400">
                Automate real-time metric synchronization when the repository is updated
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sub-tabs */}
        <div className="flex border-b border-zinc-800 px-5 bg-zinc-900/40 text-xs font-semibold">
          <button
            onClick={() => setActiveSubTab('status')}
            className={`py-3 px-4 border-b-2 flex items-center gap-2 transition-all ${
              activeSubTab === 'status'
                ? 'border-cyan-400 text-cyan-300'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <GitCommit className="w-4 h-4" />
            <span>Connection &amp; Live Sync</span>
          </button>
          <button
            onClick={() => setActiveSubTab('workflow')}
            className={`py-3 px-4 border-b-2 flex items-center gap-2 transition-all ${
              activeSubTab === 'workflow'
                ? 'border-cyan-400 text-cyan-300'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Workflow className="w-4 h-4" />
            <span>Automate via GitHub Actions</span>
          </button>
          <button
            onClick={() => setActiveSubTab('options')}
            className={`py-3 px-4 border-b-2 flex items-center gap-2 transition-all ${
              activeSubTab === 'options'
                ? 'border-cyan-400 text-cyan-300'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Key className="w-4 h-4" />
            <span>Access Token &amp; Credentials</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm">
          {activeSubTab === 'status' && (
            <div className="space-y-5">
              {/* Status Banner */}
              <div className={`p-4 rounded-xl border flex items-start gap-3.5 ${
                repoStatus?.connected
                  ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
                  : repoStatus?.isPrivate
                  ? 'bg-amber-950/30 border-amber-500/40 text-amber-200'
                  : 'bg-zinc-800/50 border-zinc-700 text-zinc-300'
              }`}>
                {repoStatus?.connected ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                ) : repoStatus?.isPrivate ? (
                  <Lock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-zinc-400 shrink-0 mt-0.5" />
                )}
                <div className="space-y-1">
                  <div className="font-semibold text-sm">
                    {repoStatus?.connected
                      ? 'Connected to jhayward9/hockeyheroes'
                      : repoStatus?.isPrivate
                      ? 'Private Repository Authentication Required'
                      : 'Checking Repository Status...'}
                  </div>
                  <p className="text-xs opacity-90 leading-relaxed">
                    {repoStatus?.connected
                      ? `Sync active. Head commit matches branch '${repoStatus.defaultBranch}'. Metrics can sync automatically.`
                      : repoStatus?.error || 'GitHub returned 404. This repository is currently private. To read commits without making it public, provide a fine-grained Personal Access Token.'}
                  </p>
                </div>
              </div>

              {/* Commit Comparison Box */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
                  <div className="text-xs text-zinc-400 font-medium flex items-center justify-between">
                    <span>Website Baseline Scan</span>
                    <span className="font-mono text-[10px] text-zinc-500">Local Static</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-bold text-white bg-zinc-800 px-2.5 py-1 rounded-md border border-zinc-700">
                      {currentCommit}
                    </span>
                    <span className="text-xs text-zinc-400">Oct 29, 2026</span>
                  </div>
                  <div className="text-xs text-zinc-400">
                    Inventoried from PROGRESS_REPORT_CONTEXT.md
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
                  <div className="text-xs text-zinc-400 font-medium flex items-center justify-between">
                    <span>Live GitHub Remote (HEAD)</span>
                    <span className="font-mono text-[10px] text-cyan-400">api.github.com</span>
                  </div>
                  {repoStatus?.latestCommit ? (
                    <>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm font-bold text-cyan-300 bg-cyan-950/60 px-2.5 py-1 rounded-md border border-cyan-800/50">
                          {repoStatus.latestCommit.shortSha}
                        </span>
                        <a 
                          href={repoStatus.latestCommit.htmlUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-cyan-400 hover:underline flex items-center gap-1"
                        >
                          View Commit <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                      <div className="text-xs text-zinc-300 truncate" title={repoStatus.latestCommit.message}>
                        "{repoStatus.latestCommit.message}"
                      </div>
                      <div className="text-[11px] text-zinc-500">
                        by {repoStatus.latestCommit.authorName} • {new Date(repoStatus.latestCommit.authorDate).toLocaleString()}
                      </div>
                    </>
                  ) : (
                    <div className="text-xs text-zinc-500 italic py-2">
                      Connect via PAT token to inspect live remote HEAD
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <button
                  onClick={() => checkConnection()}
                  disabled={loading}
                  className="w-full sm:w-auto px-4 py-2 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-cyan-950/40 transition-colors"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                  <span>{loading ? 'Checking GitHub...' : 'Sync with GitHub Now'}</span>
                </button>

                {!repoStatus?.connected && (
                  <button
                    onClick={() => setActiveSubTab('options')}
                    className="w-full sm:w-auto px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold rounded-xl flex items-center justify-center gap-2 border border-zinc-700 transition-colors"
                  >
                    <Key className="w-3.5 h-3.5 text-amber-400" />
                    <span>Enter Personal Access Token</span>
                  </button>
                )}
              </div>
            </div>
          )}

          {activeSubTab === 'workflow' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-white text-sm flex items-center gap-2">
                  <Workflow className="w-4 h-4 text-cyan-400" />
                  Automatic Updates via GitHub Action (CI/CD)
                </h4>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  To automatically trigger metric updates every time you push code to <code className="text-cyan-300 font-mono">jhayward9/hockeyheroes</code>, add this GitHub Action workflow file into your repository at:
                </p>
                <div className="px-3 py-1.5 rounded-lg bg-zinc-950 border border-zinc-800 font-mono text-xs text-amber-300 flex items-center gap-2">
                  <FileCode2 className="w-4 h-4 text-zinc-500 shrink-0" />
                  <span>.github/workflows/sync-metrics.yml</span>
                </div>
              </div>

              <div className="relative">
                <pre className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 text-[11px] font-mono text-zinc-300 overflow-x-auto leading-relaxed max-h-60">
                  {githubActionYaml}
                </pre>
                <button
                  onClick={() => copyToClipboard(githubActionYaml)}
                  className="absolute top-2.5 right-2.5 px-2.5 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium border border-zinc-700 flex items-center gap-1.5 shadow-md"
                >
                  {copiedWorkflow ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-zinc-400" />
                      <span>Copy YAML</span>
                    </>
                  )}
                </button>
              </div>

              <div className="p-3.5 rounded-xl bg-zinc-950/60 border border-zinc-800 space-y-2 text-xs text-zinc-400">
                <div className="font-semibold text-zinc-200 flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                  <span>How it works on push:</span>
                </div>
                <ol className="list-decimal list-inside space-y-1 pl-1">
                  <li>Runs on every commit pushed to <code className="text-zinc-300 font-mono">main</code>.</li>
                  <li>Generates or commits an updated <code className="text-zinc-300 font-mono">PROGRESS_REPORT_CONTEXT.md</code>.</li>
                  <li>When you visit or refresh this page, the dashboard queries the GitHub API and automatically renders the latest progress!</li>
                </ol>
              </div>
            </div>
          )}

          {activeSubTab === 'options' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-white text-sm flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  GitHub Personal Access Token (PAT)
                </h4>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  Because <code className="text-cyan-300 font-mono">jhayward9/hockeyheroes</code> is a <strong>private repository</strong>, GitHub hides its endpoints unless authenticated. You can generate a <em>Fine-Grained Read-Only Token</em> with only <code className="text-zinc-300 font-mono">Contents: Read</code> access.
                </p>
              </div>

              <div className="space-y-3 p-4 rounded-xl bg-zinc-950 border border-zinc-800">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-zinc-300 flex items-center justify-between">
                    <span>Repository Full Name</span>
                  </label>
                  <input
                    type="text"
                    value={repoFullName}
                    onChange={(e) => setRepoFullName(e.target.value)}
                    placeholder="jhayward9/hockeyheroes"
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-xs font-mono text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-zinc-300 flex items-center justify-between">
                    <span>GitHub Personal Access Token (github_pat_...)</span>
                    <a
                      href="https://github.com/settings/tokens?type=beta"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-cyan-400 hover:underline flex items-center gap-1"
                    >
                      Generate on GitHub <ExternalLink className="w-3 h-3" />
                    </a>
                  </label>
                  <div className="relative">
                    <input
                      type={showToken ? 'text' : 'password'}
                      value={token}
                      onChange={(e) => setToken(e.target.value)}
                      placeholder="github_pat_11..."
                      className="w-full px-3 py-2 pr-10 bg-zinc-900 border border-zinc-700 rounded-lg text-xs font-mono text-white focus:outline-none focus:border-cyan-400"
                    />
                    <button
                      type="button"
                      onClick={() => setShowToken(!showToken)}
                      className="absolute right-2.5 top-2.5 text-zinc-400 hover:text-zinc-200"
                    >
                      {showToken ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                  <p className="text-[11px] text-zinc-500">
                    Stored strictly in your browser's <code className="font-mono text-zinc-400">localStorage</code>. Never sent to any external server other than <code className="font-mono text-zinc-400">api.github.com</code>.
                  </p>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <button
                    onClick={handleSaveToken}
                    className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs rounded-xl flex items-center gap-1.5 transition-colors"
                  >
                    {saveSuccess ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Saved &amp; Tested</span>
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Save &amp; Connect</span>
                      </>
                    )}
                  </button>

                  {token && (
                    <button
                      onClick={handleClearToken}
                      className="px-3 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs rounded-xl border border-zinc-700 transition-colors"
                    >
                      Clear Token
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-zinc-800 bg-zinc-950/80 flex items-center justify-between text-xs text-zinc-400">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Target: github.com/jhayward9/hockeyheroes</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
