import React, { useState, useMemo } from 'react';
import { ProgressSubject, ReportTier, SubjectTask } from '../types/roadmap';
import { 
  ChevronDown, 
  ChevronUp, 
  AlertTriangle, 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  Gamepad2, 
  Compass, 
  Trophy, 
  Zap, 
  ListOrdered, 
  CornerDownRight, 
  Search,
  Filter,
  ArrowRight,
  X,
  Layers
} from 'lucide-react';

export interface IncompleteSubjectItem {
  subject: ProgressSubject;
  incompleteTasks: SubjectTask[];
  completedTasks: SubjectTask[];
  remainingUnits: number;
  completionPct: number;
}

export interface ReportIncompleteSummary {
  tierId: ReportTier;
  reportNumber: string;
  title: string;
  badge: string;
  docFile: string;
  scopeSummary: string;
  audioRequirement: 'Excluded' | 'Required for Release';
  headlineMetric: string;
  headlinePercentage: number;
  themeColor: {
    accent: string;
    border: string;
    bg: string;
    activeBorder: string;
    activeBg: string;
    glow: string;
    badgeBg: string;
    badgeText: string;
    badgeBorder: string;
    text: string;
    progressFrom: string;
    progressTo: string;
  };
  incompleteSubjects: IncompleteSubjectItem[];
  totalIncompleteTasks: number;
}

// Helper to filter subjects belonging to each active report tier
export const getSubjectsForTier = (tier: ReportTier, allSubjects: ProgressSubject[]): ProgressSubject[] => {
  switch (tier) {
    case 'exhibition_prototype':
      // Exhibition simulation: hockey sprints, rink art, character sheets, production acceptance, controls
      return allSubjects.filter(s => 
        s.tier === 'exhibition_prototype' || 
        s.id === 'sub-char-source' || 
        s.id === 'sub-char-acceptance' || 
        s.id === 'sub-controls'
      );
    case 'full_game_prototype':
      // 2-city prototype: cities, overworld art & fn, customization, story, prototype gates, shared foundation
      return allSubjects.filter(s => 
        s.tier === 'full_game_prototype' || 
        s.tier === 'shared' || 
        s.id === 'sub-rink-art'
      );
    case 'full_game':
      // Full commercial game: all subjects, with full-game exclusives prioritized
      return allSubjects.filter(s => 
        s.tier === 'full_game' || 
        s.id === 'sub-customization' || 
        s.id === 'sub-exhibition' || 
        s.id === 'sub-story' || 
        s.id === 'sub-overworld-art' || 
        s.id === 'sub-controls' || 
        s.id === 'sub-char-acceptance'
      );
  }
};

// Compute incomplete data for all three reports
export const computeAllReportsIncompleteData = (allSubjects: ProgressSubject[]): ReportIncompleteSummary[] => {
  const configs: {
    tierId: ReportTier;
    reportNumber: string;
    title: string;
    badge: string;
    docFile: string;
    scopeSummary: string;
    audioRequirement: 'Excluded' | 'Required for Release';
    headlineMetric: string;
    headlinePercentage: number;
    themeColor: ReportIncompleteSummary['themeColor'];
  }[] = [
    {
      tierId: 'exhibition_prototype',
      reportNumber: 'Active Report 1',
      title: 'Exhibition Mode Prototype',
      badge: 'Standalone Simulation',
      docFile: 'EXHIBITION_PROGRESS_REPORT.md',
      scopeSummary: 'Standalone on-ice hockey simulation. Audio is explicitly excluded.',
      audioRequirement: 'Excluded',
      headlineMetric: '13 / 100 Sprints',
      headlinePercentage: 13.0,
      themeColor: {
        accent: 'cyan',
        border: 'border-zinc-800',
        bg: 'bg-zinc-900/80',
        activeBorder: 'border-cyan-400',
        activeBg: 'bg-gradient-to-b from-cyan-950/50 via-zinc-900 to-zinc-900',
        glow: 'shadow-cyan-950/50 ring-cyan-500/40',
        badgeBg: 'bg-cyan-500/20',
        badgeText: 'text-cyan-300',
        badgeBorder: 'border-cyan-500/40',
        text: 'text-cyan-400',
        progressFrom: 'from-cyan-500',
        progressTo: 'to-teal-400'
      }
    },
    {
      tierId: 'full_game_prototype',
      reportNumber: 'Active Report 2',
      title: 'Full Game Prototype (2-City RPG Sample)',
      badge: 'Bounded to Frontier & Superior',
      docFile: 'FULL_GAME_PROTOTYPE_PROGRESS_REPORT.md',
      scopeSummary: '2-city sports-RPG exploration. Audio excluded. 14 world cities deferred.',
      audioRequirement: 'Excluded',
      headlineMetric: '0 / 2 Playable Cities',
      headlinePercentage: 0.0,
      themeColor: {
        accent: 'blue',
        border: 'border-zinc-800',
        bg: 'bg-zinc-900/80',
        activeBorder: 'border-blue-400',
        activeBg: 'bg-gradient-to-b from-blue-950/50 via-zinc-900 to-zinc-900',
        glow: 'shadow-blue-950/50 ring-blue-500/40',
        badgeBg: 'bg-blue-500/20',
        badgeText: 'text-blue-300',
        badgeBorder: 'border-blue-500/40',
        text: 'text-blue-400',
        progressFrom: 'from-blue-500',
        progressTo: 'to-indigo-400'
      }
    },
    {
      tierId: 'full_game',
      reportNumber: 'Active Report 3',
      title: 'Full Game (Commercial Release)',
      badge: '16 Cities • Audio • Consoles',
      docFile: 'FULL_GAME_PROGRESS_REPORT.md',
      scopeSummary: 'Commercial release: 16-city narrative, full audio/SFX backlog & console ports.',
      audioRequirement: 'Required for Release',
      headlineMetric: '0 / 10 Story Streams',
      headlinePercentage: 0.0,
      themeColor: {
        accent: 'purple',
        border: 'border-zinc-800',
        bg: 'bg-zinc-900/80',
        activeBorder: 'border-purple-400',
        activeBg: 'bg-gradient-to-b from-purple-950/50 via-zinc-900 to-zinc-900',
        glow: 'shadow-purple-950/50 ring-purple-500/40',
        badgeBg: 'bg-purple-500/20',
        badgeText: 'text-purple-300',
        badgeBorder: 'border-purple-500/40',
        text: 'text-purple-400',
        progressFrom: 'from-purple-500',
        progressTo: 'to-fuchsia-400'
      }
    }
  ];

  return configs.map(cfg => {
    const tierSubjects = getSubjectsForTier(cfg.tierId, allSubjects);
    // Find incomplete subjects
    const incompleteSubjects: IncompleteSubjectItem[] = tierSubjects
      .filter(s => s.status !== 'completed' || s.percentage < 100)
      .map(s => {
        const incompleteTasks = s.tasks.filter(t => t.status !== 'complete');
        const completedTasks = s.tasks.filter(t => t.status === 'complete');
        return {
          subject: s,
          incompleteTasks,
          completedTasks,
          remainingUnits: s.totalUnits - s.completedUnits,
          completionPct: s.percentage
        };
      });

    const totalIncompleteTasks = incompleteSubjects.reduce(
      (sum, item) => sum + item.incompleteTasks.length,
      0
    );

    return {
      ...cfg,
      incompleteSubjects,
      totalIncompleteTasks
    };
  });
};

interface DropdownProps {
  subjects: ProgressSubject[];
  openDropdownTier: ReportTier | null;
  onCloseDropdown: () => void;
  onSelectReportTier: (tier: ReportTier) => void;
  onSelectSubject: (subjectId: string, tier: ReportTier) => void;
}

export const IncompleteReportsDropdown: React.FC<DropdownProps> = ({
  subjects,
  openDropdownTier,
  onCloseDropdown,
  onSelectReportTier,
  onSelectSubject
}) => {
  const [taskSearchQuery, setTaskSearchQuery] = useState('');
  const [expandedSubjectMap, setExpandedSubjectMap] = useState<Record<string, boolean>>({
    'sub-exhibition': true,
    'sub-proto-cities': true,
    'sub-customization': true,
    'sub-story': true,
    'sub-audio': true
  });

  const allReportsData = useMemo(() => computeAllReportsIncompleteData(subjects), [subjects]);

  const activeReport = useMemo(() => {
    if (!openDropdownTier) return null;
    return allReportsData.find(r => r.tierId === openDropdownTier) || null;
  }, [allReportsData, openDropdownTier]);

  if (!openDropdownTier || !activeReport) {
    return null;
  }

  const toggleSubjectExpand = (subjectId: string) => {
    setExpandedSubjectMap(prev => ({
      ...prev,
      [subjectId]: !prev[subjectId]
    }));
  };

  const expandAllSubjects = () => {
    const nextMap: Record<string, boolean> = {};
    activeReport.incompleteSubjects.forEach(item => {
      nextMap[item.subject.id] = true;
    });
    setExpandedSubjectMap(nextMap);
  };

  const collapseAllSubjects = () => {
    setExpandedSubjectMap({});
  };

  // Filter tasks within this open dropdown if user typed a search query
  const query = taskSearchQuery.toLowerCase().trim();

  const displayedSubjects = activeReport.incompleteSubjects.filter(item => {
    if (!query) return true;
    const matchesSubject = item.subject.title.toLowerCase().includes(query) ||
                           item.subject.nextStep.toLowerCase().includes(query) ||
                           item.subject.category.toLowerCase().includes(query);
    const matchesTasks = item.incompleteTasks.some(t => 
      t.name.toLowerCase().includes(query) || 
      t.id.toLowerCase().includes(query) || 
      (t.notes && t.notes.toLowerCase().includes(query))
    );
    return matchesSubject || matchesTasks;
  });

  // Calculate pointer arrow offset based on active tier
  // Column 1 (~16%), Column 2 (~50%), Column 3 (~84%)
  const pointerPosition = 
    openDropdownTier === 'exhibition_prototype' ? 'left-[16%]' :
    openDropdownTier === 'full_game_prototype' ? 'left-1/2 -translate-x-1/2' :
    'left-[84%] -translate-x-full';

  return (
    <div className="relative animate-in fade-in slide-in-from-top-2 duration-200 mt-2">
      {/* Anchor Notch pointing to the clicked report button */}
      <div className={`hidden md:block absolute -top-2 ${pointerPosition} w-4 h-4 rotate-45 bg-zinc-900 border-t border-l border-cyan-500/40 z-10`} />

      <div className="bg-zinc-900/95 backdrop-blur-md border border-cyan-500/40 rounded-2xl p-4 sm:p-5 shadow-2xl shadow-cyan-950/40 space-y-4">
        {/* Dropdown Header & Quick Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-zinc-800">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${activeReport.themeColor.badgeBg} ${activeReport.themeColor.badgeText} border ${activeReport.themeColor.badgeBorder}`}>
                {activeReport.reportNumber} Dropdown List
              </span>
              <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                <span>Incomplete Checklist:</span>
                <span className={activeReport.themeColor.text}>{activeReport.title}</span>
              </h3>
            </div>
            <p className="text-xs text-zinc-400 flex items-center gap-2 font-mono">
              <span className="text-amber-400 font-bold">{activeReport.incompleteSubjects.length} subjects needing attention</span>
              <span className="text-zinc-600">•</span>
              <span className="text-zinc-200 font-semibold">{activeReport.totalIncompleteTasks} open tasks remaining</span>
              <span className="text-zinc-600">•</span>
              <code className="text-[10px] text-zinc-400 bg-zinc-950 px-1.5 py-0.5 rounded border border-zinc-800">
                {activeReport.docFile}
              </code>
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
            {/* Search Filter Inside Dropdown */}
            <div className="relative w-full sm:w-60">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                placeholder={`Search ${activeReport.totalIncompleteTasks} open tasks...`}
                value={taskSearchQuery}
                onChange={(e) => setTaskSearchQuery(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-700/80 rounded-lg pl-8 pr-3 py-1.5 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-cyan-500 font-mono"
              />
              {taskSearchQuery && (
                <button
                  type="button"
                  onClick={() => setTaskSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Expand / Collapse All */}
            <div className="flex items-center gap-1 border border-zinc-800 rounded-lg p-0.5 bg-zinc-950">
              <button
                type="button"
                onClick={expandAllSubjects}
                className="px-2 py-1 text-[10px] font-mono font-semibold text-zinc-400 hover:text-white rounded hover:bg-zinc-800 transition-colors"
                title="Expand all incomplete subjects"
              >
                Expand All
              </button>
              <span className="text-zinc-700">|</span>
              <button
                type="button"
                onClick={collapseAllSubjects}
                className="px-2 py-1 text-[10px] font-mono font-semibold text-zinc-400 hover:text-white rounded hover:bg-zinc-800 transition-colors"
                title="Collapse all incomplete subjects"
              >
                Collapse
              </button>
            </div>

            {/* Close Dropdown Button */}
            <button
              type="button"
              onClick={onCloseDropdown}
              className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors border border-zinc-700 flex items-center gap-1 text-xs font-mono"
              title="Close this dropdown checklist"
            >
              <X className="w-4 h-4" />
              <span className="hidden sm:inline">Close</span>
            </button>
          </div>
        </div>

        {/* Quick Report Switcher Tabs inside dropdown */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-mono">
          <span className="text-zinc-500 text-[11px] shrink-0">Switch Active Dropdown:</span>
          {allReportsData.map(rep => {
            const isCurrent = rep.tierId === openDropdownTier;
            return (
              <button
                key={rep.tierId}
                type="button"
                onClick={() => {
                  onSelectReportTier(rep.tierId);
                }}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all flex items-center gap-1.5 shrink-0 border ${
                  isCurrent
                    ? `${rep.themeColor.badgeBg} ${rep.themeColor.badgeText} ${rep.themeColor.badgeBorder}`
                    : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:border-zinc-700 hover:text-zinc-200'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${isCurrent ? 'bg-amber-400 animate-pulse' : 'bg-zinc-600'}`} />
                <span>{rep.title.split('(')[0].trim()}</span>
                <span className="text-[10px] opacity-75">({rep.totalIncompleteTasks} open)</span>
              </button>
            );
          })}
        </div>

        {/* Incomplete Subjects List */}
        <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
          {displayedSubjects.map(({ subject, incompleteTasks, completedTasks, remainingUnits, completionPct }) => {
            const isExpanded = !!expandedSubjectMap[subject.id];

            return (
              <div
                key={subject.id}
                className="bg-zinc-950/70 border border-zinc-800 hover:border-zinc-700/80 rounded-xl overflow-hidden transition-all shadow-sm"
              >
                {/* Subject Header Row */}
                <div 
                  className="p-3.5 flex flex-col md:flex-row md:items-center justify-between gap-3 cursor-pointer select-none hover:bg-zinc-900/60 transition-colors"
                  onClick={() => toggleSubjectExpand(subject.id)}
                >
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-zinc-400 font-semibold border border-zinc-800">
                        {subject.category}
                      </span>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold ${
                        subject.status === 'needs_attention' 
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' 
                          : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                      }`}>
                        {subject.status === 'needs_attention' ? 'Needs Attention' : 'In Progress'}
                      </span>
                      <h4 className="text-xs sm:text-sm font-bold text-zinc-100">{subject.title}</h4>
                    </div>

                    {/* Next immediate step indicator */}
                    <div className="flex items-center gap-1.5 text-[11px] font-mono text-zinc-300 pt-0.5">
                      <Zap className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span className="text-cyan-400 font-semibold">Next Step:</span>
                      <span className="truncate text-zinc-200">{subject.nextStep}</span>
                    </div>
                  </div>

                  {/* Completion status & Focus button */}
                  <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
                    <div className="text-right font-mono">
                      <div className="text-xs font-bold text-amber-400">
                        {remainingUnits} {subject.unitLabel} remaining
                      </div>
                      <div className="text-[10px] text-zinc-500">
                        {subject.completedUnits} / {subject.totalUnits} done ({completionPct.toFixed(1)}%)
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectSubject(subject.id, activeReport.tierId);
                      }}
                      className="px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white text-xs font-mono flex items-center gap-1 transition-colors border border-zinc-700"
                      title="Scroll to and focus this subject in the main view below"
                    >
                      <span>Focus</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>

                    <div className="p-1 text-zinc-400 hover:text-white">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </div>
                </div>

                {/* Incomplete Tasks Checklist inside this subject */}
                {isExpanded && (
                  <div className="p-3.5 pt-2 border-t border-zinc-800/80 bg-zinc-900/40 space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 pb-1 border-b border-zinc-800/60">
                      <span className="font-semibold text-zinc-300 flex items-center gap-1">
                        <CornerDownRight className="w-3.5 h-3.5 text-amber-400" />
                        <span>Incomplete Tasks ({incompleteTasks.length} open):</span>
                      </span>
                      <span className="text-[10px] text-zinc-500 font-mono">
                        {completedTasks.length} already completed
                      </span>
                    </div>

                    <div className="grid grid-cols-1 gap-1.5 max-h-72 overflow-y-auto pr-1">
                      {incompleteTasks.map(task => (
                        <div 
                          key={task.id}
                          className={`p-2.5 rounded-lg border flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs transition-colors ${
                            task.status === 'in_progress'
                              ? 'bg-cyan-950/25 border-cyan-800/50 text-cyan-200'
                              : task.status === 'blocked'
                              ? 'bg-red-950/25 border-red-800/50 text-red-200'
                              : 'bg-zinc-900/70 border-zinc-800/80 text-zinc-300 hover:border-zinc-700'
                          }`}
                        >
                          <div className="flex items-start gap-2">
                            <span className={`px-1.5 py-0.5 rounded font-mono text-[10px] font-bold mt-0.5 shrink-0 ${
                              task.status === 'in_progress' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' :
                              task.status === 'blocked' ? 'bg-red-500/20 text-red-300 border border-red-500/30' :
                              'bg-zinc-800 text-zinc-400 border border-zinc-700'
                            }`}>
                              {task.id}
                            </span>
                            <div>
                              <div className="font-medium text-zinc-200 text-xs">
                                {task.name}
                              </div>
                              {task.notes && (
                                <p className="text-[11px] text-zinc-400 font-mono mt-0.5">
                                  {task.notes}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="shrink-0 self-end sm:self-center">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-semibold font-mono ${
                              task.status === 'in_progress' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' :
                              task.status === 'blocked' ? 'bg-red-500/20 text-red-300 border border-red-500/40' :
                              'bg-zinc-800 text-zinc-400 border border-zinc-700'
                            }`}>
                              {task.status === 'in_progress' ? 'In Progress' :
                               task.status === 'blocked' ? 'Blocked / Awaiting Delivery' :
                               'Pending'}
                            </span>
                          </div>
                        </div>
                      ))}

                      {incompleteTasks.length === 0 && (
                        <div className="py-4 text-center text-xs text-emerald-400 font-mono flex items-center justify-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>All registered tasks in this subject are complete!</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {displayedSubjects.length === 0 && (
            <div className="p-6 text-center text-zinc-400 text-xs bg-zinc-950 rounded-xl border border-zinc-800 font-mono">
              No incomplete tasks or subjects found matching "{taskSearchQuery}".
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
