export type AssetCategory = 'characters' | 'rink' | 'ui' | 'overworld' | 'vfx_audio';

export type AssetStatus = 'ready' | 'in_progress' | 'planned' | 'prototype_fallback';

export type InventoryTier = 'exhibition' | 'full_game_prototype' | 'full_game';

export interface AssetRoadmapItem {
  id: string;
  name: string;
  category: AssetCategory;
  description: string;
  status: AssetStatus;
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  format: string;
  sourceOrigin: string;
  requiredFor: InventoryTier[];
  scopeNote?: string;
  specs: {
    directions?: number;
    frameCount?: number;
    polyCount?: number;
    textureRes?: string;
    vramFootprintMB: number;
    drawCalls: number;
    worldDimensions?: string;
  };
  technicalNotes: string;
}

export type PlatformTarget = 'pc' | 'mobile' | 'web';

export interface PlatformBudget {
  platform: PlatformTarget;
  name: string;
  maxDrawCalls: number;
  maxVRAM_MB: number;
  textureFormat: string;
  frameRateTarget: string;
  resolutionScale: string;
}

export type SubjectStatus = 'completed' | 'in_progress' | 'needs_attention' | 'pending';

export type ReportTier = 'exhibition_prototype' | 'full_game_prototype' | 'full_game';

export interface SubjectTask {
  id: string;
  name: string;
  status: 'complete' | 'in_progress' | 'pending' | 'blocked';
  notes?: string;
  deliverable?: string;
}

export interface ProgressSubject {
  id: string;
  title: string;
  category: 'Gameplay & Exhibition' | 'Art & Assets' | 'Customization & Economy' | 'Story & Campaign' | 'Systems & Hardware';
  tier: 'exhibition_prototype' | 'full_game_prototype' | 'full_game' | 'shared';
  status: SubjectStatus;
  completedUnits: number;
  totalUnits: number;
  percentage: number;
  unitLabel: string;
  nextStep: string;
  summary: string;
  scopeNote?: string;
  tasks: SubjectTask[];
}

export interface SprintPhase {
  phaseId: string;
  title: string;
  hoursRange: string;
  status: 'completed' | 'in_progress' | 'upcoming';
  summary: string;
  deliverables: {
    hour: string;
    task: string;
    check: string;
    status: 'done' | 'pending';
  }[];
}

export interface MatchRuleConfig {
  id: string;
  name: string;
  options: string[];
  activeOption: string;
  description: string;
  tapeToTapeImpact: string;
}
