import React, { useState } from 'react';
import { SPRINT_PHASES, MATCH_RULES_SPEC } from '../data/roadmapData';
import { SprintPhase, MatchRuleConfig } from '../types/roadmap';
import { 
  CheckCircle2, 
  Clock, 
  Calendar, 
  Sliders, 
  ShieldAlert, 
  HelpCircle, 
  FileCheck, 
  Zap,
  Gauge,
  Flame,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export const SprintBacklogTab: React.FC = () => {
  const [phases, setPhases] = useState<SprintPhase[]>(SPRINT_PHASES);
  const [expandedPhaseId, setExpandedPhaseId] = useState<string>('B');
  const [rules, setRules] = useState<MatchRuleConfig[]>(MATCH_RULES_SPEC);
  const [selectedRuleId, setSelectedRuleId] = useState<string>('penalties');

  const toggleTaskStatus = (phaseId: string, hour: string) => {
    setPhases(prev => prev.map(phase => {
      if (phase.phaseId !== phaseId) return phase;
      return {
        ...phase,
        deliverables: phase.deliverables.map(deliv => {
          if (deliv.hour !== hour) return deliv;
          return {
            ...deliv,
            status: deliv.status === 'done' ? 'pending' : 'done'
          };
        })
      };
    }));
  };

  const completedHours = phases.reduce((sum, p) => {
    return sum + p.deliverables.filter(d => d.status === 'done').length;
  }, 0);

  const selectedRule = rules.find(r => r.id === selectedRuleId) || rules[0];

  const handleSelectRuleOption = (ruleId: string, option: string) => {
    setRules(prev => prev.map(r => r.id === ruleId ? { ...r, activeOption: option } : r));
  };

  return (
    <div className="space-y-6">
      {/* Top Banner: Sprint Progress Summary */}
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-cyan-400" />
            <h2 className="text-base font-semibold text-zinc-100">Exhibition Mode: 100-Hour Sprint Backlog</h2>
          </div>
          <p className="text-xs text-zinc-400 mt-1 max-w-2xl">
            10-phase incremental delivery roadmap for Unreal Engine 5.4. Replaces prototype placeholders with Tape to Tape-inspired skating, physical checks, one-timers, and configurable NHL rules.
          </p>
        </div>

        <div className="flex items-center gap-4 bg-zinc-950 p-2.5 rounded-xl border border-zinc-800 text-xs font-mono">
          <div>
            <div className="text-[10px] text-zinc-500 uppercase">Planned Hours</div>
            <div className="text-sm font-bold text-zinc-200">80 Hrs (+20 Contingency)</div>
          </div>
          <div className="h-6 w-px bg-zinc-800" />
          <div>
            <div className="text-[10px] text-zinc-500 uppercase">Delivered</div>
            <div className="text-sm font-bold text-emerald-400">{completedHours} / 80 ({Math.round((completedHours / 80) * 100)}%)</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Phase List & Deliverables */}
        <div className="lg:col-span-2 space-y-3">
          {phases.map(phase => {
            const isExpanded = expandedPhaseId === phase.phaseId;
            const phaseDoneCount = phase.deliverables.filter(d => d.status === 'done').length;
            const isPhaseComplete = phaseDoneCount === phase.deliverables.length;

            return (
              <div 
                key={phase.phaseId}
                className={`bg-zinc-900/70 border rounded-xl overflow-hidden transition-all ${
                  isExpanded ? 'border-cyan-500/50 ring-1 ring-cyan-500/20' : 'border-zinc-800/80 hover:border-zinc-700'
                }`}
              >
                {/* Phase Header */}
                <div 
                  className="p-4 flex items-center justify-between cursor-pointer select-none"
                  onClick={() => setExpandedPhaseId(isExpanded ? '' : phase.phaseId)}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs font-mono border ${
                      isPhaseComplete ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' :
                      phase.status === 'in_progress' ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' :
                      'bg-zinc-800/80 text-zinc-400 border-zinc-700'
                    }`}>
                      {phase.phaseId}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-zinc-100">{phase.title}</span>
                        <span className="text-xs font-mono text-zinc-400">({phase.hoursRange})</span>
                        {isPhaseComplete && (
                          <span className="px-2 py-0.2 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                            Completed
                          </span>
                        )}
                        {!isPhaseComplete && phase.status === 'in_progress' && (
                          <span className="px-2 py-0.2 rounded-full text-[10px] font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                            Active Sprint
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-zinc-400 mt-0.5 line-clamp-1">{phase.summary}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-zinc-300 hidden sm:block">
                      {phaseDoneCount} / {phase.deliverables.length}
                    </span>
                    {isExpanded ? <ChevronUp className="w-4 h-4 text-zinc-400" /> : <ChevronDown className="w-4 h-4 text-zinc-400" />}
                  </div>
                </div>

                {/* Deliverables Checklist */}
                {isExpanded && (
                  <div className="px-4 pb-4 pt-2 border-t border-zinc-800 bg-zinc-950/40 space-y-2">
                    <div className="text-[11px] text-zinc-400 font-mono mb-2">
                      Click any deliverable to toggle implementation progress status:
                    </div>
                    {phase.deliverables.map(deliv => {
                      const isDone = deliv.status === 'done';
                      return (
                        <div 
                          key={deliv.hour}
                          onClick={() => toggleTaskStatus(phase.phaseId, deliv.hour)}
                          className={`p-3 rounded-lg border flex items-start justify-between gap-3 cursor-pointer transition-all ${
                            isDone 
                              ? 'bg-emerald-950/20 border-emerald-800/40 hover:bg-emerald-950/30' 
                              : 'bg-zinc-900/60 border-zinc-800/80 hover:bg-zinc-800/60'
                          }`}
                        >
                          <div className="flex items-start gap-2.5">
                            <span className={`font-mono text-xs font-bold px-1.5 py-0.5 rounded mt-0.5 ${
                              isDone ? 'bg-emerald-500/20 text-emerald-300' : 'bg-zinc-800 text-zinc-400'
                            }`}>
                              H{deliv.hour}
                            </span>
                            <div>
                              <div className={`text-xs font-semibold ${isDone ? 'text-emerald-200 line-through opacity-85' : 'text-zinc-200'}`}>
                                {deliv.task}
                              </div>
                              <div className="text-[11px] text-zinc-400 mt-0.5 font-mono">
                                <strong>Check:</strong> {deliv.check}
                              </div>
                            </div>
                          </div>

                          <div className="shrink-0 mt-1">
                            {isDone ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            ) : (
                              <Clock className="w-4 h-4 text-zinc-500" />
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Sidebar: Match Rules Setup & Physics Math */}
        <div className="space-y-4">
          {/* Rules Configuration Inspector */}
          <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-4 space-y-4">
            <h3 className="text-xs font-bold text-zinc-200 uppercase tracking-wider flex items-center gap-1.5">
              <Sliders className="w-4 h-4 text-cyan-400" />
              <span>Exhibition Game Setup Matrix</span>
            </h3>

            {/* Rule Selector Pills */}
            <div className="flex flex-wrap gap-1">
              {rules.map(rule => (
                <button
                  key={rule.id}
                  onClick={() => setSelectedRuleId(rule.id)}
                  className={`px-2 py-1 rounded text-xs transition-all ${
                    selectedRuleId === rule.id
                      ? 'bg-cyan-500 text-zinc-950 font-bold'
                      : 'bg-zinc-800 text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  {rule.name.split(' ')[0]}
                </button>
              ))}
            </div>

            {/* Selected Rule Details */}
            <div className="bg-zinc-950 p-3 rounded-lg border border-zinc-800 space-y-3">
              <div>
                <div className="text-xs font-bold text-zinc-200">{selectedRule.name}</div>
                <div className="text-[11px] text-zinc-400 mt-0.5">{selectedRule.description}</div>
              </div>

              {/* Options Radio List */}
              <div className="space-y-1.5">
                {selectedRule.options.map(opt => (
                  <label
                    key={opt}
                    onClick={() => handleSelectRuleOption(selectedRule.id, opt)}
                    className={`flex items-center gap-2 p-2 rounded border cursor-pointer text-xs transition-all ${
                      selectedRule.activeOption === opt
                        ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-300 font-semibold'
                        : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:bg-zinc-850'
                    }`}
                  >
                    <input 
                      type="radio" 
                      name={selectedRule.id} 
                      checked={selectedRule.activeOption === opt} 
                      onChange={() => {}} 
                      className="accent-cyan-400" 
                    />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>

              <div className="pt-2 border-t border-zinc-800 text-[11px] text-zinc-400 font-mono">
                <span className="text-amber-400 font-semibold block mb-0.5">Tape to Tape Tuning Impact:</span>
                {selectedRule.tapeToTapeImpact}
              </div>
            </div>
          </div>

          {/* Precise Physics Dimensions Reference */}
          <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-4 space-y-2 text-xs">
            <h3 className="font-bold text-zinc-200 uppercase tracking-wider flex items-center gap-1.5">
              <Gauge className="w-4 h-4 text-amber-400" />
              <span>Simulation Constants &amp; Geometry</span>
            </h3>

            <div className="space-y-1.5 font-mono text-[11px] text-zinc-300 pt-1">
              <div className="flex justify-between border-b border-zinc-800/80 pb-1">
                <span className="text-zinc-500">Playing Surface:</span>
                <span className="text-cyan-300">608 × 1072 px (R=72)</span>
              </div>
              <div className="flex justify-between border-b border-zinc-800/80 pb-1">
                <span className="text-zinc-500">Goal Mouth:</span>
                <span className="text-cyan-300">Y=144 &amp; Y=1056</span>
              </div>
              <div className="flex justify-between border-b border-zinc-800/80 pb-1">
                <span className="text-zinc-500">Goal Posts X:</span>
                <span className="text-cyan-300">X=360 &amp; X=440 (Depth 24)</span>
              </div>
              <div className="flex justify-between border-b border-zinc-800/80 pb-1">
                <span className="text-zinc-500">Skate Speed:</span>
                <span className="text-amber-300">100 base / 145 sprint</span>
              </div>
              <div className="flex justify-between border-b border-zinc-800/80 pb-1">
                <span className="text-zinc-500">Accel / Brake / Drag:</span>
                <span className="text-amber-300">260 / 390 / 65</span>
              </div>
              <div className="flex justify-between border-b border-zinc-800/80 pb-1">
                <span className="text-zinc-500">Shot Speed:</span>
                <span className="text-emerald-300">310 base (Wrist)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Physics Tick:</span>
                <span className="text-emerald-300">Fixed 1/120s Substep</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
