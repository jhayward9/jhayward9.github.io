import React, { useState, useMemo } from 'react';
import { AssetRoadmapItem, AssetCategory, AssetStatus, InventoryTier } from '../types/roadmap';
import { 
  Search, 
  Layers, 
  Box, 
  User, 
  MessageSquare, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Download, 
  HardDrive, 
  Cpu, 
  ChevronDown, 
  ChevronUp, 
  MapPin, 
  Lock, 
  ShieldAlert, 
  ShieldCheck, 
  X, 
  AlertTriangle,
  Gamepad2,
  Compass,
  Trophy,
  VolumeX,
  Volume2,
  Info
} from 'lucide-react';

interface Props {
  items: AssetRoadmapItem[];
  onUpdateStatus: (id: string, newStatus: AssetStatus) => void;
}

const AUTHORIZED_GOOGLE_EMAIL = 'jesseianhayward@gmail.com';

interface TierDefinition {
  id: InventoryTier;
  label: string;
  badge: string;
  tagline: string;
  scopeBoundaries: string;
  audioExcluded: boolean;
  accentColor: string;
  activeBorder: string;
  activeBg: string;
}

const TIER_DEFINITIONS: Record<InventoryTier, TierDefinition> = {
  exhibition: {
    id: 'exhibition',
    label: 'Exhibition Mode',
    badge: 'Standalone Simulation Prototype',
    tagline: 'Core on-ice hockey simulation: 8-way player/goalie locomotion, rink geometry, curved nets, and HUD.',
    scopeBoundaries: 'Audio is EXCLUDED. Only on-ice simulation and arena geometry are required.',
    audioExcluded: true,
    accentColor: 'text-cyan-400',
    activeBorder: 'border-cyan-500',
    activeBg: 'bg-cyan-500/10'
  },
  full_game_prototype: {
    id: 'full_game_prototype',
    label: 'Full Game Prototype',
    badge: '2-City Story Sample (Frontier & Superior)',
    tagline: 'Bounded RPG exploration: Normund campus & Hisery rival arena, winter town, and customization baseline.',
    scopeBoundaries: 'Audio is EXCLUDED. Playable overworld is strictly bounded to 2 cities. Remaining 14 cities deferred.',
    audioExcluded: true,
    accentColor: 'text-blue-400',
    activeBorder: 'border-blue-500',
    activeBg: 'bg-blue-500/10'
  },
  full_game: {
    id: 'full_game',
    label: 'Full Game Release',
    badge: 'Commercial Game Release (v1.0)',
    tagline: 'Complete game scope: 16 regional cities, 8 SFX audio groups, store catalogue, and release branding.',
    scopeBoundaries: 'All systems & assets required. Full 16-bit audio suite, store catalogue, and multi-city tournament campaign.',
    audioExcluded: false,
    accentColor: 'text-purple-400',
    activeBorder: 'border-purple-500',
    activeBg: 'bg-purple-500/10'
  }
};

export const RoadmapTab: React.FC<Props> = ({ items, onUpdateStatus }) => {
  // Three report tabs
  const [activeTier, setActiveTier] = useState<InventoryTier>('exhibition');
  const [selectedCategory, setSelectedCategory] = useState<AssetCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>('CHR_SKT_F_BASE');
  const [activeFilterView, setActiveFilterView] = useState<'incomplete' | 'complete' | 'all'>('incomplete');

  // Authorization State
  const [currentUserEmail, setCurrentUserEmail] = useState<string | null>(() => {
    return localStorage.getItem('hh_authenticated_google_email');
  });
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [authEmailInput, setAuthEmailInput] = useState<string>('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [unauthorizedBanner, setUnauthorizedBanner] = useState<string | null>(null);

  // 1. Filter items by active tier
  const tierItems = useMemo(() => {
    return items.filter(item => item.requiredFor.includes(activeTier));
  }, [items, activeTier]);

  // 2. Further filter by Category & Search query
  const filteredItems = useMemo(() => {
    return tierItems.filter(item => {
      const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            (item.scopeNote && item.scopeNote.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCat && matchesSearch;
    });
  }, [tierItems, selectedCategory, searchQuery]);

  // 3. Separate into Incomplete / Missing vs Complete & Reviewed
  const incompleteItems = useMemo(() => {
    return filteredItems.filter(item => item.status !== 'ready');
  }, [filteredItems]);

  const completeItems = useMemo(() => {
    return filteredItems.filter(item => item.status === 'ready');
  }, [filteredItems]);

  // Overall tier counts (unfiltered by category/search) for the metrics cards
  const totalTierIncomplete = useMemo(() => {
    return tierItems.filter(item => item.status !== 'ready').length;
  }, [tierItems]);

  const totalTierComplete = useMemo(() => {
    return tierItems.filter(item => item.status === 'ready').length;
  }, [tierItems]);

  const tierCompletionPercentage = useMemo(() => {
    if (tierItems.length === 0) return 0;
    return Math.round((totalTierComplete / tierItems.length) * 100);
  }, [totalTierComplete, tierItems]);

  const tierVRAM = useMemo(() => {
    return tierItems.reduce((sum, item) => sum + item.specs.vramFootprintMB, 0).toFixed(1);
  }, [tierItems]);

  const currentTierMeta = TIER_DEFINITIONS[activeTier];

  const executeDownload = () => {
    const md = `# Hockey Heroes Asset Roadmap — ${currentTierMeta.label} Status Report\n\n` +
      `**Exported by:** ${AUTHORIZED_GOOGLE_EMAIL}\n` +
      `**Scope Milestone:** ${currentTierMeta.label} (${currentTierMeta.badge})\n` +
      `**Scope Boundaries:** ${currentTierMeta.scopeBoundaries}\n` +
      `**Timestamp:** ${new Date().toISOString()}\n\n` +
      `## Summary Metrics\n` +
      `- Incomplete / Missing Assets: ${totalTierIncomplete}\n` +
      `- Complete & Reviewed Assets: ${totalTierComplete}\n` +
      `- Milestone Completion Rate: ${tierCompletionPercentage}%\n` +
      `- Estimated VRAM Footprint: ${tierVRAM} MB\n\n` +
      `---\n\n` +
      `## 1. Incomplete / Missing Assets for ${currentTierMeta.label} (${incompleteItems.length} items)\n\n` +
      `| Asset ID | Name | Category | Status | Priority | Format | Missing / Scope Note |\n` +
      `|---|---|---|---|---|---|---|\n` +
      incompleteItems.map(i => `| ${i.id} | ${i.name} | ${i.category} | ${i.status} | ${i.priority} | ${i.format} | ${i.scopeNote || 'Pending completion'} |`).join('\n') +
      `\n\n## 2. Complete & Reviewed Assets in ${currentTierMeta.label} (${completeItems.length} items)\n\n` +
      `| Asset ID | Name | Category | Status | Priority | Format | Source Origin |\n` +
      `|---|---|---|---|---|---|---|\n` +
      completeItems.map(i => `| ${i.id} | ${i.name} | ${i.category} | ${i.status} | ${i.priority} | ${i.format} | ${i.sourceOrigin} |`).join('\n') +
      `\n\n## Technical Implementation & Parity Notes\n\n` +
      tierItems.map(i => `### ${i.id}: ${i.name}\n- **Milestone Status:** ${i.status === 'ready' ? 'Complete & Reviewed' : 'Incomplete / Missing'}\n- **Scope Note:** ${i.scopeNote || 'N/A'}\n- **Origin/Format:** ${i.sourceOrigin} (${i.format})\n- **Technical Details:** ${i.technicalNotes}\n`).join('\n');

    const blob = new Blob([md], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `hockey-heroes-asset-report-${activeTier}-${new Date().toISOString().split('T')[0]}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportClick = () => {
    setUnauthorizedBanner(null);
    setAuthError(null);

    // Check if the current session is verified as the authorized user
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

  const getStatusBadge = (status: AssetStatus) => {
    switch (status) {
      case 'ready':
        return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"><CheckCircle2 className="w-3 h-3" /> Complete &amp; Reviewed</span>;
      case 'in_progress':
        return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-400 border border-amber-500/30"><Clock className="w-3 h-3" /> In Progress</span>;
      case 'prototype_fallback':
        return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-purple-500/15 text-purple-400 border border-purple-500/30"><Layers className="w-3 h-3" /> Prototype Fallback</span>;
      case 'planned':
        return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-zinc-500/15 text-zinc-400 border border-zinc-500/30"><AlertCircle className="w-3 h-3" /> Incomplete / Missing</span>;
    }
  };

  const getCategoryIcon = (cat: AssetCategory) => {
    switch (cat) {
      case 'characters': return <User className="w-4 h-4 text-cyan-400" />;
      case 'rink': return <Box className="w-4 h-4 text-emerald-400" />;
      case 'ui': return <MessageSquare className="w-4 h-4 text-amber-400" />;
      case 'overworld': return <MapPin className="w-4 h-4 text-blue-400" />;
      case 'vfx_audio': return <Sparkles className="w-4 h-4 text-violet-400" />;
    }
  };

  const renderAssetCard = (item: AssetRoadmapItem, isMissing: boolean) => {
    const isExpanded = expandedId === item.id;
    return (
      <div
        key={item.id}
        className={`bg-zinc-900/70 border transition-all rounded-xl overflow-hidden ${
          isExpanded 
            ? isMissing ? 'border-amber-500/50 ring-1 ring-amber-500/20' : 'border-emerald-500/50 ring-1 ring-emerald-500/20'
            : isMissing 
              ? 'border-amber-500/30 hover:border-amber-500/50' 
              : 'border-zinc-800/80 hover:border-zinc-700'
        }`}
      >
        {/* Header Row */}
        <div 
          className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer select-none"
          onClick={() => setExpandedId(isExpanded ? null : item.id)}
        >
          <div className="flex items-start sm:items-center gap-3">
            <div className={`p-2 rounded-lg border mt-0.5 sm:mt-0 ${
              isMissing ? 'bg-amber-500/10 border-amber-500/30' : 'bg-zinc-800/80 border-zinc-700/60'
            }`}>
              {getCategoryIcon(item.category)}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-mono text-xs text-cyan-400 font-semibold">{item.id}</span>
                <span className="text-sm font-semibold text-zinc-100">{item.name}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded font-medium ${
                  item.priority === 'Critical' ? 'bg-red-500/20 text-red-300 border border-red-500/30' :
                  item.priority === 'High' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                  'bg-zinc-700/40 text-zinc-300'
                }`}>
                  {item.priority}
                </span>
                {isMissing && (
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 font-semibold">
                    Missing for {currentTierMeta.label}
                  </span>
                )}
              </div>
              <p className="text-xs text-zinc-400 mt-1 line-clamp-1">{item.description}</p>
              {item.scopeNote && (
                <div className="mt-1 text-[11px] text-zinc-300 flex items-center gap-1.5">
                  <span className="text-amber-400 font-medium">Scope Impact:</span>
                  <span className="italic text-zinc-300">{item.scopeNote}</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3 self-end sm:self-center">
            <div className="text-right hidden md:block">
              <div className="text-xs font-mono text-zinc-300">{item.specs.vramFootprintMB} MB</div>
              <div className="text-[10px] text-zinc-500">{item.specs.drawCalls} Draw Call(s)</div>
            </div>
            {getStatusBadge(item.status)}
            {isExpanded ? <ChevronUp className="w-4 h-4 text-zinc-400" /> : <ChevronDown className="w-4 h-4 text-zinc-400" />}
          </div>
        </div>

        {/* Expanded Details */}
        {isExpanded && (
          <div className="px-4 pb-4 pt-2 border-t border-zinc-800/80 bg-zinc-950/40 space-y-3">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="bg-zinc-900/80 p-2.5 rounded-lg border border-zinc-800">
                <span className="text-zinc-500 block text-[10px] uppercase font-mono">Format &amp; Target</span>
                <span className="font-medium text-zinc-200 mt-0.5 block">{item.format}</span>
              </div>

              <div className="bg-zinc-900/80 p-2.5 rounded-lg border border-zinc-800">
                <span className="text-zinc-500 block text-[10px] uppercase font-mono">Resolution / Polys</span>
                <span className="font-mono text-cyan-300 mt-0.5 block">
                  {item.specs.textureRes || `${item.specs.polyCount} Tris`}
                </span>
              </div>

              <div className="bg-zinc-900/80 p-2.5 rounded-lg border border-zinc-800">
                <span className="text-zinc-500 block text-[10px] uppercase font-mono">Source Provenance</span>
                <span className="font-mono text-zinc-300 mt-0.5 block text-[11px] truncate" title={item.sourceOrigin}>
                  {item.sourceOrigin}
                </span>
              </div>

              <div className="bg-zinc-900/80 p-2.5 rounded-lg border border-zinc-800">
                <span className="text-zinc-500 block text-[10px] uppercase font-mono">Toggle Status</span>
                <select
                  value={item.status}
                  onChange={(e) => onUpdateStatus(item.id, e.target.value as AssetStatus)}
                  className="mt-0.5 w-full bg-zinc-950 text-xs text-zinc-200 border border-zinc-700 rounded px-1.5 py-0.5 focus:outline-none focus:border-cyan-500 font-mono"
                >
                  <option value="ready">Complete &amp; Reviewed</option>
                  <option value="in_progress">In Progress</option>
                  <option value="prototype_fallback">Prototype Fallback</option>
                  <option value="planned">Incomplete / Missing</option>
                </select>
              </div>
            </div>

            {/* Scope Gap Callout if Incomplete */}
            {isMissing && (
              <div className="p-3 rounded-lg bg-amber-950/40 border border-amber-500/30 text-xs text-amber-200 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-amber-300 block">Missing for {currentTierMeta.label} Parity:</span>
                  <span className="text-[11px] leading-relaxed text-amber-200/90">
                    {item.scopeNote || 'Asset is marked incomplete and is required to reach 100% completion for this report tier.'}
                  </span>
                </div>
              </div>
            )}

            <div className="bg-zinc-900/90 border border-zinc-800/90 rounded-lg p-3">
              <div className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5 mb-1">
                <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                <span>Technical Implementation &amp; Parity Notes:</span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed font-mono">
                {item.technicalNotes}
              </p>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Unauthorized User Alert Banner */}
      {unauthorizedBanner && (
        <div className="p-3.5 bg-red-950/80 border border-red-500/50 rounded-xl text-red-200 flex items-center justify-between text-xs animate-shake shadow-lg">
          <div className="flex items-center gap-2.5">
            <ShieldAlert className="w-5 h-5 text-red-400 shrink-0" />
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

      {/* THREE REPORT TABS HEADER */}
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-2 sm:p-3 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 px-2 border-b border-zinc-800/80">
          <div>
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>Asset Inventory by Report Tier</span>
            </h2>
            <p className="text-xs text-zinc-400">
              Select a milestone report to inspect what assets are incomplete/missing vs complete for that specific scope.
            </p>
          </div>
          <div className="text-[11px] font-mono text-zinc-500 self-start sm:self-auto">
            Viewing: <strong className="text-zinc-200">{currentTierMeta.label}</strong>
          </div>
        </div>

        {/* The 3 Tabs Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 pt-2.5">
          {/* TAB 1: Exhibition Mode */}
          <button
            onClick={() => {
              setActiveTier('exhibition');
              setActiveFilterView('incomplete');
            }}
            className={`flex items-start gap-3 p-3 rounded-xl border text-left transition-all ${
              activeTier === 'exhibition'
                ? 'bg-cyan-500/10 border-cyan-500/60 ring-1 ring-cyan-500/30'
                : 'bg-zinc-950/50 border-zinc-800/80 hover:bg-zinc-800/40 text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <div className={`p-2 rounded-lg mt-0.5 shrink-0 ${
              activeTier === 'exhibition' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'bg-zinc-900 text-zinc-400 border border-zinc-800'
            }`}>
              <Gamepad2 className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1">
                <span className={`text-xs font-bold uppercase tracking-wider ${
                  activeTier === 'exhibition' ? 'text-cyan-300' : 'text-zinc-200'
                }`}>
                  Exhibition Mode
                </span>
                <span className="text-[10px] px-1.5 py-0.2 rounded font-mono font-medium bg-zinc-800 text-zinc-300 border border-zinc-700/60">
                  {items.filter(i => i.requiredFor.includes('exhibition') && i.status !== 'ready').length} Missing
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 mt-1 line-clamp-1">
                Standalone Hockey Prototype
              </p>
              <div className="flex items-center gap-1.5 mt-1 text-[10px] text-emerald-400/90 font-mono">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                <span>{items.filter(i => i.requiredFor.includes('exhibition') && i.status === 'ready').length} assets complete</span>
              </div>
            </div>
          </button>

          {/* TAB 2: Full Game Prototype */}
          <button
            onClick={() => {
              setActiveTier('full_game_prototype');
              setActiveFilterView('incomplete');
            }}
            className={`flex items-start gap-3 p-3 rounded-xl border text-left transition-all ${
              activeTier === 'full_game_prototype'
                ? 'bg-blue-500/10 border-blue-500/60 ring-1 ring-blue-500/30'
                : 'bg-zinc-950/50 border-zinc-800/80 hover:bg-zinc-800/40 text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <div className={`p-2 rounded-lg mt-0.5 shrink-0 ${
              activeTier === 'full_game_prototype' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40' : 'bg-zinc-900 text-zinc-400 border border-zinc-800'
            }`}>
              <Compass className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1">
                <span className={`text-xs font-bold uppercase tracking-wider ${
                  activeTier === 'full_game_prototype' ? 'text-blue-300' : 'text-zinc-200'
                }`}>
                  Full Game Prototype
                </span>
                <span className="text-[10px] px-1.5 py-0.2 rounded font-mono font-medium bg-zinc-800 text-zinc-300 border border-zinc-700/60">
                  {items.filter(i => i.requiredFor.includes('full_game_prototype') && i.status !== 'ready').length} Missing
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 mt-1 line-clamp-1">
                2-City Sample (Frontier &amp; Superior)
              </p>
              <div className="flex items-center gap-1.5 mt-1 text-[10px] text-emerald-400/90 font-mono">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                <span>{items.filter(i => i.requiredFor.includes('full_game_prototype') && i.status === 'ready').length} assets complete</span>
              </div>
            </div>
          </button>

          {/* TAB 3: Full Game Release */}
          <button
            onClick={() => {
              setActiveTier('full_game');
              setActiveFilterView('incomplete');
            }}
            className={`flex items-start gap-3 p-3 rounded-xl border text-left transition-all ${
              activeTier === 'full_game'
                ? 'bg-purple-500/10 border-purple-500/60 ring-1 ring-purple-500/30'
                : 'bg-zinc-950/50 border-zinc-800/80 hover:bg-zinc-800/40 text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <div className={`p-2 rounded-lg mt-0.5 shrink-0 ${
              activeTier === 'full_game' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40' : 'bg-zinc-900 text-zinc-400 border border-zinc-800'
            }`}>
              <Trophy className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1">
                <span className={`text-xs font-bold uppercase tracking-wider ${
                  activeTier === 'full_game' ? 'text-purple-300' : 'text-zinc-200'
                }`}>
                  Full Game Release
                </span>
                <span className="text-[10px] px-1.5 py-0.2 rounded font-mono font-medium bg-zinc-800 text-zinc-300 border border-zinc-700/60">
                  {items.filter(i => i.requiredFor.includes('full_game') && i.status !== 'ready').length} Missing
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 mt-1 line-clamp-1">
                Commercial Release (16 Cities &amp; Audio)
              </p>
              <div className="flex items-center gap-1.5 mt-1 text-[10px] text-emerald-400/90 font-mono">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                <span>{items.filter(i => i.requiredFor.includes('full_game') && i.status === 'ready').length} assets complete</span>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Scope Boundaries & Rules Banner for Active Tier */}
      <div className="p-3.5 bg-zinc-900/80 border border-zinc-800 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
        <div className="flex items-start gap-2.5">
          <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-zinc-200 uppercase tracking-wide">
                Active Scope: {currentTierMeta.label}
              </span>
              <span className="text-[11px] text-zinc-400 font-mono">
                ({currentTierMeta.badge})
              </span>
            </div>
            <p className="text-zinc-400 text-[11px] mt-0.5">
              {currentTierMeta.tagline}
            </p>
          </div>
        </div>

        {/* Audio exclusion or inclusion badge */}
        <div className="flex items-center gap-2 shrink-0 self-start md:self-auto">
          {currentTierMeta.audioExcluded ? (
            <div className="px-2.5 py-1 rounded-lg bg-zinc-800/90 border border-zinc-700 text-zinc-300 flex items-center gap-1.5 font-mono text-[11px]">
              <VolumeX className="w-3.5 h-3.5 text-amber-400" />
              <span>Audio is <strong>EXCLUDED</strong> from this milestone</span>
            </div>
          ) : (
            <div className="px-2.5 py-1 rounded-lg bg-purple-950/50 border border-purple-500/40 text-purple-200 flex items-center gap-1.5 font-mono text-[11px]">
              <Volume2 className="w-3.5 h-3.5 text-purple-300" />
              <span>Audio &amp; SFX Backlog is <strong>REQUIRED</strong></span>
            </div>
          )}
        </div>
      </div>

      {/* Metrics Banner for Selected Tier */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Missing / Incomplete */}
        <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-4 flex items-center justify-between">
          <div>
            <div className="text-xs text-zinc-400 font-medium uppercase tracking-wider">
              Incomplete / Missing
            </div>
            <div className="text-2xl font-bold text-amber-400 mt-1">
              {totalTierIncomplete}
            </div>
            <div className="text-xs text-zinc-500 mt-0.5">
              Required for {currentTierMeta.label}
            </div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
            <Clock className="w-5 h-5 text-amber-400" />
          </div>
        </div>

        {/* Complete & Reviewed */}
        <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-4 flex items-center justify-between">
          <div>
            <div className="text-xs text-zinc-400 font-medium uppercase tracking-wider">
              Complete &amp; Reviewed
            </div>
            <div className="text-2xl font-bold text-emerald-400 mt-1">
              {totalTierComplete}
            </div>
            <div className="text-xs text-zinc-500 mt-0.5">
              Verified in C++ engine
            </div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          </div>
        </div>

        {/* Milestone Completion Rate */}
        <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-4 flex items-center justify-between">
          <div>
            <div className="text-xs text-zinc-400 font-medium uppercase tracking-wider">
              Milestone Progress
            </div>
            <div className="text-2xl font-bold text-cyan-300 mt-1">
              {tierCompletionPercentage}%
            </div>
            <div className="text-xs text-zinc-500 mt-0.5">
              {totalTierComplete} of {tierItems.length} assets ready
            </div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5 text-cyan-400" />
          </div>
        </div>

        {/* Tier VRAM Footprint */}
        <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-4 flex items-center justify-between">
          <div>
            <div className="text-xs text-zinc-400 font-medium uppercase tracking-wider">
              Tier VRAM Footprint
            </div>
            <div className="text-2xl font-bold text-purple-300 mt-1">
              {tierVRAM} MB
            </div>
            <div className="text-xs text-zinc-500 mt-0.5">
              Target &lt; 250MB Web / 512MB Mobile
            </div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
            <HardDrive className="w-5 h-5 text-purple-400" />
          </div>
        </div>
      </div>

      {/* Controls Bar: View Toggle, Category Filter, Search, and Protected Export */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between bg-zinc-900/90 border border-zinc-800 p-3 rounded-xl">
        <div className="flex flex-wrap items-center gap-2">
          {/* Category Filter Pills */}
          {(['all', 'characters', 'rink', 'overworld', 'ui', 'vfx_audio'] as const).map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedCategory === cat 
                  ? 'bg-cyan-500 text-zinc-950 font-semibold shadow-sm' 
                  : 'bg-zinc-800/80 text-zinc-300 hover:bg-zinc-700/80'
              }`}
            >
              {cat === 'all' ? 'All Types' : cat === 'vfx_audio' ? 'VFX & Audio' : cat.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
          {/* Status View Filter Toggle */}
          <div className="flex items-center bg-zinc-950 p-1 rounded-lg border border-zinc-800 text-xs font-medium">
            <button
              onClick={() => setActiveFilterView('incomplete')}
              className={`px-2.5 py-1 rounded transition-colors ${
                activeFilterView === 'incomplete' 
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold' 
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Incomplete ({incompleteItems.length})
            </button>
            <button
              onClick={() => setActiveFilterView('complete')}
              className={`px-2.5 py-1 rounded transition-colors ${
                activeFilterView === 'complete' 
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold' 
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Complete ({completeItems.length})
            </button>
            <button
              onClick={() => setActiveFilterView('all')}
              className={`px-2.5 py-1 rounded transition-colors ${
                activeFilterView === 'all' 
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-bold' 
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              All ({filteredItems.length})
            </button>
          </div>

          {/* Search Input */}
          <div className="relative flex-1 md:w-52">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              placeholder={`Search in ${currentTierMeta.label}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-950/80 border border-zinc-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-cyan-500 font-mono"
            />
          </div>

          {/* Export Button with Google Account Protection */}
          <button
            onClick={handleExportClick}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border shrink-0 ${
              currentUserEmail === AUTHORIZED_GOOGLE_EMAIL
                ? 'bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border-emerald-500/40'
                : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border-zinc-700'
            }`}
            title={`Export ${currentTierMeta.label} Status Report (Restricted to ${AUTHORIZED_GOOGLE_EMAIL})`}
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

      {/* SECTION 1: INCOMPLETE & MISSING ASSETS FOR THIS TIER */}
      {(activeFilterView === 'incomplete' || activeFilterView === 'all') && (
        <div className="space-y-3">
          <div className="flex items-center justify-between pb-1 border-b border-amber-500/30">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
              <h3 className="text-sm font-bold text-amber-300 uppercase tracking-wider">
                Incomplete &amp; Missing Assets for {currentTierMeta.label} ({incompleteItems.length})
              </h3>
            </div>
            <span className="text-xs text-zinc-400 font-mono">
              Parity Blockers for {currentTierMeta.label}
            </span>
          </div>

          <div className="space-y-2.5">
            {incompleteItems.map(item => renderAssetCard(item, true))}
            {incompleteItems.length === 0 && (
              <div className="text-center py-8 bg-zinc-900/30 rounded-xl border border-zinc-800 text-zinc-400 text-xs">
                <CheckCircle2 className="w-6 h-6 text-emerald-400 mx-auto mb-2 opacity-80" />
                <p className="font-semibold text-zinc-300">All required assets for {currentTierMeta.label} are complete!</p>
                <p className="text-[11px] text-zinc-500 mt-1">No missing assets matching the selected filters.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* SECTION 2: COMPLETE & REVIEWED ASSETS IN THIS TIER */}
      {(activeFilterView === 'complete' || activeFilterView === 'all') && (
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between pb-1 border-b border-emerald-500/30">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              <h3 className="text-sm font-bold text-emerald-300 uppercase tracking-wider">
                Complete &amp; Reviewed Assets in {currentTierMeta.label} ({completeItems.length})
              </h3>
              <span className="text-xs text-zinc-400 font-mono hidden sm:inline">
                — Verified Active in C++ Prototype
              </span>
            </div>
            <span className="text-xs font-mono text-emerald-400/80">
              Verified &amp; Certified
            </span>
          </div>

          <div className="space-y-2.5">
            {completeItems.map(item => renderAssetCard(item, false))}
            {completeItems.length === 0 && (
              <div className="text-center py-6 bg-zinc-900/30 rounded-xl border border-zinc-800 text-zinc-500 text-xs">
                No complete assets matching the current filters.
              </div>
            )}
          </div>
        </div>
      )}

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
              {/* Quick Google Account Verification Button */}
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

              {/* Manual Email Entry for Testing Unauthorized States */}
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
