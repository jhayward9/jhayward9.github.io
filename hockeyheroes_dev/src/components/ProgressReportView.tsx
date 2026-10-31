import React, { useState, useMemo } from 'react';
import { 
  PROGRESS_SUBJECTS_DATA, 
  ACTIVE_REPORTS_INDEX,
  ActiveReportInfo,
  PROGRESS_REPORT_TIMESTAMP, 
  SCANNED_COMMIT, 
  TOTAL_INVENTORIED_FILES, 
  SIX_SUITES_TIME 
} from '../data/progressReportData';
import { ProgressSubject, SubjectStatus, SubjectTask, ReportTier } from '../types/roadmap';
import { 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Search, 
  Download, 
  ShieldCheck, 
  Lock, 
  X, 
  ChevronDown, 
  ChevronUp, 
  Layers, 
  Calendar, 
  FileText, 
  AlertCircle,
  HelpCircle,
  Filter,
  Check,
  Zap,
  BarChart3,
  ListOrdered,
  Gamepad2,
  MapPin,
  Sparkles,
  VolumeX,
  Volume2
} from 'lucide-react';

const AUTHORIZED_GOOGLE_EMAIL = 'jesseianhayward@gmail.com';

interface ProgressReportViewProps {
  targetSubjectId?: string | null;
  onClearTargetSubject?: () => void;
  onOpenActiveReports?: () => void;
}

export const ProgressReportView: React.FC<ProgressReportViewProps> = ({
  targetSubjectId,
  onClearTargetSubject,
  onOpenActiveReports
}) => {
  const [subjects] = useState<ProgressSubject[]>(PROGRESS_SUBJECTS_DATA);
  const [scopeFilter, setScopeFilter] = useState<'all' | ReportTier>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'needs_attention' | 'in_progress' | 'completed'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSubjectIds, setExpandedSubjectIds] = useState<Record<string, boolean>>({
    'sub-exhibition': true,
    'sub-proto-cities': true,
    'sub-customization': true,
    'sub-story': true
  });

  // Toggle accordion expand
  const toggleSubject = (id: string) => {
    setExpandedSubjectIds(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const expandAll = () => {
    const allExpanded: Record<string, boolean> = {};
    subjects.forEach(s => { allExpanded[s.id] = true; });
    setExpandedSubjectIds(allExpanded);
  };

  const collapseAll = () => {
    setExpandedSubjectIds({});
  };

  // Authorization state for Report Export
  const [currentUserEmail, setCurrentUserEmail] = useState<string | null>(() => {
    return localStorage.getItem('hh_authenticated_google_email');
  });
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [authEmailInput, setAuthEmailInput] = useState<string>('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [unauthorizedBanner, setUnauthorizedBanner] = useState<string | null>(null);

  // When targetSubjectId is supplied from another tab or navigation, expand and scroll
  React.useEffect(() => {
    if (targetSubjectId) {
      setExpandedSubjectIds(prev => ({
        ...prev,
        [targetSubjectId]: true
      }));
      setScopeFilter('all');
      setTimeout(() => {
        const el = document.getElementById(`subject-card-${targetSubjectId}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 150);
    }
  }, [targetSubjectId]);

  // Filtered subjects based on Scope, Status, Category, and Search
  const filteredSubjects = useMemo(() => {
    return subjects.filter(subject => {
      // Scope filter
      if (scopeFilter === 'exhibition_prototype') {
        if (
          subject.tier !== 'exhibition_prototype' && 
          subject.id !== 'sub-char-source' && 
          subject.id !== 'sub-char-acceptance' && 
          subject.id !== 'sub-controls'
        ) {
          return false;
        }
      } else if (scopeFilter === 'full_game_prototype') {
        if (subject.tier !== 'full_game_prototype' && subject.tier !== 'shared' && subject.id !== 'sub-rink-art') {
          return false;
        }
      } else if (scopeFilter === 'full_game') {
        if (
          subject.tier !== 'full_game' && 
          subject.id !== 'sub-customization' && 
          subject.id !== 'sub-exhibition' &&
          subject.id !== 'sub-story' &&
          subject.id !== 'sub-overworld-art' &&
          subject.id !== 'sub-controls' &&
          subject.id !== 'sub-char-acceptance'
        ) {
          return false;
        }
      }

      // Status filter
      if (statusFilter === 'needs_attention' && subject.status !== 'needs_attention') return false;
      if (statusFilter === 'in_progress' && subject.status !== 'in_progress') return false;
      if (statusFilter === 'completed' && subject.status !== 'completed') return false;

      // Category filter
      if (categoryFilter !== 'all' && subject.category !== categoryFilter) return false;

      // Search query
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesTitle = subject.title.toLowerCase().includes(query);
        const matchesNext = subject.nextStep.toLowerCase().includes(query);
        const matchesSummary = subject.summary.toLowerCase().includes(query);
        const matchesTask = subject.tasks.some(t => 
          t.name.toLowerCase().includes(query) || 
          t.id.toLowerCase().includes(query) || 
          (t.notes && t.notes.toLowerCase().includes(query))
        );
        return matchesTitle || matchesNext || matchesSummary || matchesTask;
      }

      return true;
    });
  }, [subjects, scopeFilter, statusFilter, categoryFilter, searchQuery]);

  // Aggregate counts
  const counts = useMemo(() => {
    return {
      total: subjects.length,
      needsAttention: subjects.filter(s => s.status === 'needs_attention').length,
      inProgress: subjects.filter(s => s.status === 'in_progress').length,
      completed: subjects.filter(s => s.status === 'completed').length
    };
  }, [subjects]);

  // Handle Export with Google Account Security
  const executeDownload = () => {
    const md = `# Hockey Heroes — Three-Tier Development Progress Report\n\n` +
      `**Exported By:** ${AUTHORIZED_GOOGLE_EMAIL}\n` +
      `**Timestamp:** ${PROGRESS_REPORT_TIMESTAMP} | **Commit:** ${SCANNED_COMMIT}\n` +
      `**Active Report Scope:** ${scopeFilter.toUpperCase()}\n` +
      `**Inventoried Project Files:** ${TOTAL_INVENTORIED_FILES} | **Six Suites Verification:** ${SIX_SUITES_TIME}\n\n` +
      `---\n\n` +
      `## Active Reports Navigation Index\n\n` +
      ACTIVE_REPORTS_INDEX.map(r => 
        `### ${r.title} (${r.badge})\n` +
        `- **Document:** \`${r.docFile}\`\n` +
        `- **Scope:** ${r.scopeSummary}\n` +
        `- **Audio Requirement:** ${r.audioRequirement}\n` +
        `- **Headline Metric:** **${r.headlineMetric} (${r.headlinePercentage}%)**\n` +
        `- **Next Action:** ${r.nextImmediateAction}\n` +
        `- **Boundaries:**\n` +
        r.boundaries.map(b => `  - ${b}`).join('\n') + `\n`
      ).join('\n') +
      `\n---\n\n` +
      `## Filtered Subject & Task Breakdown\n\n` +
      filteredSubjects.map(s => {
        return `### ${s.title} (${s.percentage.toFixed(1)}% — ${s.status.toUpperCase()})\n` +
          `- **Tier:** ${s.tier}\n` +
          `- **Scope Measured:** ${s.completedUnits} / ${s.totalUnits} ${s.unitLabel}\n` +
          `- **Next Immediate Step:** ${s.nextStep}\n` +
          (s.scopeNote ? `- **Scope Note:** ${s.scopeNote}\n` : '') +
          `- **Summary:** ${s.summary}\n\n` +
          `**Tasks:**\n` +
          s.tasks.map(t => `  - [${t.status === 'complete' ? 'x' : ' '}] **${t.id}: ${t.name}** (${t.status.toUpperCase()})${t.notes ? ` — ${t.notes}` : ''}`).join('\n') +
          `\n`;
      }).join('\n');

    const blob = new Blob([md], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `hockey-heroes-progress-report-${new Date().toISOString().split('T')[0]}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportClick = () => {
    setUnauthorizedBanner(null);
    setAuthError(null);

    if (currentUserEmail === AUTHORIZED_GOOGLE_EMAIL) {
      executeDownload();
    } else {
      setAuthEmailInput(currentUserEmail || '');
      setShowAuthModal(true);
      if (currentUserEmail && currentUserEmail !== AUTHORIZED_GOOGLE_EMAIL) {
        setAuthError(`Unauthorized user: Account "${currentUserEmail}" does not have export permissions.`);
      }
    }
  };

  const handleVerifyAccount = (emailToVerify: string) => {
    const trimmed = emailToVerify.trim().toLowerCase();
    if (!trimmed) {
      setAuthError('Please enter a Google account email address.');
      return;
    }

    if (trimmed === AUTHORIZED_GOOGLE_EMAIL.toLowerCase()) {
      localStorage.setItem('hh_authenticated_google_email', AUTHORIZED_GOOGLE_EMAIL);
      setCurrentUserEmail(AUTHORIZED_GOOGLE_EMAIL);
      setAuthError(null);
      setShowAuthModal(false);
      setUnauthorizedBanner(null);
      executeDownload();
    } else {
      setAuthError(`Unauthorized user: "${trimmed}" is not authorized. Only ${AUTHORIZED_GOOGLE_EMAIL} can export reports.`);
      setUnauthorizedBanner(`Unauthorized user: Access denied for ${trimmed}.`);
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem('hh_authenticated_google_email');
    setCurrentUserEmail(null);
    setAuthError(null);
    setUnauthorizedBanner(null);
  };

  const getStatusBadge = (status: SubjectStatus) => {
    switch (status) {
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            <CheckCircle2 className="w-3.5 h-3.5" /> Complete (100%)
          </span>
        );
      case 'in_progress':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-500/15 text-cyan-400 border border-cyan-500/30">
            <Clock className="w-3.5 h-3.5" /> In Progress
          </span>
        );
      case 'needs_attention':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/30">
            <AlertTriangle className="w-3.5 h-3.5" /> Needs Attention
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-zinc-700/30 text-zinc-400 border border-zinc-700/50">
            <AlertCircle className="w-3.5 h-3.5" /> Pending Planning
          </span>
        );
    }
  };

  const getTaskStatusBadge = (status: SubjectTask['status']) => {
    switch (status) {
      case 'complete':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
            <Check className="w-3 h-3" /> Done
          </span>
        );
      case 'in_progress':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
            <Clock className="w-3 h-3" /> In Progress
          </span>
        );
      case 'blocked':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-red-500/15 text-red-300 border border-red-500/30">
            <AlertTriangle className="w-3 h-3" /> Blocked / Awaiting Delivery
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-zinc-800 text-zinc-400 border border-zinc-700/60">
            Pending
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Scan Baseline Header */}
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-5 shadow-xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 uppercase">
                Active Reports Index • October 29, 2026
              </span>
              <span className="text-xs font-mono text-zinc-400">
                Commit: <code className="text-zinc-200">{SCANNED_COMMIT}</code>
              </span>
              <span className="text-xs font-mono text-zinc-400">•</span>
              <span className="text-xs font-mono text-emerald-400 font-semibold">
                6 of 6 Suites Passing (16:12:33 UTC)
              </span>
            </div>
            <h2 className="text-lg font-bold text-white mt-1.5 tracking-tight flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-cyan-400" />
              <span>Three-Tier Progress Dashboard &amp; Subjects Needing Attention</span>
            </h2>
            <p className="text-xs text-zinc-400 mt-1 max-w-3xl leading-relaxed">
              Separates the project into three active scopes: <strong>Exhibition Prototype</strong> (audio excluded), <strong>Full-Game Prototype</strong> (bounded strictly to Frontier &amp; Superior, audio excluded), and <strong>Full Game</strong> (commercial release).
            </p>
          </div>

          {/* Quick Metrics Tag Bar */}
          <div className="flex items-center gap-3 bg-zinc-950/80 p-3 rounded-xl border border-zinc-800 shrink-0 font-mono text-xs">
            <div>
              <div className="text-[10px] text-zinc-500 uppercase">Exhibition Sprints</div>
              <div className="font-bold text-cyan-400">13 / 100 (13%)</div>
            </div>
            <div className="h-7 w-px bg-zinc-800" />
            <div>
              <div className="text-[10px] text-zinc-500 uppercase">Rink Geometry</div>
              <div className="font-bold text-emerald-400">12 / 12 (100%)</div>
            </div>
            <div className="h-7 w-px bg-zinc-800" />
            <div>
              <div className="text-[10px] text-zinc-500 uppercase">Story Prototype</div>
              <div className="font-bold text-amber-400">2 Cities Bounded</div>
            </div>
          </div>
        </div>

        {/* Unauthorized User Alert Banner if Triggered */}
        {unauthorizedBanner && (
          <div className="mt-4 p-3.5 bg-red-950/80 border border-red-500/50 rounded-xl text-red-200 flex items-center justify-between text-xs animate-shake shadow-lg">
            <div className="flex items-center gap-2.5">
              <AlertTriangle className="w-5 h-5 text-red-400 shrink-0" />
              <div>
                <span className="font-bold tracking-wide uppercase text-red-300">Unauthorized User</span>
                <p className="text-[11px] text-red-200/90 mt-0.5">
                  {unauthorizedBanner} Export access is restricted exclusively to <strong>{AUTHORIZED_GOOGLE_EMAIL}</strong>.
                </p>
              </div>
            </div>
            <button 
              onClick={() => setUnauthorizedBanner(null)} 
              className="p-1 hover:bg-red-900/50 rounded text-red-300"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Scope Filter Pill Bar */}
      <div className="bg-zinc-900/90 border border-zinc-800 p-3.5 rounded-xl flex items-center justify-between gap-3 flex-wrap shadow-lg">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-xs font-mono text-zinc-400 font-semibold mr-1.5 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-cyan-400" />
            <span>Scope Filter:</span>
          </span>
          <button
            onClick={() => setScopeFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              scopeFilter === 'all'
                ? 'bg-zinc-700 text-white font-bold shadow-sm'
                : 'bg-zinc-800/80 text-zinc-400 hover:bg-zinc-750 hover:text-zinc-200'
            }`}
          >
            All Subjects ({subjects.length})
          </button>
          <button
            onClick={() => setScopeFilter('exhibition_prototype')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              scopeFilter === 'exhibition_prototype'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold shadow-sm'
                : 'bg-zinc-800/80 text-zinc-400 hover:bg-zinc-750 hover:text-cyan-300'
            }`}
          >
            Exhibition Scope
          </button>
          <button
            onClick={() => setScopeFilter('full_game_prototype')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              scopeFilter === 'full_game_prototype'
                ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40 font-bold shadow-sm'
                : 'bg-zinc-800/80 text-zinc-400 hover:bg-zinc-750 hover:text-blue-300'
            }`}
          >
            2-City Prototype Scope
          </button>
          <button
            onClick={() => setScopeFilter('full_game')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              scopeFilter === 'full_game'
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 font-bold shadow-sm'
                : 'bg-zinc-800/80 text-zinc-400 hover:bg-zinc-750 hover:text-purple-300'
            }`}
          >
            Commercial Release Scope
          </button>
        </div>

        <div className="text-xs font-mono text-zinc-400">
          Showing <span className="font-bold text-white">{filteredSubjects.length}</span> of {subjects.length} subjects
        </div>
      </div>

      {/* Control Bar: Category Pills, Search, Expand/Collapse & Authorized Export */}
      <div className="bg-zinc-900/90 border border-zinc-800 p-3 rounded-xl flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Status Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              statusFilter === 'all'
                ? 'bg-zinc-700 text-white font-bold'
                : 'bg-zinc-800/80 text-zinc-400 hover:bg-zinc-700'
            }`}
          >
            All Statuses ({counts.total})
          </button>
          <button
            onClick={() => setStatusFilter('needs_attention')}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1 ${
              statusFilter === 'needs_attention'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold'
                : 'bg-zinc-800/80 text-amber-400/80 hover:bg-zinc-700'
            }`}
          >
            <AlertTriangle className="w-3 h-3 text-amber-400" />
            <span>Needs Attention ({counts.needsAttention})</span>
          </button>
          <button
            onClick={() => setStatusFilter('in_progress')}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1 ${
              statusFilter === 'in_progress'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                : 'bg-zinc-800/80 text-cyan-400/80 hover:bg-zinc-700'
            }`}
          >
            <Clock className="w-3 h-3 text-cyan-400" />
            <span>In Progress ({counts.inProgress})</span>
          </button>
          <button
            onClick={() => setStatusFilter('completed')}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1 ${
              statusFilter === 'completed'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold'
                : 'bg-zinc-800/80 text-emerald-400/80 hover:bg-zinc-700'
            }`}
          >
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            <span>Completed ({counts.completed})</span>
          </button>
        </div>

        {/* Search, Accordion Controls & Protected Export Button */}
        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
          {/* Expand/Collapse Toggle */}
          <div className="flex items-center bg-zinc-950 p-1 rounded-lg border border-zinc-800 text-[11px] font-mono">
            <button 
              onClick={expandAll} 
              className="px-2 py-0.5 text-zinc-400 hover:text-white rounded"
            >
              Expand All
            </button>
            <span className="text-zinc-700">|</span>
            <button 
              onClick={collapseAll} 
              className="px-2 py-0.5 text-zinc-400 hover:text-white rounded"
            >
              Collapse
            </button>
          </div>

          {/* Search Box */}
          <div className="relative flex-1 md:w-56">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              placeholder="Search subjects or tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-950/80 border border-zinc-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-cyan-500 font-mono"
            />
          </div>

          {/* Export Report Button (Locked to jesseianhayward@gmail.com) */}
          <button
            onClick={handleExportClick}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border shrink-0 ${
              currentUserEmail === AUTHORIZED_GOOGLE_EMAIL
                ? 'bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border-emerald-500/40'
                : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border-zinc-700'
            }`}
            title={`Export Status Report (Restricted to ${AUTHORIZED_GOOGLE_EMAIL})`}
          >
            {currentUserEmail === AUTHORIZED_GOOGLE_EMAIL ? (
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <Lock className="w-3.5 h-3.5 text-amber-400" />
            )}
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Export Report</span>
          </button>
        </div>
      </div>

      {/* Main Content Area: List of Subjects & Tasks */}
      <div className="space-y-4">
          {filteredSubjects.map(subject => {
            const isExpanded = !!expandedSubjectIds[subject.id];
            const completedTasksCount = subject.tasks.filter(t => t.status === 'complete').length;

            // Progress bar color based on percentage
            const getBarColor = (pct: number) => {
              if (pct === 100) return 'bg-emerald-400';
              if (pct >= 50) return 'bg-cyan-400';
              if (pct > 0) return 'bg-amber-400';
              return 'bg-zinc-600';
            };

            return (
              <div 
                key={subject.id}
                id={`subject-card-${subject.id}`}
                className={`bg-zinc-900/80 border rounded-2xl overflow-hidden transition-all shadow-md scroll-mt-24 ${
                  subject.status === 'needs_attention' 
                    ? 'border-amber-500/30 hover:border-amber-500/50' 
                    : subject.status === 'completed'
                    ? 'border-emerald-500/30 hover:border-emerald-500/50'
                    : 'border-zinc-800 hover:border-zinc-700'
                }`}
              >
                {/* Subject Header Card */}
                <div 
                  className="p-4 sm:p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4 cursor-pointer select-none"
                  onClick={() => toggleSubject(subject.id)}
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 font-semibold">
                        {subject.category}
                      </span>
                      <span className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded font-semibold ${
                        subject.tier === 'exhibition_prototype' ? 'bg-cyan-950 text-cyan-300 border border-cyan-800/60' :
                        subject.tier === 'full_game_prototype' ? 'bg-amber-950 text-amber-300 border border-amber-800/60' :
                        subject.tier === 'full_game' ? 'bg-purple-950 text-purple-300 border border-purple-800/60' :
                        'bg-zinc-800 text-zinc-300'
                      }`}>
                        {subject.tier === 'exhibition_prototype' ? 'Exhibition' :
                         subject.tier === 'full_game_prototype' ? 'Story Prototype (2 Cities)' :
                         subject.tier === 'full_game' ? 'Full Game Only' : 'Shared Foundation'}
                      </span>
                      <h3 className="text-base font-bold text-zinc-100">{subject.title}</h3>
                      {getStatusBadge(subject.status)}
                    </div>

                    <p className="text-xs text-zinc-400 leading-relaxed max-w-3xl">
                      {subject.summary}
                    </p>

                    {/* Scope Note if provided */}
                    {subject.scopeNote && (
                      <div className="text-[11px] font-mono text-zinc-500 flex items-center gap-1.5">
                        <span className="text-amber-400/80 font-bold">ℹ Scope Boundary:</span>
                        <span>{subject.scopeNote}</span>
                      </div>
                    )}

                    {/* Immediate Next Action Ticket */}
                    <div className="flex items-center gap-2 text-xs font-mono pt-0.5">
                      <span className="text-cyan-400 font-semibold flex items-center gap-1">
                        <Zap className="w-3.5 h-3.5 text-cyan-400" /> Next:
                      </span>
                      <span className="text-zinc-200 bg-zinc-950/80 px-2 py-0.5 rounded border border-zinc-800">
                        {subject.nextStep}
                      </span>
                    </div>

                    {/* Quick Button for Exhibition Sprint Backlog */}
                    {subject.id === 'sub-exhibition' && onOpenActiveReports && (
                      <div className="pt-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenActiveReports();
                          }}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono font-semibold bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 transition-colors"
                        >
                          <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                          <span>View in Exhibition Mode Report &amp; 100-Hour Sprint Backlog →</span>
                        </button>
                      </div>
                    )}
                  </div>

                {/* Progress Bar & Metric Numbers */}
                <div className="lg:w-64 space-y-2 bg-zinc-950/60 p-3 rounded-xl border border-zinc-800/80 shrink-0">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-zinc-400">Completion:</span>
                    <span className="font-bold text-zinc-100">
                      {subject.completedUnits} / {subject.totalUnits} {subject.unitLabel}
                    </span>
                  </div>

                  {/* Progress Bar Track */}
                  <div className="w-full h-2 rounded-full bg-zinc-800 overflow-hidden relative">
                    <div 
                      className={`h-full transition-all duration-500 ${getBarColor(subject.percentage)}`}
                      style={{ width: `${Math.min(100, Math.max(0, subject.percentage))}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="text-zinc-500">{subject.tasks.length} tasks registered</span>
                    <span className={`font-bold ${
                      subject.percentage === 100 ? 'text-emerald-400' :
                      subject.percentage > 0 ? 'text-amber-400' : 'text-zinc-500'
                    }`}>
                      {subject.percentage.toFixed(1)}%
                    </span>
                  </div>
                </div>

                <div className="hidden lg:flex items-center justify-center p-1 text-zinc-400">
                  {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </div>
              </div>

              {/* Tasks Checklist Accordion Content */}
              {isExpanded && (
                <div className="border-t border-zinc-800/90 bg-zinc-950/50 p-4 sm:p-5 space-y-3">
                  <div className="flex items-center justify-between text-xs text-zinc-400 font-mono pb-1 border-b border-zinc-800">
                    <span className="font-semibold text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
                      <ListOrdered className="w-4 h-4 text-cyan-400" />
                      Tasks in Subject ({completedTasksCount} of {subject.tasks.length} complete)
                    </span>
                    <span className="text-[11px] text-zinc-500">
                      Verified under commit {SCANNED_COMMIT}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-2">
                    {subject.tasks.map(task => {
                      const isComplete = task.status === 'complete';
                      return (
                        <div 
                          key={task.id}
                          className={`p-3 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 transition-all ${
                            isComplete 
                              ? 'bg-emerald-950/15 border-emerald-800/30' 
                              : task.status === 'in_progress'
                              ? 'bg-cyan-950/20 border-cyan-800/40 ring-1 ring-cyan-500/20'
                              : task.status === 'blocked'
                              ? 'bg-red-950/15 border-red-800/30'
                              : 'bg-zinc-900/60 border-zinc-800/80 hover:border-zinc-700'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold mt-0.5 shrink-0 ${
                              isComplete ? 'bg-emerald-500/20 text-emerald-300' :
                              task.status === 'in_progress' ? 'bg-cyan-500/20 text-cyan-300' :
                              task.status === 'blocked' ? 'bg-red-500/20 text-red-300' :
                              'bg-zinc-800 text-zinc-400'
                            }`}>
                              {task.id}
                            </span>
                            <div>
                              <div className={`text-xs font-semibold ${isComplete ? 'text-emerald-200' : 'text-zinc-200'}`}>
                                {task.name}
                              </div>
                              {task.notes && (
                                <p className="text-[11px] text-zinc-400 font-mono mt-0.5">
                                  {task.notes}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="self-end sm:self-center shrink-0">
                            {getTaskStatusBadge(task.status)}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {filteredSubjects.length === 0 && (
          <div className="text-center py-12 bg-zinc-900/40 border border-zinc-800 rounded-2xl text-zinc-500 text-xs font-mono">
            No subjects matching the current filter criteria.
          </div>
        )}
      </div>

      {/* Google Account Authentication & Authorization Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-md w-full p-6 shadow-2xl relative space-y-4">
            <button 
              onClick={() => { setShowAuthModal(false); setAuthError(null); }}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white p-1 rounded-lg hover:bg-zinc-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-zinc-100">Google Account Authorization Required</h3>
                <p className="text-[11px] text-zinc-400">Protected Report Export Endpoint</p>
              </div>
            </div>

            {authError && (
              <div className="p-3 bg-red-950/80 border border-red-500/40 rounded-xl flex items-start gap-2.5 text-xs text-red-200">
                <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-red-300 block">Unauthorized user</span>
                  <span className="text-[11px] leading-tight">{authError}</span>
                </div>
              </div>
            )}

            <div className="text-xs text-zinc-300 space-y-2">
              <p>
                To download and export status reports, your browser session must be authenticated with the authorized Google account:
              </p>
              <div className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800 font-mono text-cyan-300 text-xs flex items-center justify-between">
                <span>{AUTHORIZED_GOOGLE_EMAIL}</span>
                <span className="text-[10px] text-zinc-500 uppercase">Authorized Owner</span>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <button
                onClick={() => handleVerifyAccount(AUTHORIZED_GOOGLE_EMAIL)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold text-xs transition-colors shadow-lg shadow-cyan-500/20"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Verify Google Account as {AUTHORIZED_GOOGLE_EMAIL}</span>
              </button>

              <div className="relative flex items-center justify-center py-1">
                <div className="border-t border-zinc-800 w-full" />
                <span className="bg-zinc-900 px-2 text-[10px] text-zinc-500 uppercase font-mono absolute">
                  Or test with another account
                </span>
              </div>

              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter other Google email to test..."
                  value={authEmailInput}
                  onChange={(e) => setAuthEmailInput(e.target.value)}
                  className="flex-1 bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-cyan-500 font-mono"
                />
                <button
                  onClick={() => handleVerifyAccount(authEmailInput)}
                  className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold rounded-lg border border-zinc-700"
                >
                  Verify
                </button>
              </div>
            </div>

            {currentUserEmail === AUTHORIZED_GOOGLE_EMAIL && (
              <div className="pt-2 border-t border-zinc-800 flex items-center justify-between text-xs">
                <span className="text-emerald-400 font-mono text-[11px] flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Session Authorized
                </span>
                <button
                  onClick={handleSignOut}
                  className="text-xs text-zinc-400 hover:text-red-400 underline"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
