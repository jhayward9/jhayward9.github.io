import { ProgressSubject } from '../types/roadmap';

export const PROGRESS_REPORT_TIMESTAMP = 'October 29, 2026 (UTC)';
export const SCANNED_COMMIT = '9e4a7d2';
export const TOTAL_INVENTORIED_FILES = 1527;
export const SIX_SUITES_TIME = '16:12:32–16:12:33 UTC';

export interface ActiveReportInfo {
  id: 'exhibition_prototype' | 'full_game_prototype' | 'full_game';
  title: string;
  badge: string;
  docFile: string;
  scopeSummary: string;
  audioRequirement: 'Excluded' | 'Required for Release';
  headlineMetric: string;
  headlinePercentage: number;
  secondaryMetric: string;
  nextImmediateAction: string;
  boundaries: string[];
}

export const ACTIVE_REPORTS_INDEX: ActiveReportInfo[] = [
  {
    id: 'exhibition_prototype',
    title: 'Exhibition Mode Prototype',
    badge: 'Active Report 1',
    docFile: 'EXHIBITION_PROGRESS_REPORT.md',
    scopeSummary: 'Standalone tape-to-tape hockey simulation; no Story, economy, overworld locations, or audio required.',
    audioRequirement: 'Excluded',
    headlineMetric: '13 / 100 Sprints',
    headlinePercentage: 13.0,
    secondaryMetric: 'Rink Art: 12/12 (100%) • Sheets: 44/44',
    nextImmediateAction: 'Sprint 14: Movement Tuning (Accel 260, Braking 390, Drag 65)',
    boundaries: [
      'No audio assets, audio settings, or sound acceptance gates in this scope.',
      'Sprints 01–13 complete; 87 original tickets remain (14–100).',
      'Rink art modular geometry integration complete (RA-01–12).',
      'Saved 16-to-17-action controls migration verified across all 6 test suites.'
    ]
  },
  {
    id: 'full_game_prototype',
    title: 'Full-Game Prototype (2-City RPG Sample)',
    badge: 'Active Report 2',
    docFile: 'FULL_GAME_PROTOTYPE_PROGRESS_REPORT.md',
    scopeSummary: 'Functional Story & sports-RPG campaign sample; bounded strictly to Frontier (Normund) & Superior (Hisery).',
    audioRequirement: 'Excluded',
    headlineMetric: '0 / 2 Playable Cities',
    headlinePercentage: 0.0,
    secondaryMetric: 'Overworld: 7/9 (77.8%) • CE: 2/60 (3.3%)',
    nextImmediateAction: 'Define minimal 2-city campaign flow & CE-03 customization schema',
    boundaries: [
      'Bounded to exactly 2 playable cities: Frontier in Normund and Superior in Hisery.',
      'Provinces are labels, not extra cities. No other-city exploration is required.',
      'NO AUDIO REQUIRED: Music, SFX playback, and audio settings are deferred to the full game.',
      'Reusable 16-unit stepping, 3-slot saves, and Level 1–50 progression already exist.',
      'Final prototype verification gates currently stand at 0 / 8 complete.'
    ]
  },
  {
    id: 'full_game',
    title: 'Full Game (Commercial Release)',
    badge: 'Active Report 3',
    docFile: 'FULL_GAME_PROGRESS_REPORT.md',
    scopeSummary: 'Complete approved RPG, story campaigns, Specials, items, audio/SFX, 16-city lore, and console release content.',
    audioRequirement: 'Required for Release',
    headlineMetric: '0 / 10 Story Streams',
    headlinePercentage: 0.0,
    secondaryMetric: 'Audio: 0/8 • Release/Ports: 0/11',
    nextImmediateAction: 'Author chapter manuscripts, full audio production & Sound Cues',
    boundaries: [
      'Full audio & SFX backlog: UI, hockey, music, overworld, Sound Cues, and mixing (0/8).',
      'Full campaign narrative, dialogue, 16-city lore hierarchy, and multi-year calendar (0/10).',
      'Economy shops, equipment loadouts, and bedroom editor runtimes (2/60, 3.3%).',
      'Packaged Windows distribution, Xbox/PS/Switch ports, and online backend (0/11).'
    ]
  }
];

export const PROGRESS_SUBJECTS_DATA: ProgressSubject[] = [
  // 1. EXHIBITION MODE (100-Hour Sprint Budget)
  {
    id: 'sub-exhibition',
    title: 'Hockey Function & Exhibition Mode (Sprints 01–100)',
    category: 'Gameplay & Exhibition',
    tier: 'exhibition_prototype',
    status: 'in_progress',
    completedUnits: 13,
    totalUnits: 100,
    percentage: 13.0,
    unitLabel: 'Sprints',
    nextStep: 'Sprint 14: Movement Tuning (Accel 260, Braking 390, Drag 65)',
    summary: 'Sprints 01–13 confirmed complete. 87 original tickets remain (14–100). Saved-controls migration fixed and all 6 test suites passed.',
    scopeNote: 'Audio is excluded from this scope. Tracks standalone hockey simulation only.',
    tasks: [
      { id: 'EX-01', name: 'Sprint 01: Safe Exhibition foundation baseline & tests', status: 'complete', notes: 'Editor builds, 3 suites pass, DX11 capture verified.' },
      { id: 'EX-02', name: 'Sprint 02: Reference comparison drills (Tape to Tape feel)', status: 'complete', notes: 'Breakout, pass, shot, check, and save drills recorded.' },
      { id: 'EX-03', name: 'Sprint 03: Standalone MatchConfig without career dependency', status: 'complete', notes: 'Equal fixed ratings (Speed 100, Shoot 310) without career profile.' },
      { id: 'EX-04', name: 'Sprint 04: Career save & reward isolation', status: 'complete', notes: 'Completing Exhibition never writes career XP, wins, or saves.' },
      { id: 'EX-05', name: 'Sprint 05: Consistent Exhibition Mode player-facing naming', status: 'complete', notes: 'Menu, pause, and launcher aligned to Exhibition branding.' },
      { id: 'EX-06', name: 'Sprint 06: Standalone Home/Away setup & side selection', status: 'complete', notes: 'Start Home or Away without career prompt; side retained on rematch.' },
      { id: 'EX-07', name: 'Sprint 07: Seeded 120Hz offline scenarios & CSV capture', status: 'complete', notes: 'Scripted drills run headless; 10 pre/post CSV traces checked.' },
      { id: 'EX-08', name: 'Sprint 08: Foundation regression & reviewed decisions', status: 'complete', notes: 'Fatigue removed from scope; OT/shootout mapped to future tickets.' },
      { id: 'EX-09', name: 'Sprint 09: Validated actor-ID shoot/pass/check APIs', status: 'complete', notes: 'All six active skater roles supported with valid actor IDs.' },
      { id: 'EX-10', name: 'Sprint 10: Selected-skater routing & defensive switching', status: 'complete', notes: 'Switching excludes goalies/boxed skaters without flicker.' },
      { id: 'EX-11', name: 'Sprint 11: Completed-pass control transfer to receiver', status: 'complete', notes: 'Chained passes transfer active skater control cleanly.' },
      { id: 'EX-12', name: 'Sprint 12: Selected star, offscreen marker & camera tracking', status: 'complete', notes: 'Star marker, input, and camera framing agree on all skaters.' },
      { id: 'EX-13', name: 'Sprint 13: Named action/Switch routing & 17-action migration', status: 'complete', notes: 'Legacy 16-action settings safely migrate to 17-action layout.' },
      { id: 'EX-14', name: 'Sprint 14: Movement tuning & skater momentum feel', status: 'in_progress', notes: 'Accel 260, braking 390, drag 65; straight vs diagonal response.' },
      { id: 'EX-15', name: 'Sprint 15: Backward skating without changing momentum', status: 'pending', notes: 'Skater faces play while retreating smoothly.' },
      { id: 'EX-16', name: 'Sprint 16: Dynamic roster owner & selection reconciliation', status: 'pending', notes: 'Selection logic reconciles before penalties or substitutions.' },
      { id: 'EX-17-24', name: 'Sprints 17–24: Puck contact categories & saucer passing', status: 'pending', notes: 'Catches vs blocks, lane-aware lead passes, saucer pass Z-elevation.' },
      { id: 'EX-25-32', name: 'Sprints 25–32: Shots, saves, rebounds & 150ms one-timers', status: 'pending', notes: 'Angle crease tracking, pad rebounds, covers, buffered one-timers.' },
      { id: 'EX-33-40', name: 'Sprints 33–40: Directional bodychecks & 5v5 expansion', status: 'pending', notes: 'Check commitment/recovery, loose-puck release, 12-player formations.' },
      { id: 'EX-41-48', name: 'Sprints 41–48: Clocks, faceoffs, 5m sudden-death OT & rematches', status: 'pending', notes: '5/10/20m periods, accelerated clock 2x, timed puck drops.' },
      { id: 'EX-49-56', name: 'Sprints 49–56: Zone rules, 2-min minor penalties & power plays', status: 'pending', notes: 'Offsides, icing, penalty box timer, power-play release.' },
      { id: 'EX-57-64', name: 'Sprints 57–64: Infractions, special teams AI & penalty shots', status: 'pending', notes: 'Tripping, hooking, holding, roughing, breakaway penalty shot.' },
      { id: 'EX-65-72', name: 'Sprints 65–72: Line changes, 30s timeouts & goalie pull', status: 'pending', notes: 'Period-break lines, timeout, manual goalie, 6th extra attacker.' },
      { id: 'EX-73-80', name: 'Sprints 73–80: Optional fighting minigame & release freeze', status: 'pending', notes: '1v1 confrontation, 5-min majors, game setup matrix, 60 FPS profile.' },
      { id: 'EX-81-100', name: 'Sprints 81–100: Contingency reserve & endurance tuning', status: 'pending', notes: '20 contingency tickets reserved for multiplatform and AI polish.' }
    ]
  },

  // 2. RINK ART INTEGRATION
  {
    id: 'sub-rink-art',
    title: 'Rink Art & Arena Geometry Integration',
    category: 'Art & Assets',
    tier: 'exhibition_prototype',
    status: 'completed',
    completedUnits: 12,
    totalUnits: 12,
    percentage: 100.0,
    unitLabel: 'Tickets',
    nextStep: 'Complete: Delivered RA-01–12; later visual human acceptance applies',
    summary: 'Delivered RA-01–12 scope: modular 44-region skin, 4 textures, 2 UI materials, calibrated goals, HDPE boards, glass, seating, and live HUD.',
    scopeNote: 'Core foundation for Exhibition and Story matches.',
    tasks: [
      { id: 'RA-01', name: 'Calibrated playing surface geometry (608x1072, R=72)', status: 'complete', notes: 'Frosted blue ice surface at Z=0 physics plane.' },
      { id: 'RA-02', name: 'Smooth white HDPE boards with yellow kickplates', status: 'complete', notes: 'Board collision swept hulls and ivory cap line.' },
      { id: 'RA-03', name: 'Neutral acrylic glass shielding & stanchions', status: 'complete', notes: 'Translucent depth-tested shielding along perimeter.' },
      { id: 'RA-04', name: 'D-shaped curved goal nets (Top mouth Y=144, Bottom Y=1056)', status: 'complete', notes: 'Rounded mouth pipes, nylon mesh, depth 24.' },
      { id: 'RA-05', name: 'Terraced crowd seating (Navy molded seats)', status: 'complete', notes: 'Concrete/steel terrace layout with spectator instances.' },
      { id: 'RA-06', name: 'Player benches along West boards', status: 'complete', notes: 'Paired team bench boxes for line substitutions.' },
      { id: 'RA-07', name: 'Officials desk & penalty timekeeper boxes', status: 'complete', notes: 'East boards penalty boxes with gate thresholds.' },
      { id: 'RA-08', name: 'Center red line & simplified end-zone hashes', status: 'complete', notes: 'Unlit custom texture mapping aligned to ice dimensions.' },
      { id: 'RA-09', name: 'Goal crease & goal line scoring detection thresholds', status: 'complete', notes: 'Crossing strictly X=367-433 behind posts X=360/440.' },
      { id: 'RA-10', name: 'Near-end board foreground occlusion layer', status: 'complete', notes: 'Z-buffer hardware testing prevents player sorting pop.' },
      { id: 'RA-11', name: 'Outdoor practice rink variation venue', status: 'complete', notes: '370x555 practice venue mapping.' },
      { id: 'RA-12', name: 'Live Exhibition HUD scoreboard integration', status: 'complete', notes: 'Clamped canvas scoreboard with period clock.' }
    ]
  },

  // 3. FULL-GAME PROTOTYPE PLAYABLE CITIES (2-CITY BOUNDARY)
  {
    id: 'sub-proto-cities',
    title: 'Playable Story Prototype Cities (Frontier & Superior)',
    category: 'Story & Campaign',
    tier: 'full_game_prototype',
    status: 'needs_attention',
    completedUnits: 0,
    totalUnits: 2,
    percentage: 0.0,
    unitLabel: 'Cities',
    nextStep: 'Stage Frontier campus and Superior arena map slices',
    summary: 'The prototype is strictly bounded to TWO playable cities: Frontier in Normund (player home school) and Superior in Hisery (rival city).',
    scopeNote: 'Audio excluded. Only 2 cities required for prototype acceptance; remaining 14 cities are full-game lore.',
    tasks: [
      { id: 'CTY-01', name: 'Frontier, Normund: Hockey school campus, dorm & rink', status: 'pending', notes: 'Home school setting for protagonist and childhood best friend.' },
      { id: 'CTY-02', name: 'Superior, Hisery: Provincial rival arena & tournament hub', status: 'pending', notes: 'Rival cousin venue and championship qualifier setting.' }
    ]
  },

  // 4. CHARACTER & ACTION SOURCE SHEETS
  {
    id: 'sub-char-source',
    title: 'Character & Action Source Sheets Delivery',
    category: 'Art & Assets',
    tier: 'shared',
    status: 'completed',
    completedUnits: 44,
    totalUnits: 44,
    percentage: 100.0,
    unitLabel: 'Source Sheets',
    nextStep: 'All 44 sheets decoded at 1024x1024; production animation acceptance next',
    summary: 'All 44 registered texture filenames in the Exhibition source manifest exist, decode at 1024x1024, and have valid PNG headers.',
    tasks: [
      { id: 'CS-01', name: 'Male forward 8-way locomotion sheets (v2)', status: 'complete', notes: '24 clips / 56 frames (cardinal, diagonal, crossovers).' },
      { id: 'CS-02', name: 'Female skater sheets (v1)', status: 'complete', notes: '8 clips / 20 frame entries delivered.' },
      { id: 'CS-03', name: 'Home Comets 8x11 team action atlas', status: 'complete', notes: 'Royal blue jersey, 40x48 frames, anchor (20, 40).' },
      { id: 'CS-04', name: 'Away Visitors 8x11 team action atlas', status: 'complete', notes: 'Crimson red jersey, 40x48 frames, anchor (20, 40).' },
      { id: 'CS-05', name: '10 formerly missing action sheets verified & decoded', status: 'complete', notes: '100% manifest path presence confirmed at commit 9e4a7d2.' }
    ]
  },

  // 5. CHARACTER PRODUCTION ACCEPTANCE (NEEDS ATTENTION)
  {
    id: 'sub-char-acceptance',
    title: 'Character & Action Production Acceptance',
    category: 'Art & Assets',
    tier: 'shared',
    status: 'needs_attention',
    completedUnits: 0,
    totalUnits: 7,
    percentage: 0.0,
    unitLabel: 'Checkpoints',
    nextStep: 'Validate cell bounds, feet pivots, team colors & directional consistency',
    summary: 'Source files exist, but 0 of 7 production acceptance checks have passed. Paper2D / ground-plane runtime integration is open.',
    tasks: [
      { id: 'CA-01', name: 'Validate cell bounds, feet pivots (20,40) & transparency', status: 'pending', notes: 'Ensure uniform bounding boxes across all 44 sheets.' },
      { id: 'CA-02', name: 'Reconcile 256px cells at 0.125 scale with gameplay camera', status: 'pending', notes: 'Test visual density at 18-degree FOV perspective.' },
      { id: 'CA-03', name: 'Define per-frame stick blade & puck release anchors', status: 'pending', notes: 'Store (X, Y) blade offsets in prototype JSON manifest.' },
      { id: 'CA-04', name: 'Bind runtime clips to authoritative simulation states', status: 'pending', notes: 'Synchronize sprite cadence (8-12 FPS) with 120Hz physics.' },
      { id: 'CA-05', name: 'Review backward skating, diagonal fallbacks & goalie coverage', status: 'pending', notes: 'Ensure smooth visual transitions during defensive retreats.' },
      { id: 'CA-06', name: 'Verify behind-net layering, selection marker & puck visibility', status: 'pending', notes: 'Check depth occlusion behind curved nylon netting.' },
      { id: 'CA-07', name: 'Add penalty box, bench seating & fighting visual states', status: 'pending', notes: 'Pending gameplay milestones Phase G and Phase J.' }
    ]
  },

  // 6. OVERWORLD ART PRODUCTION & LANDMARKS
  {
    id: 'sub-overworld-art',
    title: 'Overworld Art Production & Landmarks',
    category: 'Art & Assets',
    tier: 'full_game_prototype',
    status: 'needs_attention',
    completedUnits: 3,
    totalUnits: 11,
    percentage: 27.3,
    unitLabel: 'Checkpoints',
    nextStep: 'Seamless snow/paving, path turns/junctions, and modular interior corners',
    summary: 'Town landmarks and base protagonist walking sheets exist, but modular interiors, custom cast sprites, and signs remain open.',
    scopeNote: 'Required for 2-city prototype exploration and full game.',
    tasks: [
      { id: 'OA-01', name: 'Male & female protagonist walking sheets (0.125 scale)', status: 'complete', notes: 'Delivered in assets/art/characters/casual-sheets.' },
      { id: 'OA-02', name: 'Winter scenery atlas (Snow, paths, pines, rocks, statue)', status: 'complete', notes: 'Delivered in 1600x900 town map canvas.' },
      { id: 'OA-03', name: 'Arena exterior dome & outdoor practice rink landmarks', status: 'complete', notes: 'Domed v2 arena (576x384) and practice venue (370x555).' },
      { id: 'OA-04', name: 'Seamless snow/paving, path turns/junctions & end caps', status: 'pending', notes: 'Awaiting seamless tile exports.' },
      { id: 'OA-05', name: 'Modular floor/wall corners, partitions & occlusion pieces', status: 'pending', notes: 'For home, school, and arena interior rooms.' },
      { id: 'OA-06', name: 'Stage player home and Maya/Finn interiors with furniture', status: 'pending', notes: 'Preserve safe walking routes and door thresholds.' },
      { id: 'OA-07', name: 'Distinct Coach, Maya, Finn, and Eli character sprites', status: 'pending', notes: 'Currently reuses protagonist casual sheets.' },
      { id: 'OA-08', name: 'Entrance signs, location markers & arrival banners', status: 'pending', notes: 'Town signage and league arena banners.' },
      { id: 'OA-09', name: 'Normalize palette, pixel density, feet pivots & sorting', status: 'pending', notes: 'Eliminate scaling artifacts in Unreal Canvas.' },
      { id: 'OA-10', name: 'Production metadata for placeable bedroom items', status: 'pending', notes: 'Footprints and rotation anchors for room editor.' },
      { id: 'OA-11', name: 'Runtime Tiled map importer integration', status: 'pending', notes: 'Tiled authoring files exist; runtime parser pending.' }
    ]
  },

  // 7. OVERWORLD PROTOTYPE FUNCTION
  {
    id: 'sub-overworld-fn',
    title: 'Overworld Function & Exploration Engine',
    category: 'Gameplay & Exhibition',
    tier: 'full_game_prototype',
    status: 'in_progress',
    completedUnits: 7,
    totalUnits: 9,
    percentage: 77.8,
    unitLabel: 'Features',
    nextStep: 'Implement runtime Tiled map importer & expand story locations',
    summary: 'GridWalker movement (16-unit steps, 88 u/s), collision, doors, dialogue, and camera exploration are fully implemented.',
    tasks: [
      { id: 'OF-01', name: 'GridWalker 16x16 unit stepping (88 u/s, 0.182s/step)', status: 'complete', notes: 'Smooth stepping between cell centers in HHTown.cpp.' },
      { id: 'OF-02', name: 'Four-direction tapping & held continuous walking', status: 'complete', notes: 'Latest direction priority and center-only turns.' },
      { id: 'OF-03', name: 'Tile & boundary collision detection', status: 'complete', notes: 'Safe walking corridors and obstacle footprint masking.' },
      { id: 'OF-04', name: 'Door thresholds & building enter transitions on E', status: 'complete', notes: 'Threshold at 768,840 enters domed arena foyer.' },
      { id: 'OF-05', name: 'Facing-based NPC dialogue trigger on E', status: 'complete', notes: 'Interacts with facing NPC cell center.' },
      { id: 'OF-06', name: 'Activity returns to safe town coordinates', status: 'complete', notes: 'Returning from practice rink places player outside gate.' },
      { id: 'OF-07', name: 'Scrolling camera (640x287 viewport between HUD bars)', status: 'complete', notes: 'Camera tracks player with bounds clamping.' },
      { id: 'OF-08', name: 'Runtime Tiled map import into Unreal C++', status: 'pending', notes: 'Currently authored procedurally in C++.' },
      { id: 'OF-09', name: 'Frontier and Superior story-map expansion', status: 'pending', notes: 'Connect 2 prototype cities with transitions.' }
    ]
  },

  // 8. SPRITE CREATOR / CUSTOMIZATION & ECONOMY
  {
    id: 'sub-customization',
    title: 'Character Customization & Economy (CE-01 to CE-60)',
    category: 'Customization & Economy',
    tier: 'shared',
    status: 'needs_attention',
    completedUnits: 2,
    totalUnits: 60,
    percentage: 3.3,
    unitLabel: 'Sprints',
    nextStep: 'CE-03: Customization Schema & Slot Persistence Architecture',
    summary: '2 of 60 planned tickets complete (CE-01 & CE-02). Standing design sheets exist, but modular compositor, wallet, and store runtime are not built.',
    tasks: [
      { id: 'CE-01', name: 'CE-01: Asset audit & bounded character layer request', status: 'complete', notes: 'Established standing designs are not modular runtime layers.' },
      { id: 'CE-02', name: 'CE-02: Currency & cadence decision record', status: 'complete', notes: 'Confirmed Cash rules (Start 50, Practice 5, Win 25, Reg 50).' },
      { id: 'CE-03', name: 'CE-03: Appearance schema & serialization design', status: 'pending', notes: 'Extend Profile schema with appearance part IDs.' },
      { id: 'CE-04', name: 'CE-04: Free new-save character creator wireframes', status: 'pending', notes: 'Layer picker, palette selector, and turn preview.' },
      { id: 'CE-05', name: 'CE-05: Shop, bedroom, and item menu wireframes', status: 'pending', notes: 'Wallet balance display and item grid layouts.' },
      { id: 'CE-06', name: 'CE-06: Customization regression test fixtures', status: 'pending', notes: 'Headless test cases for invalid part indices.' },
      { id: 'CE-07-12', name: 'CE-07–12: Career profile extension & slot migration', status: 'pending', notes: 'Migrate existing careers without corrupting stats.' },
      { id: 'CE-13', name: 'CE-13: Layer contract & technical art sample delivery', status: 'blocked', notes: 'Awaiting user delivery of front idle & side walk layer sample.' },
      { id: 'CE-14-18', name: 'CE-14–18: Body, hair, face, clothes & hockey identity layers', status: 'blocked', notes: '6 hair styles, 4 skin tones, uniform masks.' },
      { id: 'CE-19-24', name: 'CE-19–24: Modular compositor & animated 4-direction preview', status: 'pending', notes: 'Runtime sprite assembly and animated preview.' },
      { id: 'CE-25-30', name: 'CE-25–30: Wallet, earnings & atomic persisted purchases', status: 'pending', notes: 'Transaction integrity and balance deduction.' },
      { id: 'CE-31-36', name: 'CE-31–36: Paid appearance-editing service in salon', status: 'pending', notes: 'Commit cost and appearance together safely.' },
      { id: 'CE-37-42', name: 'CE-37–42: Equipment ownership, shop & loadout modifiers', status: 'pending', notes: 'Actor-aware modifiers without altering base stats.' },
      { id: 'CE-43-48', name: 'CE-43–48: Bedroom furniture catalogue & room editor', status: 'pending', notes: 'Grid placement, collision, and exit clearance.' },
      { id: 'CE-49-54', name: 'CE-49–54: Food/drink inventory, shop & temporary boosts', status: 'pending', notes: 'Pre-match consumption and expiry lifecycle.' },
      { id: 'CE-55-60', name: 'CE-55–60: End-to-end new-career journey & release handoff', status: 'pending', notes: 'Visual review, human playtest, and release validation.' }
    ]
  },

  // 9. STORY REQUIREMENTS & CAMPAIGN (RESOLVED CAPITAL & CAST)
  {
    id: 'sub-story',
    title: 'Story Planning & Campaign Setup (Capital Resolved)',
    category: 'Story & Campaign',
    tier: 'full_game_prototype',
    status: 'needs_attention',
    completedUnits: 1,
    totalUnits: 12,
    percentage: 8.3,
    unitLabel: 'Checkpoints',
    nextStep: 'Define first playable chapter: start scene, end milestone & locations',
    summary: 'Newer story planning context resolves the capital (Superior in Hisery, Marmalade in Normund), school/opening, and cast. Prototype city boundary locked to Frontier & Superior.',
    scopeNote: 'Capital contradiction resolved. Prototype limited to 2 cities.',
    tasks: [
      { id: 'ST-01', name: 'Receive initial lore (14yo, Frontier school, 3 named leads)', status: 'complete', notes: 'Player names protagonist, best friend, and cousin.' },
      { id: 'ST-02', name: 'Define first playable chapter start scene & end milestone', status: 'pending', notes: 'Opening sequence and arrival at Frontier school.' },
      { id: 'ST-03', name: 'Define main conflict, tone, home life & dialogue scope', status: 'pending', notes: 'Balancing school academics and high-stakes hockey.' },
      { id: 'ST-04', name: 'Define school name, boarding arrangement & hockey balance', status: 'pending', notes: 'Campus layout and team practice schedule.' },
      { id: 'ST-05', name: 'Define 2-year campaign milestones & tournament sequence', status: 'pending', notes: 'Provincial playoffs and national qualification.' },
      { id: 'ST-06', name: 'Define sponsor motives (Gener Sous vs Jim Berry) & special shots', status: 'pending', notes: 'Corporate interests and signature abilities.' },
      { id: 'ST-07', name: 'Resolved: Capital & cast decisions settled in planning context', status: 'complete', notes: 'Capital hierarchy resolved; prototype bounded to Frontier & Superior.' },
      { id: 'ST-08', name: 'Extend character creation for 3 player-entered names', status: 'pending', notes: 'Save schema for protagonist, best friend, and cousin.' },
      { id: 'ST-09', name: 'Define appointment calendar model & missed-event rules', status: 'pending', notes: 'Weekly match, 3 practices, penalty for missing.' },
      { id: 'ST-10', name: 'Author production dialogue, tutorials & objective text', status: 'pending', notes: 'Full script writing for chapter 1.' },
      { id: 'ST-11', name: 'Add persistent conversation flags & conditional doors', status: 'pending', notes: 'Story progression locks and NPC greeting updates.' },
      { id: 'ST-12', name: 'Integrate new Camarad school runtime (retire Cedarbrook)', status: 'pending', notes: 'Replace old Cedar Comets rookie storyline.' }
    ]
  },

  // 10. FULL-GAME STORY WORKSTREAMS (FULL GAME ONLY)
  {
    id: 'sub-story-fullgame',
    title: 'Full-Game Story Workstreams (10 Workstreams)',
    category: 'Story & Campaign',
    tier: 'full_game',
    status: 'needs_attention',
    completedUnits: 0,
    totalUnits: 10,
    percentage: 0.0,
    unitLabel: 'Workstreams',
    nextStep: 'Author complete multi-year chapter scripts & 16-city narrative lore',
    summary: 'Full-game narrative expansion covering 10 distinct story workstreams beyond the 2-city prototype.',
    scopeNote: 'Full Game Release only. Excluded from prototypes.',
    tasks: [
      { id: 'FG-ST-01', name: 'Complete 2-year campaign calendar narrative fixtures (32 teams)', status: 'pending', notes: 'League matches, practices, and regional playoffs.' },
      { id: 'FG-ST-02', name: '16-city regional world lore & tournament hubs', status: 'pending', notes: 'Normund, Hisery, Petryl, and Van Isles provincial lore.' },
      { id: 'FG-ST-03', name: 'Best friend & rival cousin dynamic relationship arcs', status: 'pending', notes: 'Branching dialogue based on season match outcomes.' },
      { id: 'FG-ST-04', name: 'Sponsor corporate storyline & contract milestones', status: 'pending', notes: 'Gener Sous and Jim Berry sponsor events.' },
      { id: 'FG-ST-05', name: 'Approved Story Specials & signature move unlock quests', status: 'pending', notes: 'Fantastical/athletic special shots and saves.' },
      { id: 'FG-ST-06', name: 'Complete NPC dialogue trees for school & arena residents', status: 'pending', notes: 'Teachers, coaches, scouts, and arena staff.' },
      { id: 'FG-ST-07', name: 'Multi-season championships & national tournament climax', status: 'pending', notes: 'High-stakes final tournament in year 2.' },
      { id: 'FG-ST-08', name: 'Post-game career milestones & hall of fame epilogue', status: 'pending', notes: 'Ending sequences and career stats summary.' },
      { id: 'FG-ST-09', name: 'Story journal, quest log & milestone tracking UI', status: 'pending', notes: 'In-game planner tracking upcoming fixtures.' },
      { id: 'FG-ST-10', name: 'Full narrative script localization & proofreading review', status: 'pending', notes: 'Complete English script QA.' }
    ]
  },

  // 11. CONTROLS & HARDWARE INPUT ACCEPTANCE
  {
    id: 'sub-controls',
    title: 'Controls & Hardware Input Acceptance',
    category: 'Systems & Hardware',
    tier: 'shared',
    status: 'needs_attention',
    completedUnits: 4,
    totalUnits: 8,
    percentage: 50.0,
    unitLabel: 'Checkpoints',
    nextStep: 'Physical USB/Bluetooth gamepad device matrix testing',
    summary: 'Software remapping, 17-action layout, persistence, and generic PC gamepad support are complete; physical hardware matrix and glyphs pending.',
    tasks: [
      { id: 'CTRL-01', name: '17 remappable actions including Switch on keyboard & gamepad', status: 'complete', notes: 'Paged control remapper with conflict resolution.' },
      { id: 'CTRL-02', name: 'controls.json persistence & legacy migration', status: 'complete', notes: 'Migrated 16 to 17 actions; atomic rollback on corruption.' },
      { id: 'CTRL-03', name: 'Generic PC gamepad action routing (threshold 0.4)', status: 'complete', notes: 'Left-stick thresholds, D-pad aliases, menu navigation.' },
      { id: 'CTRL-04', name: 'Menu/gameplay isolation & disconnect pause', status: 'complete', notes: 'Gamepad disconnect pauses game with deliberate resume.' },
      { id: 'CTRL-05', name: 'Physical USB/Bluetooth device matrix testing', status: 'pending', notes: 'Xbox One/Series, DualShock 4/DualSense, Switch Pro Controller.' },
      { id: 'CTRL-06', name: 'Complete controller-only playthrough validation', status: 'pending', notes: 'Full career and match navigation without keyboard touch.' },
      { id: 'CTRL-07', name: 'Device-specific button glyphs (Xbox ABXY, PlayStation symbols)', status: 'pending', notes: 'Dynamic glyph swapping based on connected device.' },
      { id: 'CTRL-08', name: 'Accessibility settings (stick deadzones, contrast, text scaling)', status: 'pending', notes: 'Expanded accessibility preferences.' }
    ]
  },

  // 12. AUDIO, AMBIENCE & SOUND EFFECTS (FULL GAME ONLY)
  {
    id: 'sub-audio',
    title: 'Audio, Music & Sound Effects (Full Game Only)',
    category: 'Art & Assets',
    tier: 'full_game',
    status: 'needs_attention',
    completedUnits: 0,
    totalUnits: 8,
    percentage: 0.0,
    unitLabel: 'Checklist Groups',
    nextStep: 'Awaiting authored audio production & Sound Cue integration',
    summary: 'Full-game release requirement. Explicitly EXCLUDED from Exhibition and Full-Game Prototypes.',
    scopeNote: 'EXCLUDED from Exhibition & 2-City Prototype. Required only for Full Game.',
    tasks: [
      { id: 'SND-01', name: 'Shared UI audio cues (Move, confirm, cancel, error, save)', status: 'pending', notes: 'Crisp 16-bit UI chirps and confirms.' },
      { id: 'SND-02', name: 'Hockey gameplay SFX (Blades, puck clatter, posts, checks, whistle)', status: 'pending', notes: 'Authentic skate gouges and board impacts.' },
      { id: 'SND-03', name: 'Music tracks (Title, winter town, match play, arena organ, results)', status: 'pending', notes: 'Camelot-style brassy sports-RPG chiptunes.' },
      { id: 'SND-04', name: 'Overworld SFX (Footsteps in snow, doors, dialogue chirps, level-up)', status: 'pending', notes: '16-bit character dialogue beeps and footsteps.' },
      { id: 'SND-05', name: 'Feature audio cues (Store cash register, bedroom placement, food crunch)', status: 'pending', notes: 'Purchase feedback and room editor snaps.' },
      { id: 'SND-06', name: 'Audio master direction & lossless export licensing manifest', status: 'pending', notes: 'Loop points and asset attribution documentation.' },
      { id: 'SND-07', name: 'Runtime Sound Cue event hooks, volume mixing & mute controls', status: 'pending', notes: 'Audio category mix sliders in Settings menu.' },
      { id: 'SND-08', name: 'Speaker & headphone mix review on Windows/devices', status: 'pending', notes: 'Dynamic range and frequency balance review.' }
    ]
  },

  // 13. RPG PROGRESSION & THREE-SLOT SAVES
  {
    id: 'sub-rpg-saves',
    title: 'RPG Progression & Three-Slot Story Saves',
    category: 'Systems & Hardware',
    tier: 'shared',
    status: 'completed',
    completedUnits: 11,
    totalUnits: 11,
    percentage: 100.0,
    unitLabel: 'Checkpoints',
    nextStep: 'Complete baseline: Future schema extension for economy/calendar',
    summary: 'RPG Level 1–50 cap, XP curves, growth points, and 3 independent Story save slots with backup recovery and legacy import are fully delivered.',
    tasks: [
      { id: 'RPG-01', name: 'Level 1–50 cap & XP threshold formulas', status: 'complete', notes: 'Progression formula in HHHockeySimulation.' },
      { id: 'RPG-02', name: '49 growth points allocation (+2 selected / -0.125 others)', status: 'complete', notes: 'Balanced stat point decay mechanics.' },
      { id: 'RPG-03', name: 'Five core stats (0–20): Skating, Shooting, Defense, Passing, Special', status: 'complete', notes: 'Affects skate speed (100) and shot velocity (310).' },
      { id: 'RPG-04', name: 'Three independent Story save slots (Slots 1, 2, 3)', status: 'complete', notes: 'Separate save files in Unreal Saved/SaveGames.' },
      { id: 'RPG-05', name: 'Create new career & continue existing career flows', status: 'complete', notes: 'Slot card selection with level and team display.' },
      { id: 'RPG-06', name: 'Explicit deletion confirmation dialog with safe cancel', status: 'complete', notes: 'Prevents accidental slot overwrites.' },
      { id: 'RPG-07', name: 'Legacy save import & migration', status: 'complete', notes: 'Reads older prototype format into current schema.' },
      { id: 'RPG-08', name: 'Atomic file writing with temporary replacement', status: 'complete', notes: 'Safe file swap prevents corrupted save states.' },
      { id: 'RPG-09', name: 'Per-slot backup file recovery on corruption', status: 'complete', notes: 'Rolls back to .bak file if primary file is invalid.' },
      { id: 'RPG-10', name: 'Unreadable slot & future-version error handling', status: 'complete', notes: 'Honest error alerts without crashes.' },
      { id: 'RPG-11', name: 'Exhibition isolation guard against Story save modification', status: 'complete', notes: 'Exhibition matches never write Story slots.' }
    ]
  },

  // 14. FINAL PROTOTYPE ACCEPTANCE GATES (FULL-GAME PROTOTYPE)
  {
    id: 'sub-proto-gates',
    title: 'Full-Game Prototype Acceptance Gates',
    category: 'Systems & Hardware',
    tier: 'full_game_prototype',
    status: 'needs_attention',
    completedUnits: 0,
    totalUnits: 8,
    percentage: 0.0,
    unitLabel: 'Gates',
    nextStep: 'Establish minimal campaign sample agreement before testing',
    summary: '8 final acceptance checkpoints required to certify the 2-city full-game prototype. Audio is excluded from these gates.',
    scopeNote: 'Audio is excluded from prototype acceptance gates.',
    tasks: [
      { id: 'PG-01', name: 'Frontier to Superior travel & story progression gate', status: 'pending', notes: 'Travel transition between the two prototype cities.' },
      { id: 'PG-02', name: 'Three-lead character creation & name persistence in save', status: 'pending', notes: 'Names for protagonist, best friend, and cousin verified.' },
      { id: 'PG-03', name: 'CE-03 appearance selection & in-game sprite sync', status: 'pending', notes: 'Appearance persists into town exploration and match.' },
      { id: 'PG-04', name: 'Frontier school match & practice loop verification', status: 'pending', notes: 'Match entry, play, and return without state corruption.' },
      { id: 'PG-05', name: 'Cash earnings & basic store item transaction loop', status: 'pending', notes: 'Verify post-match payout and purchase flow.' },
      { id: 'PG-06', name: 'Slot delete, reload, and backup recovery on prototype', status: 'pending', notes: 'Verify 3-slot career stability.' },
      { id: 'PG-07', name: 'Gamepad playthrough across full prototype flow', status: 'pending', notes: 'Complete 2-city exploration and match via controller.' },
      { id: 'PG-08', name: 'Six-suite automation pass on prototype build', status: 'pending', notes: 'All unit and regression tests green.' }
    ]
  },

  // 15. RELEASE PACKAGING, CONSOLES & BACKEND (FULL GAME)
  {
    id: 'sub-release',
    title: 'Release Packaging, Consoles & Backend (Full Game)',
    category: 'Systems & Hardware',
    tier: 'full_game',
    status: 'needs_attention',
    completedUnits: 0,
    totalUnits: 11,
    percentage: 0.0,
    unitLabel: 'Milestones',
    nextStep: 'Package Windows standalone distribution executable',
    summary: '0 of 11 release milestones reached. Development launchers exist, but packaged distribution, console devkits, and online backend are future scope.',
    tasks: [
      { id: 'REL-01', name: 'Standalone Windows packaged distribution build', status: 'pending', notes: 'Self-contained executable without Unreal Editor dependency.' },
      { id: 'REL-02', name: 'Supported hardware & thermal benchmark acceptance', status: 'pending', notes: 'Stable 60 FPS verified on target minimum specs.' },
      { id: 'REL-03', name: 'Complete human playthrough validation across full match', status: 'pending', notes: 'Zero crashes across 3 periods and overtime.' },
      { id: 'REL-04', name: 'Final release credits, third-party licenses & attributions', status: 'pending', notes: 'Full attribution manifest for fonts and engine.' },
      { id: 'REL-05', name: 'Release branding, store capsules & trailer captures', status: 'pending', notes: 'Steam / Epic store art assets.' },
      { id: 'REL-06', name: 'Xbox Series X|S developer onboarding & port', status: 'pending', notes: 'GDK SDK setup, Xbox Live profile storage.' },
      { id: 'REL-07', name: 'PlayStation 5 developer onboarding & port', status: 'pending', notes: 'Prospero SDK setup, PSN storage and controller haptics.' },
      { id: 'REL-08', name: 'Nintendo Switch developer onboarding & port', status: 'pending', notes: 'NintendoSDK setup, NVN graphics and handheld thermal profile.' },
      { id: 'REL-09', name: 'Online multiplayer peer-to-peer or server rollback networking', status: 'pending', notes: 'Cross-platform lockstep simulation.' },
      { id: 'REL-10', name: 'Authentication, cloud saves & matchmaking service', status: 'pending', notes: 'Online player profile and leaderboard backend.' },
      { id: 'REL-11', name: 'Persistent database & season leaderboard infrastructure', status: 'pending', notes: 'Cloud database storage for ranked seasons.' }
    ]
  }
];
