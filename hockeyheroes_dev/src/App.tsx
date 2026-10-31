import React, { useState } from 'react';
import { 
  BarChart3,
  Layers, 
  Cpu,
  Sparkles,
  GitBranch
} from 'lucide-react';
import { INITIAL_ROADMAP_ITEMS } from './data/roadmapData';
import { PROGRESS_SUBJECTS_DATA, SCANNED_COMMIT } from './data/progressReportData';
import { AssetRoadmapItem, AssetStatus } from './types/roadmap';
import { ActiveReportsTab } from './components/ActiveReportsTab';
import { ProgressReportView } from './components/ProgressReportView';
import { RoadmapTab } from './components/RoadmapTab';
import { GitHubSyncModal } from './components/GitHubSyncModal';

type ActiveTab = 'active_reports' | 'progress' | 'roadmap';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('active_reports');
  const [targetSubjectId, setTargetSubjectId] = useState<string | null>(null);
  const [roadmapItems, setRoadmapItems] = useState<AssetRoadmapItem[]>(INITIAL_ROADMAP_ITEMS);
  const [isGitHubModalOpen, setIsGitHubModalOpen] = useState<boolean>(false);
  const [currentCommit, setCurrentCommit] = useState<string>(SCANNED_COMMIT);

  const handleUpdateStatus = (id: string, newStatus: AssetStatus) => {
    setRoadmapItems(prev => prev.map(item => item.id === id ? { ...item, status: newStatus } : item));
  };

  const handleNavigateToSubject = (subjectId: string) => {
    setTargetSubjectId(subjectId);
    setActiveTab('progress');
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-zinc-950">
      {/* Top Professional Header */}
      <header className="border-b border-zinc-800 bg-zinc-900/90 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div>
              <div className="flex items-center justify-center gap-2">
                <h1 className="text-base font-bold text-white tracking-tight">HOCKEY HEROES</h1>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-semibold">
                  UE 5.4 / 5.8
                </span>
              </div>
              <p className="text-xs text-zinc-400">
                Development Roadmap - Progress &amp; Status Report Page
              </p>
            </div>
          </div>

          {/* Quick Specifications Tag Bar */}
          <div className="flex items-center gap-3 font-mono">
            <button
              onClick={() => setIsGitHubModalOpen(true)}
              className="px-2.5 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700/80 border border-zinc-700 text-zinc-300 flex items-center gap-2 text-xs transition-all hover:border-cyan-500/50 group shadow-sm"
              title="Inspect live GitHub sync with jhayward9/hockeyheroes"
            >
              <GitBranch className="w-3.5 h-3.5 text-cyan-400 group-hover:rotate-12 transition-transform" />
              <span className="font-sans font-semibold text-zinc-200">GitHub Sync</span>
              <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-zinc-950 text-cyan-300 border border-zinc-700 font-bold">
                {currentCommit}
              </span>
            </button>

            <div className="flex flex-col items-center gap-1 font-mono">
              <div className="px-2.5 py-1 rounded-lg bg-zinc-800/80 border border-zinc-700/80 text-zinc-300 flex items-center gap-1.5 text-xs">
                <Cpu className="w-3.5 h-3.5 text-emerald-400" />
                <span>PC • Mobile • Console</span>
              </div>
              <a
                href="https://www.jhayward.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-zinc-400 hover:text-cyan-400 hover:underline transition-colors px-0.5 text-center self-center"
              >
                made by Jesse Hayward
              </a>
            </div>
          </div>
        </div>

        {/* Navigation Tabs Bar (Selector 4) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center gap-2 overflow-x-auto no-scrollbar border-t border-zinc-800/80 py-2">
          {/* 1. Leftmost Tab: Three Active Reports */}
          <button
            onClick={() => setActiveTab('active_reports')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap ${
              activeTab === 'active_reports'
                ? 'bg-gradient-to-r from-cyan-500/25 via-blue-500/25 to-purple-500/25 text-white border border-cyan-400/50 shadow-md shadow-cyan-950/40 ring-1 ring-cyan-500/30'
                : 'border border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60'
            }`}
          >
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Three Active Reports</span>
            <span className="px-1.5 py-0.5 rounded-full text-[10px] font-mono bg-cyan-400/20 text-cyan-300 border border-cyan-400/30 font-bold">
              3 Reports
            </span>
          </button>

          {/* 2. Middle Tab: Subjects Needing Attention & Progress */}
          <button
            onClick={() => setActiveTab('progress')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap ${
              activeTab === 'progress'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-md shadow-cyan-950/40'
                : 'border border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60'
            }`}
          >
            <BarChart3 className="w-4 h-4 text-cyan-400" />
            <span>Subjects Needing Attention &amp; Progress</span>
          </button>

          {/* 3. Right Tab: Asset Inventory */}
          <button
            onClick={() => setActiveTab('roadmap')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap ${
              activeTab === 'roadmap'
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-md shadow-purple-950/40'
                : 'border border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60'
            }`}
          >
            <Layers className="w-4 h-4 text-purple-400" />
            <span>Asset Inventory</span>
          </button>
        </div>
      </header>

      {/* Main Workbench Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'active_reports' && (
          <ActiveReportsTab 
            subjects={PROGRESS_SUBJECTS_DATA}
            onNavigateToSubject={handleNavigateToSubject}
            scannedCommit={currentCommit}
            onOpenGitHubSync={() => setIsGitHubModalOpen(true)}
          />
        )}

        {activeTab === 'progress' && (
          <ProgressReportView 
            targetSubjectId={targetSubjectId}
            onClearTargetSubject={() => setTargetSubjectId(null)}
            onOpenActiveReports={() => setActiveTab('active_reports')}
          />
        )}

        {activeTab === 'roadmap' && (
          <RoadmapTab 
            items={roadmapItems} 
            onUpdateStatus={handleUpdateStatus} 
          />
        )}
      </main>

      {/* Centered lochLAN Studio Footer */}
      <footer className="border-t border-zinc-800/80 bg-zinc-950 py-8 text-xs text-zinc-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center justify-center text-center space-y-3">
          <div className="relative group">
            <img 
              src="/assets/aistudio/lochlan_RGB_dark_483c18b2.jpg" 
              alt="lochLAN Logo" 
              className="w-16 h-16 sm:w-20 sm:h-20 object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div className="space-y-0.5">
            <p className="text-xs text-zinc-300 font-medium">
              Hockey Heroes by Jesse H. at LochLAN.
            </p>
            <p className="text-[11px] text-zinc-500 font-mono">
              © Copyright 2026
            </p>
          </div>
        </div>
      </footer>

      {/* GitHub Repository Live Sync Modal */}
      <GitHubSyncModal
        isOpen={isGitHubModalOpen}
        onClose={() => setIsGitHubModalOpen(false)}
        currentCommit={currentCommit}
        onSyncCommit={(newCommit) => setCurrentCommit(newCommit)}
      />
    </div>
  );
}
