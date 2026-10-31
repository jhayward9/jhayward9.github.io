import React, { useState, useMemo } from 'react';
import { 
  ACTIVE_REPORTS_INDEX, 
  PROGRESS_REPORT_TIMESTAMP, 
  SCANNED_COMMIT, 
  SIX_SUITES_TIME 
} from '../data/progressReportData';
import { ProgressSubject, ReportTier, SubjectStatus, SubjectTask } from '../types/roadmap';
import { 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  ChevronDown, 
  Layers, 
  Calendar, 
  FileText, 
  AlertCircle,
  Check,
  Zap,
  BarChart3,
  ListOrdered,
  VolumeX,
  Volume2,
  Sparkles,
  ArrowRight,
  ExternalLink,
  Target
} from 'lucide-react';
import { SprintBacklogTab } from './SprintBacklogTab';
import { IncompleteReportsDropdown, computeAllReportsIncompleteData } from './IncompleteReportsDropdown';

interface ActiveReportsTabProps {
  subjects: ProgressSubject[];
  onNavigateToSubject?: (subjectId: string, tier: ReportTier) => void;
  scannedCommit?: string;
  onOpenGitHubSync?: () => void;
}

export const ActiveReportsTab: React.FC<ActiveReportsTabProps> = ({
  subjects,
  onNavigateToSubject,
  scannedCommit,
  onOpenGitHubSync
}) => {
  const [activeReportTier, setActiveReportTier] = useState<ReportTier>('exhibition_prototype');
  const [openDropdownTier, setOpenDropdownTier] = useState<ReportTier | null>('exhibition_prototype');
  const [exhibitionSubView, setExhibitionSubView] = useState<'overview' | 'sprint_backlog'>('overview');

  // Compute all reports incomplete summaries for button counters and dropdown
  const allReportsSummary = useMemo(() => computeAllReportsIncompleteData(subjects), [subjects]);

  const handleReportTierClick = (tierId: ReportTier) => {
    setActiveReportTier(tierId);
    if (openDropdownTier === tierId) {
      // Toggle closed if user clicks the already opened button
      setOpenDropdownTier(null);
    } else {
      // Open the dropdown list for this clicked report
      setOpenDropdownTier(tierId);
    }
  };

  const activeReport = useMemo(() => {
    return ACTIVE_REPORTS_INDEX.find(r => r.id === activeReportTier) || ACTIVE_REPORTS_INDEX[0];
  }, [activeReportTier]);

  return (
    <div className="space-y-6">
      {/* 1. Top Scan Baseline Header for Three Active Reports */}
      <div className="bg-zinc-900/95 border border-zinc-800 rounded-2xl p-5 sm:p-6 shadow-2xl relative overflow-hidden backdrop-blur-sm">
        {/* Decorative background ambient glows */}
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
                <Sparkles className="w-3 h-3 text-cyan-300" />
                Active Reports Dashboard • 3 Isolated Scopes
              </span>
              <button
                onClick={onOpenGitHubSync}
                className="text-xs font-mono text-zinc-400 hover:text-cyan-300 transition-colors flex items-center gap-1 group"
                title="Click to inspect live GitHub commit status"
              >
                <span>Commit:</span>
                <code className="text-zinc-200 group-hover:text-cyan-300 font-semibold bg-zinc-800/80 px-1.5 py-0.5 rounded border border-zinc-700/80">
                  {scannedCommit || SCANNED_COMMIT}
                </code>
              </button>
              <span className="text-xs font-mono text-zinc-500">•</span>
              <span className="text-xs font-mono text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                6 of 6 Suites Passing ({SIX_SUITES_TIME})
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2.5">
              <BarChart3 className="w-6 h-6 text-cyan-400 shrink-0" />
              <span>Three Active Scope Reports &amp; Incomplete Deliverables</span>
            </h2>

            <p className="text-xs sm:text-sm text-zinc-300 max-w-3xl leading-relaxed">
              Click any report below to toggle its <strong className="text-amber-300">live dropdown list of incomplete tasks and subjects</strong>, view strict scope boundaries, and review deliverables without scope confusion.
            </p>
          </div>

          {/* Quick Metrics Tag Bar */}
          <div className="flex items-center gap-3 bg-zinc-950/90 p-3.5 rounded-xl border border-zinc-800 shrink-0 font-mono text-xs shadow-inner">
            <div>
              <div className="text-[10px] text-zinc-500 uppercase tracking-wider">Report 1 (Exhibition)</div>
              <div className="font-bold text-cyan-400 text-sm">13 / 100 Sprints (13%)</div>
            </div>
            <div className="h-8 w-px bg-zinc-800" />
            <div>
              <div className="text-[10px] text-zinc-500 uppercase tracking-wider">Report 2 (2-City)</div>
              <div className="font-bold text-blue-400 text-sm">2 Cities Bounded</div>
            </div>
            <div className="h-8 w-px bg-zinc-800" />
            <div>
              <div className="text-[10px] text-zinc-500 uppercase tracking-wider">Report 3 (Commercial)</div>
              <div className="font-bold text-purple-400 text-sm">Audio &amp; Ports Req</div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. THREE ACTIVE REPORTS NAVIGATION TABS WITH DROPDOWN TRIGGER (Selector 1, 2, 3) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {ACTIVE_REPORTS_INDEX.map((tier, idx) => {
          const isActive = activeReportTier === tier.id;
          const isDropdownOpen = openDropdownTier === tier.id;
          const summary = allReportsSummary.find(r => r.tierId === tier.id);
          const incompleteTaskCount = summary?.totalIncompleteTasks ?? 0;
          const incompleteSubjectCount = summary?.incompleteSubjects.length ?? 0;

          // Distinctive theme styling for each report card
          const themeStyle = 
            tier.id === 'exhibition_prototype'
              ? {
                  active: 'bg-gradient-to-b from-cyan-950/80 via-zinc-900 to-zinc-950 border-cyan-400 ring-2 ring-cyan-500/50 shadow-2xl shadow-cyan-950/60 scale-[1.01]',
                  inactive: 'bg-zinc-900/90 border-zinc-800 hover:border-cyan-600/70 hover:bg-zinc-850 hover:shadow-xl hover:shadow-cyan-950/30',
                  accentBar: 'bg-cyan-400 shadow-[0_0_16px_rgba(34,211,238,0.9)]',
                  badge: 'bg-cyan-500/25 text-cyan-300 border-cyan-500/40',
                  progressFill: 'from-cyan-500 to-teal-400',
                  highlightText: 'text-cyan-400',
                  toggleOpenBg: 'bg-cyan-500 text-zinc-950 font-bold border-cyan-400 shadow-md'
                }
              : tier.id === 'full_game_prototype'
              ? {
                  active: 'bg-gradient-to-b from-blue-950/80 via-zinc-900 to-zinc-950 border-blue-400 ring-2 ring-blue-500/50 shadow-2xl shadow-blue-950/60 scale-[1.01]',
                  inactive: 'bg-zinc-900/90 border-zinc-800 hover:border-blue-600/70 hover:bg-zinc-850 hover:shadow-xl hover:shadow-blue-950/30',
                  accentBar: 'bg-blue-400 shadow-[0_0_16px_rgba(96,165,250,0.9)]',
                  badge: 'bg-blue-500/25 text-blue-300 border-blue-500/40',
                  progressFill: 'from-blue-500 to-indigo-400',
                  highlightText: 'text-blue-400',
                  toggleOpenBg: 'bg-blue-500 text-zinc-950 font-bold border-blue-400 shadow-md'
                }
              : {
                  active: 'bg-gradient-to-b from-purple-950/80 via-zinc-900 to-zinc-950 border-purple-400 ring-2 ring-purple-500/50 shadow-2xl shadow-purple-950/60 scale-[1.01]',
                  inactive: 'bg-zinc-900/90 border-zinc-800 hover:border-purple-600/70 hover:bg-zinc-850 hover:shadow-xl hover:shadow-purple-950/30',
                  accentBar: 'bg-purple-400 shadow-[0_0_16px_rgba(192,132,252,0.9)]',
                  badge: 'bg-purple-500/25 text-purple-300 border-purple-500/40',
                  progressFill: 'from-purple-500 to-fuchsia-400',
                  highlightText: 'text-purple-400',
                  toggleOpenBg: 'bg-purple-500 text-zinc-950 font-bold border-purple-400 shadow-md'
                };

          return (
            <button
              key={tier.id}
              onClick={() => handleReportTierClick(tier.id)}
              className={`relative p-5 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                isActive || isDropdownOpen ? themeStyle.active : themeStyle.inactive
              }`}
            >
              {/* Glowing accent bar at top of card */}
              {(isActive || isDropdownOpen) && (
                <div className={`absolute top-0 left-0 right-0 h-1.5 rounded-t-2xl ${themeStyle.accentBar}`} />
              )}

              <div>
                {/* Header row: Badge, Report number, and Audio requirement */}
                <div className="flex items-center justify-between gap-1">
                  <span className={`text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded border ${themeStyle.badge}`}>
                    {tier.badge}
                  </span>
                  {tier.audioRequirement === 'Excluded' ? (
                    <span className="inline-flex items-center gap-1 text-[10px] text-zinc-400 font-mono bg-zinc-950/60 px-2 py-0.5 rounded border border-zinc-800" title="Audio excluded from prototype acceptance">
                      <VolumeX className="w-3 h-3 text-zinc-500" /> No Audio Req
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[10px] text-violet-300 font-mono bg-violet-950/60 px-2 py-0.5 rounded border border-violet-800/60" title="Audio required for commercial release">
                      <Volume2 className="w-3 h-3 text-violet-400" /> Audio Required
                    </span>
                  )}
                </div>

                {/* Title & scope summary */}
                <div className="text-base font-bold text-white group-hover:text-white mt-2.5 transition-colors">
                  {tier.title}
                </div>
                <p className="text-xs text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
                  {tier.scopeSummary}
                </p>

                {/* Sleek Mini Progress Track */}
                <div className="w-full bg-zinc-800/80 h-2 rounded-full overflow-hidden mt-3.5 border border-zinc-700/50">
                  <div 
                    className={`h-full bg-gradient-to-r ${themeStyle.progressFill} rounded-full transition-all duration-500 shadow-sm`}
                    style={{ width: `${Math.max(tier.headlinePercentage, 2)}%` }}
                  />
                </div>
              </div>

              {/* Incomplete Tasks Dropdown Trigger Row */}
              <div className="mt-4 pt-3 border-t border-zinc-800/80 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse shadow-sm shadow-amber-400/50" />
                    <span className="font-bold text-amber-300">
                      {incompleteTaskCount} Open Tasks
                    </span>
                    <span className="text-zinc-600">•</span>
                    <span className="text-zinc-400">
                      {incompleteSubjectCount} Subjects
                    </span>
                  </div>

                  <div className={`px-2.5 py-1 rounded-md flex items-center gap-1.5 text-[11px] font-bold font-mono transition-all border ${
                    isDropdownOpen 
                      ? `${themeStyle.toggleOpenBg}` 
                      : 'bg-zinc-800/90 text-zinc-300 border-zinc-700/80 group-hover:bg-zinc-750 group-hover:text-white group-hover:border-zinc-600'
                  }`}>
                    <span>{isDropdownOpen ? 'Close List' : 'Incomplete List'}</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      isDropdownOpen ? 'rotate-180' : 'text-zinc-400'
                    }`} />
                  </div>
                </div>

                <div className="flex items-center justify-between font-mono text-xs pt-1.5 border-t border-zinc-800/60">
                  <span className="font-bold text-zinc-300 text-[11px]">{tier.headlineMetric}</span>
                  <span className={`font-bold ${tier.headlinePercentage > 0 ? themeStyle.highlightText : 'text-zinc-500'}`}>
                    {tier.headlinePercentage.toFixed(1)}% Completed
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* 3. DROPDOWN LIST OF INCOMPLETE TASKS & SUBJECTS FOR CLICKED REPORT */}
      <IncompleteReportsDropdown
        subjects={subjects}
        openDropdownTier={openDropdownTier}
        onCloseDropdown={() => setOpenDropdownTier(null)}
        onSelectReportTier={(tier) => {
          setActiveReportTier(tier);
          setOpenDropdownTier(tier);
        }}
        onSelectSubject={(subjectId, tier) => {
          if (onNavigateToSubject) {
            onNavigateToSubject(subjectId, tier);
          }
        }}
      />

      {/* 4. Highlight Card for Active Report Scope & Boundaries */}
      <div className="bg-zinc-900/95 border border-cyan-500/30 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-zinc-800">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="px-2.5 py-1 rounded text-[10px] font-mono font-bold bg-cyan-500 text-zinc-950 uppercase tracking-wide">
              {activeReport.badge} Scope View
            </span>
            <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">{activeReport.title}</h3>
            <code className="text-[11px] font-mono text-cyan-300 bg-zinc-950 px-2.5 py-1 rounded border border-zinc-800 font-semibold">
              {activeReport.docFile}
            </code>
          </div>
          <span className="text-xs font-mono text-cyan-300 font-semibold bg-cyan-950/60 px-3 py-1 rounded-lg border border-cyan-800/60">
            {activeReport.secondaryMetric}
          </span>
        </div>

        <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
          {activeReport.scopeSummary}
        </p>

        {/* Boundary Rules */}
        <div className="bg-zinc-950/80 rounded-xl p-4 border border-zinc-800/90 space-y-2">
          <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 font-bold flex items-center gap-1.5">
            <Target className="w-3.5 h-3.5 text-cyan-400" />
            <span>Strict Scope Boundaries &amp; Delivery Guardrails:</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
            {activeReport.boundaries.map((boundary, idx) => (
              <div key={idx} className="flex items-start gap-2 text-zinc-300 font-mono text-[11px] leading-relaxed">
                <span className="text-cyan-400 font-bold shrink-0 mt-0.5">•</span>
                <span>{boundary}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Exhibition Mode Sub-View Toggle (Overview vs Sprint Backlog) */}
        {activeReportTier === 'exhibition_prototype' && (
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-2 pt-2 border-t border-zinc-800 flex-wrap">
              <button
                onClick={() => setExhibitionSubView('overview')}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
                  exhibitionSubView === 'overview'
                    ? 'bg-cyan-500 text-zinc-950 font-bold shadow-lg shadow-cyan-500/20'
                    : 'bg-zinc-800/90 text-zinc-300 hover:text-white hover:bg-zinc-700'
                }`}
              >
                <ListOrdered className="w-4 h-4" />
                <span>Exhibition Scope &amp; Deliverables Checklist</span>
              </button>

              <button
                onClick={() => setExhibitionSubView('sprint_backlog')}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
                  exhibitionSubView === 'sprint_backlog'
                    ? 'bg-cyan-500 text-zinc-950 font-bold shadow-lg shadow-cyan-500/20'
                    : 'bg-zinc-800/90 text-zinc-300 hover:text-white hover:bg-zinc-700'
                }`}
              >
                <Calendar className="w-4 h-4" />
                <span>100-Hour Sprint Backlog &amp; Rules Specification</span>
              </button>
            </div>

            {exhibitionSubView === 'sprint_backlog' && (
              <div className="mt-4 pt-2">
                <SprintBacklogTab />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
