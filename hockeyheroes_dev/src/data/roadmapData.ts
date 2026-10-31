import { AssetRoadmapItem, PlatformBudget, SprintPhase, MatchRuleConfig, InventoryTier } from '../types/roadmap';

export const PLATFORM_BUDGETS: Record<string, PlatformBudget> = {
  web: {
    platform: 'web',
    name: 'Web Browser (WebAssembly/WebGPU)',
    maxDrawCalls: 90,
    maxVRAM_MB: 250,
    textureFormat: 'ASTC 6x6 / KTX2 Basis',
    frameRateTarget: '60 FPS Fixed',
    resolutionScale: '720p Canvas (640x360 Internal)'
  },
  mobile: {
    platform: 'mobile',
    name: 'Mobile (iOS & Android)',
    maxDrawCalls: 140,
    maxVRAM_MB: 512,
    textureFormat: 'ASTC 4x4 / 6x6',
    frameRateTarget: '60 FPS Target (Thermal Throttled)',
    resolutionScale: 'Dynamic 1080p (Safe Notch Inset)'
  },
  pc: {
    platform: 'pc',
    name: 'PC (Steam / Windows / SteamDeck)',
    maxDrawCalls: 600,
    maxVRAM_MB: 2048,
    textureFormat: 'BC7 / DX11-12 Uncompressed HDR',
    frameRateTarget: '60-144 FPS VSync',
    resolutionScale: 'Native 1080p - 4K'
  }
};

export const INITIAL_ROADMAP_ITEMS: AssetRoadmapItem[] = [
  // ==========================================
  // HOCKEY & EXHIBITION MODE ASSETS
  // ==========================================

  // 1. Character & Action Source Delivery (44/44 Sheets)
  {
    id: 'CHR_TEAM_SOURCES_44',
    name: 'Character & Action Source Sheets Package (44/44)',
    category: 'characters',
    description: 'All 44 registered texture filenames in Exhibition source manifest exist, decode at 1024x1024, and have valid PNG headers.',
    status: 'ready',
    priority: 'Critical',
    format: '44 x 1024x1024 PNG Master Sheets',
    sourceOrigin: 'assets/art/hockey/data/prototype-art-exhibition.json (44/44 complete at 9e4a7d2)',
    requiredFor: ['exhibition', 'full_game_prototype', 'full_game'],
    scopeNote: 'Core player/action art foundation across all game modes.',
    specs: {
      directions: 8,
      frameCount: 352,
      textureRes: '1024x1024 (x44)',
      vramFootprintMB: 8.8,
      drawCalls: 2
    },
    technicalNotes: '100% path presence verified in rescan 6. Covers Home Comets, Away Visitors, wrist shot, slap shot, saucer pass, prone falls, celebrations.'
  },

  // 2. Male Skater 8-Way Locomotion Atlas
  {
    id: 'CHR_SKT_M_BASE',
    name: 'Male Skater 8-Way Locomotion Atlas (v2)',
    category: 'characters',
    description: 'Male forward/defenseman skating cycle: 8-direction cardinal and diagonal stride, glide, crossover turns, and foot bank.',
    status: 'ready',
    priority: 'Critical',
    format: '2048x2048 Atlas (ASTC / BC7)',
    sourceOrigin: 'assets/art/characters/male-hockey-skating-v2 (24 clips / 56 frames)',
    requiredFor: ['exhibition', 'full_game_prototype', 'full_game'],
    scopeNote: 'Active player skating locomotion in C++ prototype.',
    specs: {
      directions: 8,
      frameCount: 56,
      textureRes: '2048x2048',
      vramFootprintMB: 5.3,
      drawCalls: 1
    },
    technicalNotes: 'Baked at (192, 353) curved set and (176, 327) v1 resources at 0.125 scale. Suppresses procedural stick; includes directional blade offsets.'
  },

  // 3. Female Skater 8-Way Locomotion Parity
  {
    id: 'CHR_SKT_F_BASE',
    name: 'Female Skater 8-Way Locomotion Atlas (v2 Parity)',
    category: 'characters',
    description: 'Female skater 8-way locomotion extension, upgrading current 4-way cardinal walk into full diagonal push and crossover set.',
    status: 'in_progress',
    priority: 'Critical',
    format: '2048x2048 Atlas (ASTC / BC7)',
    sourceOrigin: 'assets/art/characters/female-hockey-v1.png (8 clips / 20 frame entries currently)',
    requiredFor: ['exhibition', 'full_game_prototype', 'full_game'],
    scopeNote: 'Missing diagonal pushes and crossovers required for 8-way parity.',
    specs: {
      directions: 8,
      frameCount: 48,
      textureRes: '2048x2048',
      vramFootprintMB: 5.3,
      drawCalls: 1
    },
    technicalNotes: 'Sprint milestone ticket to bring female rookie and wings to parity with male 8-way crossovers and diagonal banks.'
  },

  // 4. Character Action Production Animation Acceptance (0/7 Checks)
  {
    id: 'CHR_ACTION_ACCEPTANCE_7',
    name: 'Character Production Animation & Acceptance Checks (0/7)',
    category: 'characters',
    description: 'Production integration: cell bounds (20,40), camera scale reconciliation at 18-deg FOV, stick/puck anchors, and clip binding.',
    status: 'planned',
    priority: 'Critical',
    format: 'Engine Integration Passes',
    sourceOrigin: 'HOCKEY_SPRITES_UNREAL_CONTEXT.md Section 2 (7 open acceptance checks)',
    requiredFor: ['exhibition', 'full_game_prototype', 'full_game'],
    scopeNote: '7 open checks required to certify production animation in Unreal.',
    specs: {
      directions: 8,
      frameCount: 120,
      vramFootprintMB: 4.0,
      drawCalls: 2
    },
    technicalNotes: '0 of 7 checks passed. Required before replacing Canvas sprite renderer with projected ground-plane/Paper2D pipeline.'
  },

  // 5. Standalone Goalie 8-Way Crease Set
  {
    id: 'CHR_GLI_CORE',
    name: 'Goalie Standalone 8-Way Action & Crease Set',
    category: 'characters',
    description: 'Goalie stance, lateral butterfly slide, pad kick save, blocker deflection, glove catch, cover stoppage, and outlet pass.',
    status: 'in_progress',
    priority: 'Critical',
    format: '2048x2048 Atlas',
    sourceOrigin: 'assets/art/hockey/comets.png columns 9-11 (Upgraded to 8-direction crease coverage)',
    requiredFor: ['exhibition', 'full_game_prototype', 'full_game'],
    scopeNote: 'Missing dedicated lateral butterfly slides and kick saves.',
    specs: {
      directions: 8,
      frameCount: 24,
      textureRes: '2048x2048',
      vramFootprintMB: 5.3,
      drawCalls: 1
    },
    technicalNotes: 'Goalie bounding box uses 48x48 footprint with wider equipment silhouette. Replaces fixed-Y tracking with angle-based crease positioning.'
  },

  // 6. Modular Rink Geometry Delivery (RA-01 to RA-12)
  {
    id: 'SM_RINK_GEOMETRY_RA12',
    name: 'Modular Rink Geometry & Surfaces Package (RA-01–12)',
    category: 'rink',
    description: '38 decoded PNGs (10 overview/atlas + 28 slices), 14 bounded manifest regions, 4 imported textures / 2 UI materials delivered.',
    status: 'ready',
    priority: 'Critical',
    format: 'Modular 44-Region Skin + Static Meshes',
    sourceOrigin: 'exhibition-rink-art/RA01-12_integration.md (12/12 integration tickets complete)',
    requiredFor: ['exhibition', 'full_game_prototype', 'full_game'],
    scopeNote: 'Complete arena playing surface, boards, and glass geometry.',
    specs: {
      polyCount: 4200,
      textureRes: '1024x1024',
      vramFootprintMB: 4.8,
      drawCalls: 3,
      worldDimensions: '608x1072 playing surface, 800x1200 world canvas'
    },
    technicalNotes: 'Frosted blue ice plane Z=0, corner fillets (R=72), center red line, hashes, and white HDPE boards with yellow kickplates.'
  },

  // 7. Curved D-Shaped Goal Nets
  {
    id: 'SM_GOAL_CURVED_NETS',
    name: 'Curved D-Shaped Goal Nets (Top Y=144, Bottom Y=1056)',
    category: 'rink',
    description: 'Rounded mouth pipes (X=360/440), elliptical D-shaped rear outline, and nylon mesh clipped to curved roof with 24-unit playable depth.',
    status: 'ready',
    priority: 'Critical',
    format: 'Static Mesh Pair (~850 Tris x 2)',
    sourceOrigin: 'manifest keys: goal-top, goal-bottom (PRO_ARENA_REFINEMENT.md)',
    requiredFor: ['exhibition', 'full_game_prototype', 'full_game'],
    scopeNote: 'Physics and scoring thresholds verified in live engine.',
    specs: {
      polyCount: 1700,
      textureRes: '512x512',
      vramFootprintMB: 0.9,
      drawCalls: 2,
      worldDimensions: 'Mouth Y=144/1056; Posts X=360/440; Goal line X=367-433; Net depth 24'
    },
    technicalNotes: 'Solid posts (R=7) and playable behind-net ice. Puck scoring detected strictly between X=367-433 crossing goal line.'
  },

  // 8. Terraced Crowd Seating & Team Benches
  {
    id: 'SM_ARENA_SEATING_BENCHES',
    name: 'Terraced Crowd Seating, Team Benches & Officials Desk',
    category: 'rink',
    description: 'Navy molded seats on concrete terraces, paired team benches along West boards, and opposite timekeeper & penalty boxes.',
    status: 'ready',
    priority: 'High',
    format: 'Modular Mesh + Instanced Billboards',
    sourceOrigin: 'PRO_ARENA_REFINEMENT.md (steel/polymer pass)',
    requiredFor: ['exhibition', 'full_game_prototype', 'full_game'],
    scopeNote: 'Live in Exhibition and match venues.',
    specs: {
      polyCount: 2200,
      textureRes: '512x512',
      vramFootprintMB: 1.0,
      drawCalls: 2
    },
    technicalNotes: 'Integrated with Exhibition scoreboard HUD. Near-end boards/glass naturally occlude players via hardware Z-buffer.'
  },

  // 9. Directional Ice Spray Particle System
  {
    id: 'VFX_ICE_SPRAY',
    name: 'Directional Ice Shaving Particle System (Niagara)',
    category: 'vfx_audio',
    description: 'Crisp white snow plume emitted at skate blades during hard hockey stops and sharp 90-degree cuts.',
    status: 'in_progress',
    priority: 'High',
    format: 'Niagara Emitter (Sprite Pool)',
    sourceOrigin: 'Tape to Tape feel study & GBA ice spray effect',
    requiredFor: ['exhibition', 'full_game_prototype', 'full_game'],
    scopeNote: 'Required for Tape-to-Tape stopping visual feel in Exhibition.',
    specs: {
      textureRes: '128x128',
      vramFootprintMB: 0.1,
      drawCalls: 1
    },
    technicalNotes: 'GPU sprite sim capped at 120 particles max. Automatically scales down emission density on mobile/web.'
  },

  // 10. Dynamic Puck Ground Shadow Decal
  {
    id: 'VFX_PUCK_SHADOW_AIR',
    name: 'Dynamic Puck Shadow & Elevation Indicator',
    category: 'vfx_audio',
    description: 'Separate dark ground decal tracking true X/Y location of elevated saucer passes and tipped pucks.',
    status: 'ready',
    priority: 'Critical',
    format: 'Ground Decal / Low-Poly Quad',
    sourceOrigin: 'TAPE_TO_TAPE_GAMEPLAY_PLAN.md Section 3',
    requiredFor: ['exhibition', 'full_game_prototype', 'full_game'],
    scopeNote: 'Active in match simulation for saucer pass elevation.',
    specs: {
      textureRes: '64x64',
      vramFootprintMB: 0.05,
      drawCalls: 1
    },
    technicalNotes: 'Shadow scales down and softens alpha as puck height (Z) increases, providing instantaneous vertical depth cues.'
  },

  // 11. Exhibition Scoreboard & Clock HUD
  {
    id: 'UI_EXHIBITION_HUD',
    name: 'Exhibition Scoreboard, Clock & Penalty HUD',
    category: 'ui',
    description: 'Match score, 5/10/20-min period clock, 2-min minor penalty countdowns, and pass target reticle.',
    status: 'ready',
    priority: 'Critical',
    format: 'Modular UMG Canvas Widgets',
    sourceOrigin: 'Private/UI/HHFoundationHUD.cpp (640x360 logical view)',
    requiredFor: ['exhibition', 'full_game_prototype', 'full_game'],
    scopeNote: 'Exhibition HUD is isolated from Story career XP prompts.',
    specs: {
      textureRes: '512x512 Atlas',
      vramFootprintMB: 1.1,
      drawCalls: 3
    },
    technicalNotes: 'Supports 16:9 PC, responsive Web, and mobile notch safe areas. Target lead indicator clamps to screen edge.'
  },

  // ==========================================
  // FULL-GAME PROTOTYPE (2-CITY RPG SAMPLE) ASSETS
  // ==========================================

  // 12. Overworld Protagonist Casual Walking Sheets
  {
    id: 'CHR_CASUAL_M_F',
    name: 'Overworld Casual Walking Character Sheets (M & F)',
    category: 'characters',
    description: 'Male and female career characters walking, idling, and interacting in winter town and building interiors at 0.125 scale.',
    status: 'ready',
    priority: 'High',
    format: 'SpriteFrames (0.125 scale)',
    sourceOrigin: 'assets/art/characters/casual-sheets (Source scale 0.125)',
    requiredFor: ['full_game_prototype', 'full_game'],
    scopeNote: 'Active in town and building exploration.',
    specs: {
      directions: 4,
      frameCount: 16,
      textureRes: '512x512',
      vramFootprintMB: 1.1,
      drawCalls: 1
    },
    technicalNotes: 'Used by GridWalker in town and arena foyer. 16-unit smooth steps at 88 units/sec, facing-based interaction on E.'
  },

  // 13. Two-City Story Prototype Maps (Frontier & Superior)
  {
    id: 'MAP_STORY_PROTOTYPE_CITIES',
    name: 'Two-City Prototype Maps (Frontier & Superior)',
    category: 'overworld',
    description: 'Playable map slices for Frontier (Normund home school campus) and Superior (Hisery rival arena hub).',
    status: 'in_progress',
    priority: 'Critical',
    format: '2 Playable Venue Atlases + Collision',
    sourceOrigin: 'FULL_GAME_PROTOTYPE_PROGRESS_REPORT.md (Bounded to 2 cities)',
    requiredFor: ['full_game_prototype', 'full_game'],
    scopeNote: 'Strict 2-city prototype boundary: Frontier & Superior. Audio excluded.',
    specs: {
      textureRes: '2048x1024',
      vramFootprintMB: 6.0,
      drawCalls: 3,
      worldDimensions: 'Frontier Campus (1600x900) & Superior Arena (1200x800)'
    },
    technicalNotes: 'Only 2 cities required for prototype acceptance; remaining 14 cities in world lore are deferred to full game.'
  },

  // 14. 1600x900 Winter Town Scenery Atlas
  {
    id: 'MAP_TOWN_WINTER_ATLAS',
    name: '1600x900 Winter Town Scenery Atlas & Paths',
    category: 'overworld',
    description: 'Snow ground, 60-unit snowy paths (42-unit walking surface), paved town square (180x132), statue (77x73), benches, and pines.',
    status: 'ready',
    priority: 'High',
    format: 'Town Atlas Texture + Tile Collision (16x16 grid)',
    sourceOrigin: 'OVERWORLD_SCALE.md (SceneryScale = 0.75, VenueScale = 2.5)',
    requiredFor: ['full_game_prototype', 'full_game'],
    scopeNote: 'Live exploration base for Frontier town square.',
    specs: {
      textureRes: '1024x1024',
      vramFootprintMB: 4.2,
      drawCalls: 2,
      worldDimensions: '1600x900 world units; 640x287 viewport between HUD bars'
    },
    technicalNotes: 'Shared GridWalker collision footprints. Safe access to player home, Maya/Finn house doors, and arena entrance.'
  },

  // 15. Official Arena Domed Exterior
  {
    id: 'MAP_ARENA_DOME_EXTERIOR',
    name: 'Official Arena Domed Exterior (v2)',
    category: 'overworld',
    description: 'Domed v2 league/championship building exterior (576x384) with aligned entrance threshold at coordinate (768, 840).',
    status: 'ready',
    priority: 'High',
    format: 'Static Sprite / Mesh (576x384)',
    sourceOrigin: 'OVERWORLD_SCALE.md (Source scale 0.375, door threshold 768,840)',
    requiredFor: ['full_game_prototype', 'full_game'],
    scopeNote: 'Major visual landmark for the Frontier school arena.',
    specs: {
      textureRes: '1024x512',
      vramFootprintMB: 2.1,
      drawCalls: 1,
      worldDimensions: '576x384 world units'
    },
    technicalNotes: 'Door threshold aligns directly with GridWalker approach path for enter-building interaction on E.'
  },

  // 16. Outdoor Practice Rink Destination
  {
    id: 'MAP_PRACTICE_RINK_OUTDOOR',
    name: 'Outdoor Practice Rink Destination Landmark',
    category: 'overworld',
    description: 'Town practice destination with baked stands, outdoor boards, and entrance gate (370x555).',
    status: 'ready',
    priority: 'Medium',
    format: 'Static Sprite / Mesh (370x555)',
    sourceOrigin: 'OVERWORLD_SCALE.md (enlarged from 148x222 to 370x555)',
    requiredFor: ['full_game_prototype', 'full_game'],
    scopeNote: 'Accessible from Frontier town square for practice matches.',
    specs: {
      textureRes: '512x512',
      vramFootprintMB: 1.4,
      drawCalls: 1,
      worldDimensions: '370x555 world units'
    },
    technicalNotes: 'Entered with E. Returning from practice rink places player safely outside gate without state corruption.'
  },

  // 17. Seamless Overworld Terrain & Modular Interiors
  {
    id: 'ART_OVERWORLD_SEAMLESS_INTERIORS',
    name: 'Seamless Terrain Turns, Modular Interiors & Partitions',
    category: 'overworld',
    description: 'Seamless snow/paving end caps, path turns/junctions, modular floor/wall corners, partitions, and occlusion pieces.',
    status: 'planned',
    priority: 'High',
    format: 'Tileset Slices + Collision Bounds',
    sourceOrigin: 'RPG_OVERWORLD_ART_BACKLOG.md (8 open overworld items)',
    requiredFor: ['full_game_prototype', 'full_game'],
    scopeNote: 'Missing seamless tiles & modular wall corners for home/dorm rooms.',
    specs: {
      textureRes: '512x512',
      vramFootprintMB: 2.5,
      drawCalls: 2
    },
    technicalNotes: 'Needed to stage home, school dorm, and arena interiors with safe walking routes and door thresholds.'
  },

  // 18. Distinct Supporting Cast Sprites
  {
    id: 'ART_DISTINCT_CAST_SPRITES',
    name: 'Distinct Supporting Cast Character Sprites',
    category: 'overworld',
    description: 'Bespoke character sprites for Coach, Maya, Finn, and Eli rather than reused protagonist appearances.',
    status: 'planned',
    priority: 'Medium',
    format: '4-Direction Walking SpriteSheets',
    sourceOrigin: 'RPG_OVERWORLD_ART_BACKLOG.md Section 1',
    requiredFor: ['full_game_prototype', 'full_game'],
    scopeNote: 'Currently reuses protagonist casual sheets; needs distinct cast art.',
    specs: {
      directions: 4,
      frameCount: 32,
      textureRes: '512x512',
      vramFootprintMB: 1.5,
      drawCalls: 1
    },
    technicalNotes: 'Supports Camarad/Frontier school storyline. Distinct visual identities for childhood best friend and mentor.'
  },

  // 19. Customization Standing Concept Sheets
  {
    id: 'ART_CUSTOMIZATION_SHEETS',
    name: 'Character Customization Design Sheets & Palettes',
    category: 'characters',
    description: 'Four standing customization concept sheets, silhouette specs, and palette swatches for hairstyles and skin tones.',
    status: 'ready',
    priority: 'Medium',
    format: '4 Design Sheets + Palette JSON',
    sourceOrigin: 'assets/art/characters/customization-v1/ (CE-01 complete)',
    requiredFor: ['full_game_prototype', 'full_game'],
    scopeNote: 'Standing concept designs delivered; modular layers separate.',
    specs: {
      textureRes: '1024x1024',
      vramFootprintMB: 2.1,
      drawCalls: 1
    },
    technicalNotes: 'Audited in CE-01. These are concept reference designs; aligned modular animation layers are separate requirement CE-13–18.'
  },

  // 20. Modular Character Customization Layers (CE-13–18)
  {
    id: 'ART_MODULAR_LAYERS_CE13',
    name: 'Modular Appearance Animated Layers & Recolor Masks',
    category: 'characters',
    description: 'Technical sample (front idle + side walk) and full animation layer packs: 6 hairstyles, 4 skin palettes, clothing, uniform masks.',
    status: 'planned',
    priority: 'High',
    format: 'Multi-Layer PNG Sequences + Recolor Masks',
    sourceOrigin: 'CUSTOMIZATION_ART_ASSETS_REQUIRED.md (First delivery: CE-13 technical sample)',
    requiredFor: ['full_game_prototype', 'full_game'],
    scopeNote: 'First art delivery dependency at CE-13; full layers at CE-14–18.',
    specs: {
      directions: 4,
      frameCount: 64,
      textureRes: '1024x1024 Layers',
      vramFootprintMB: 6.2,
      drawCalls: 3
    },
    technicalNotes: 'First art dependency at CE-13. Standing designs do not satisfy interchangeable layers. No art needed for CE-03–12.'
  },

  // 21. Shared 2D UI Kit (60 Validated Exports)
  {
    id: 'UI_SHARED_KIT_60',
    name: 'Shared 2D UI Kit Asset Production (60/60)',
    category: 'ui',
    description: 'Pixel font, 9-slice panels, button states, cursors, keyboard badges, and generic controller glyphs; 60 entries validated.',
    status: 'ready',
    priority: 'High',
    format: 'Atlas PNGs + Metadata Manifest',
    sourceOrigin: 'assets/ui/shared/README.md (60 manifest entries validated in tools/generate_ui_kit.py)',
    requiredFor: ['full_game_prototype', 'full_game'],
    scopeNote: 'Core UI kit production complete; screen integration underway.',
    specs: {
      textureRes: '1024x1024 Atlas',
      vramFootprintMB: 2.4,
      drawCalls: 1
    },
    technicalNotes: 'Standardized kit for menus, dialogs, and HUD. Screen layouts in progress.'
  },

  // 22. Three-Slot Career Story Saves & Settings Migration
  {
    id: 'UI_SAVED_SLOTS_3',
    name: 'Three-Slot Story Career UI & Controls Settings Migration',
    category: 'ui',
    description: 'Three independent Story save cards, deletion confirmation dialogs, backup recovery, and 17-action controls remapper.',
    status: 'ready',
    priority: 'Critical',
    format: 'Slate / Canvas Save Management Widgets',
    sourceOrigin: 'THREE_SLOT_SAVES.md & CONTROLS_AND_CONSOLE_TARGETS.md (Verified in 6 suites)',
    requiredFor: ['full_game_prototype', 'full_game'],
    scopeNote: 'Story career persistence and controls migration fully functional.',
    specs: {
      textureRes: '512x512',
      vramFootprintMB: 0.8,
      drawCalls: 1
    },
    technicalNotes: 'Three independent career slots in Saved/SaveGames. Isolated from Exhibition mode.'
  },

  // ==========================================
  // FULL GAME COMMERCIAL RELEASE ASSETS
  // ==========================================

  // 23. Full-Game Audio & SFX Backlog (8 Checklist Groups)
  {
    id: 'SFX_AUDIO_BACKLOG_8',
    name: 'Full-Game 16-Bit Audio & SFX Backlog (8 Groups)',
    category: 'vfx_audio',
    description: 'Puck clatter on HDPE boards, blade gouge stops, whistle chimes, referee sirens, Camelot brass organ, and overworld cues.',
    status: 'planned',
    priority: 'Medium',
    format: '16-Bit 44.1kHz WAV / Sound Cues',
    sourceOrigin: 'AUDIO_SFX_ASSET_BACKLOG.md (0 audio files in repository)',
    requiredFor: ['full_game'],
    scopeNote: 'EXCLUDED from Exhibition & 2-City Prototypes. Required strictly for Full Game.',
    specs: {
      vramFootprintMB: 4.5,
      drawCalls: 0
    },
    technicalNotes: 'Full-game commercial release requirement. Sound cues pooled in UE5 Sound Cue with pitch randomization.'
  },

  // 24. Store Catalogue Icons & Bedroom Furniture (Full Game)
  {
    id: 'ART_ECONOMY_STORE_EQUIPMENT',
    name: 'Store Catalogue Icons, Equipment & Bedroom Furniture',
    category: 'ui',
    description: 'User-approved item icons for skates, sticks, helmets, food/drink consumables, and placeable bedroom furniture metadata.',
    status: 'planned',
    priority: 'Medium',
    format: '64x64 Pixel Icons + Room Footprints',
    sourceOrigin: 'CUSTOMIZATION_ART_ASSETS_REQUIRED.md & CUSTOMIZATION_CATALOGUE_CE01.md',
    requiredFor: ['full_game'],
    scopeNote: 'Awaiting user-approved store catalogue names, prices, and effect lists.',
    specs: {
      textureRes: '512x512 Atlas',
      vramFootprintMB: 1.2,
      drawCalls: 1
    },
    technicalNotes: 'Furniture designs can be reused; footprint collision and placement metadata needed for CE-43.'
  },

  // 25. 16-City Regional World Map & Arenas (Full Game)
  {
    id: 'MAP_FULL_16_CITIES',
    name: '16-City Regional World Map & Tournament Venues',
    category: 'overworld',
    description: 'Regional championship arenas and world hubs across Normund (Marmalade, Riversdale), Hisery (Superior), Petryl, and Van Isles.',
    status: 'planned',
    priority: 'Low',
    format: 'Regional Overworld Maps + Tournament Venues',
    sourceOrigin: 'STORY_LORE_PROTOTYPE_AND_FULL_GAME_TASKS.md (Full Game Scope)',
    requiredFor: ['full_game'],
    scopeNote: '16 named cities in world plan are full-game lore; prototype only uses 2.',
    specs: {
      textureRes: '2048x2048',
      vramFootprintMB: 8.0,
      drawCalls: 4
    },
    technicalNotes: 'Expanded tournament tour across Camarad. Unlocked during Year 1 and Year 2 playoffs.'
  },

  // 26. Story Specials Signature Move VFX (Full Game)
  {
    id: 'ART_SPECIAL_SHOTS_VFX',
    name: 'Story Specials Signature Move Visual Effects',
    category: 'vfx_audio',
    description: 'Particle trails and burst animations for approved Story signature shots and saves (Gener Sous vs Jim Berry tech).',
    status: 'planned',
    priority: 'Medium',
    format: 'Niagara Particle Systems + Sprite Bursts',
    sourceOrigin: 'STORY_LORE_PROTOTYPE_AND_FULL_GAME_TASKS.md (Specials Interpretation)',
    requiredFor: ['full_game'],
    scopeNote: 'Specials are removed from standalone Exhibition; reserved for Story campaign.',
    specs: {
      textureRes: '512x512',
      vramFootprintMB: 1.8,
      drawCalls: 2
    },
    technicalNotes: 'Athletic or fantastical signature moves earned through mentor quests in Year 2.'
  },

  // 27. Commercial Release Branding & Store Graphics
  {
    id: 'UI_RELEASE_BRANDING_STORE',
    name: 'Commercial Release Branding, App Icon & Store Art',
    category: 'ui',
    description: 'Supplied LochLAN animated splash screen, title wordmark background, application icon, credits, and store capsules.',
    status: 'planned',
    priority: 'Medium',
    format: 'High-Res Store Graphics + Vector Icons',
    sourceOrigin: 'UI_UX_SCREEN_INVENTORY.md (Release Milestone)',
    requiredFor: ['full_game'],
    scopeNote: 'Required for Steam, Epic, and console platform certification.',
    specs: {
      textureRes: '2048x2048',
      vramFootprintMB: 5.0,
      drawCalls: 1
    },
    technicalNotes: 'LochLAN company logo displayed before title screen preserving true proportions; platform store art.'
  }
];

export const SPRINT_PHASES: SprintPhase[] = [
  {
    phaseId: 'A',
    title: 'Phase A: Core Feel & Foundational Response',
    hoursRange: 'Hours 01–10',
    status: 'completed',
    summary: 'Tape to Tape skate glide feel, fixed 1/120s physics substep, 8-way directional stride, and 12-action input binding.',
    deliverables: [
      { hour: 'Hour 01', task: 'Decouple physics tick to fixed 1/120s step', check: '120 Hz deterministic substep verified', status: 'done' },
      { hour: 'Hour 02', task: 'Low-inertia skate acceleration (0 to max in 0.35s)', check: 'Sprint button applies 1.35x velocity burst', status: 'done' },
      { hour: 'Hour 03', task: 'Tape to Tape skate glide friction & coast decay', check: '0.985 velocity retention per 1/60s frame', status: 'done' },
      { hour: 'Hour 04', task: 'Instant 90-degree skate cut & brake gouge', check: 'Emits ice spray particle trigger on cut', status: 'done' },
      { hour: 'Hour 05', task: '8-way directional facing matrix mapping', check: 'Maps 8 visual directions cleanly to 360 velocity', status: 'done' },
      { hour: 'Hour 06', task: 'Dual-stick / arrow action routing & aim lead', check: 'Independent skate direction vs passing stick aim', status: 'done' },
      { hour: 'Hour 07', task: 'Puck carrier stick-blade magnetic lock (R=18)', check: 'Carrier keeps possession during standard coast', status: 'done' },
      { hour: 'Hour 08', task: 'Carrier sprint penalty (loose puck risk on turn)', check: 'High-speed sharp turns widen possession radius', status: 'done' },
      { hour: 'Hour 09', task: 'Input buffer queue (150ms window for shot/pass)', check: 'Pre-buffered one-timers execute upon contact', status: 'done' },
      { hour: 'Hour 10', task: 'Phase A integration test & controller feel check', check: 'Verified with Xbox & DualSense PC controllers', status: 'done' }
    ]
  },
  {
    phaseId: 'B',
    title: 'Phase B: Passing, Lead Geometry & Receptions',
    hoursRange: 'Hours 11–20',
    status: 'completed',
    summary: 'Direct passing, lead angle calculation, saucer pass Z-elevation, receiver stick suction, and turnover deflections.',
    deliverables: [
      { hour: 'Hour 11', task: 'Direct flat pass velocity curve (1450 units/sec)', check: 'Flat tape-to-tape pass trajectory verified', status: 'done' },
      { hour: 'Hour 12', task: 'Dynamic lead pass projection based on teammate speed', check: 'Target reticle projects 0.25s ahead of skater', status: 'done' },
      { hour: 'Hour 13', task: 'Saucer pass elevation curve (Z-arc max 45 units)', check: 'Puck lifts cleanly over defender stick boxes', status: 'done' },
      { hour: 'Hour 14', task: 'Dynamic puck ground shadow during elevation', check: 'Shadow decal softens alpha and scales with Z', status: 'done' },
      { hour: 'Hour 15', task: 'Clean tape reception window (angle +/- 45 deg)', check: 'Smooth reception without losing forward speed', status: 'done' },
      { hour: 'Hour 16', task: 'Bad-angle reception bobble / speed penalty', check: 'Behind-back reception triggers 0.15s stumble', status: 'done' },
      { hour: 'Hour 17', task: 'Opponent skate / stick interception radius', check: 'Passes crossing opponent stick line deflect', status: 'done' },
      { hour: 'Hour 18', task: 'Bank pass off boards (reflection angle + friction)', check: 'HDPE boards reflect puck at 0.72 restitution', status: 'done' },
      { hour: 'Hour 19', task: 'Give-and-go AI burst trigger on pass release', check: 'Passing skater accelerates into open ice lane', status: 'done' },
      { hour: 'Hour 20', task: 'Phase B passing drills benchmark & pass completion stats', check: 'Passing drills verified in Scenario capture', status: 'done' }
    ]
  },
  {
    phaseId: 'C',
    title: 'Phase C: Shooting Mechanics & Shot Types',
    hoursRange: 'Hours 21–30',
    status: 'in_progress',
    summary: 'Quick wrist shots, charged slap shots, one-timers, backhands, and directional net targeting.',
    deliverables: [
      { hour: 'Hour 21', task: 'Quick wrist shot (0.12s release, 1850 units/sec)', check: 'Rapid snap release on tap', status: 'done' },
      { hour: 'Hour 22', task: 'Charged slap shot meter (0.4s windup, 2400 u/s)', check: 'Power meter triggers heavier board impact', status: 'done' },
      { hour: 'Hour 23', task: 'Backhand flip shot from opposite stick side', check: 'Accurate elevation from tight angles', status: 'done' },
      { hour: 'Hour 24', task: 'One-timer contact window (150ms pre-arrival tap)', check: 'Immediate 1.25x velocity rocket on reception', status: 'pending' },
      { hour: 'Hour 25', task: 'Directional stick aim targeting net corners', check: 'Aim stick divides net into 4 scoring quadrants', status: 'pending' },
      { hour: 'Hour 26', task: 'Crossbar and post ping collision sound & deflection', check: 'R=7 post collisions reflect with metallic ping', status: 'pending' },
      { hour: 'Hour 27', task: 'Screened shots & deflections off traffic in slot', check: 'Deflections change angle toward open net', status: 'pending' },
      { hour: 'Hour 28', task: 'Wrap-around attempt detection behind goal net', check: 'Skating tight around post triggers tuck shot', status: 'pending' },
      { hour: 'Hour 29', task: 'Rebound generation physics off goalie equipment', check: 'Juicy rebounds bounce into high slot', status: 'pending' },
      { hour: 'Hour 30', task: 'Phase C shooting drill challenge mode & telemetry', check: 'Target shooting accuracy test suite', status: 'pending' }
    ]
  },
  {
    phaseId: 'D',
    title: 'Phase D: Bodychecks, Stumbles & Physical Play',
    hoursRange: 'Hours 31–40',
    status: 'upcoming',
    summary: 'Committed directional shoulder checks, hip checks, stumble recoveries, and board pinning.',
    deliverables: [
      { hour: 'Hour 31', task: 'Directional shoulder check lunge (0.2s committed dash)', check: 'Player dashes forward with collision hull', status: 'pending' },
      { hour: 'Hour 32', task: 'Collision weight calculation (Speed x Strength stat)', check: 'Heavier skater knocks down lighter skater', status: 'pending' },
      { hour: 'Hour 33', task: 'Puck separation on clean body contact', check: 'Carrier immediately drops possession on hit', status: 'pending' },
      { hour: 'Hour 34', task: 'Prone fall & get-up animation recovery cycle (0.6s)', check: 'Fallen player cannot act until standing', status: 'pending' },
      { hour: 'Hour 35', task: 'Stumble balance check (glancing blows keep footing)', check: 'Glancing angle slows speed by 50% without fall', status: 'pending' },
      { hour: 'Hour 36', task: 'Board crunch collision sound & camera screen shake', check: 'Impact on boards triggers 3-pixel impulse shake', status: 'pending' },
      { hour: 'Hour 37', task: 'Poke check reach & tripping infraction risk', check: 'Poke from behind trips skater and risks penalty', status: 'pending' },
      { hour: 'Hour 38', task: 'Stick lift battle along boards for loose puck', check: 'Contested puck along boards locks in 0.5s battle', status: 'pending' },
      { hour: 'Hour 39', task: 'Anti-stun-lock invulnerability grace period (0.8s)', check: 'Player cannot be re-checked immediately upon rising', status: 'pending' },
      { hour: 'Hour 40', task: 'Phase D physical play balance verification', check: 'Checked against NHL 94 bodycheck standards', status: 'pending' }
    ]
  },
  {
    phaseId: 'E',
    title: 'Phase E: Goalie AI & Crease Save Coverage',
    hoursRange: 'Hours 41–50',
    status: 'upcoming',
    summary: 'Goalie angle tracking, butterfly slides, pad kick saves, glove freezes, and rebound distribution.',
    deliverables: [
      { hour: 'Hour 41', task: 'Angle-based crease positioning along bisector arc', check: 'Goalie squares up between puck and net center', status: 'pending' },
      { hour: 'Hour 42', task: 'Lateral butterfly slide speed curve (tight push)', check: 'Fast push to post on cross-crease passes', status: 'pending' },
      { hour: 'Hour 43', task: 'Low pad kick save against flat wrist/slap shots', check: 'Pucks along ice rebound to corner boards', status: 'pending' },
      { hour: 'Hour 44', task: 'Glove catch & freeze stoppage (1.5s whistle lock)', check: 'Pucks in upper quadrants frozen on glove save', status: 'pending' },
      { hour: 'Hour 45', task: 'Blocker deflection to safe sideboards', check: 'Upper stick-side shots deflected wide', status: 'pending' },
      { hour: 'Hour 46', task: 'Five-hole vulnerability on fast dekes & crossovers', check: 'Quick lateral fake opens scoring chance', status: 'pending' },
      { hour: 'Hour 47', task: 'Desperation dive / paddle save on open nets', check: 'Diving animation triggers on back-door pass', status: 'pending' },
      { hour: 'Hour 48', task: 'Goalie puck possession & outlet passing logic', check: 'Goalie plays loose puck to open defenseman', status: 'pending' },
      { hour: 'Hour 49', task: 'Manual goalie takeover toggle option', check: 'Human control of goalie on breakaway', status: 'pending' },
      { hour: 'Hour 50', task: 'Phase E goalie benchmark against 100 simulated shots', check: 'Goalie save percentage reaches 88-92%', status: 'pending' }
    ]
  },
  {
    phaseId: 'F',
    title: 'Phase F: Team AI Formations & Cycling',
    hoursRange: 'Hours 51–60',
    status: 'upcoming',
    summary: 'Offensive breakout lanes, high slot support, defensive zone collapse, and forecheck pressure.',
    deliverables: [
      { hour: 'Hour 51', task: 'Offensive zone triangle cycling positioning', check: 'Wingers stay wide while center drives slot', status: 'pending' },
      { hour: 'Hour 52', task: 'Breakout lane anticipation on defensive turnover', check: 'Wingers streak up wing on change of possession', status: 'pending' },
      { hour: 'Hour 53', task: 'High slot trailing one-timer option', check: 'Trailing defenseman glides into shooting slot', status: 'pending' },
      { hour: 'Hour 54', task: 'Defensive box collapse in low slot (protect house)', check: 'Defenders crowd goal crease on opponent attack', status: 'pending' },
      { hour: 'Hour 55', task: 'Aggressive forechecking pressure on carrier behind net', check: 'F1 attacks puck while F2 covers passing lane', status: 'pending' },
      { hour: 'Hour 56', task: 'Backchecking pursuit logic when beaten wide', check: 'Backcheckers angle carrier toward boards', status: 'pending' },
      { hour: 'Hour 57', task: 'Offsides avoidance (teammate halts at blue line)', check: 'AI waits for puck carrier to cross line first', status: 'pending' },
      { hour: 'Hour 58', task: 'Line stamina depletion & performance scaling', check: 'Tired skaters skate 15% slower until line change', status: 'pending' },
      { hour: 'Hour 59', task: 'Automated line change AI when puck clears zone', check: 'Tired skaters sprint to bench when safe', status: 'pending' },
      { hour: 'Hour 60', task: 'Phase F full-game AI vs AI exhibition match test', check: 'Zero AI deadlocks across 3 full periods', status: 'pending' }
    ]
  },
  {
    phaseId: 'G',
    title: 'Phase G: Match Rules, Whistles & Penalty Flow',
    hoursRange: 'Hours 61–70',
    status: 'upcoming',
    summary: 'Offsides, icing, minor penalties (2-min), power plays, penalty shot breakaways, and fighting.',
    deliverables: [
      { hour: 'Hour 61', task: 'Offsides rule detection & whistle stoppage', check: 'Offsides triggers faceoff outside attacking zone', status: 'pending' },
      { hour: 'Hour 62', task: 'Icing detection on dump-ins past goal line', check: 'Icing brings faceoff back to defending end', status: 'pending' },
      { hour: 'Hour 63', task: 'Two-minute minor penalty box system & UI timer', check: 'Boxed player serves 2 minutes (or next goal)', status: 'pending' },
      { hour: 'Hour 64', task: 'Power play / penalty kill 5v4 formation logic', check: 'Special teams AI adjusts formation geometry', status: 'pending' },
      { hour: 'Hour 65', task: 'Delayed penalty call (goalie pulled for 6th attacker)', check: 'Play continues until offending team touches puck', status: 'pending' },
      { hour: 'Hour 66', task: 'Breakaway foul penalty shot award flow', check: '1v1 confrontation between shooter and goalie', status: 'pending' },
      { hour: 'Hour 67', task: 'Fighting confrontation mini-game trigger option', check: '1v1 brawl mini-game with 5-minute majors', status: 'pending' },
      { hour: 'Hour 68', task: 'Faceoff circle puck drop timing & stick tie-up', check: 'Timing minigame to win possession on drop', status: 'pending' },
      { hour: 'Hour 69', task: 'Goal celebration sequence & instant replay clip', check: 'Team celebration animation and score bump', status: 'pending' },
      { hour: 'Hour 70', task: 'Phase G complete rulebook validation pass', check: 'All rules pass test suite without soft-locks', status: 'pending' }
    ]
  },
  {
    phaseId: 'H',
    title: 'Phase H: Camera Tracking, Juice & Presentation',
    hoursRange: 'Hours 71–80',
    status: 'upcoming',
    summary: 'Dynamic puck/play camera framing, screen shake, goal siren lighting, and transition wipes.',
    deliverables: [
      { hour: 'Hour 71', task: 'Dynamic camera lead tracking (640x360 logical frame)', check: 'Camera leads puck carrier smoothly by 60 units', status: 'pending' },
      { hour: 'Hour 72', task: 'Corner zoom and high-slot wide-angle lerping', check: 'Seamless zoom out when play expands to point', status: 'pending' },
      { hour: 'Hour 73', task: 'Goal siren strobe lighting & red light behind net', check: 'Flashing red beacon activates on confirmed goal', status: 'pending' },
      { hour: 'Hour 74', task: 'Ice scratch decal accumulation during match', check: 'Skating leaves persistent cut marks on ice surface', status: 'pending' },
      { hour: 'Hour 75', task: 'Impact particle sparks on heavy slap shot posts', check: 'Sparks emit when puck strikes steel pipe', status: 'pending' },
      { hour: 'Hour 76', task: 'Period intermission wipe & score card summary', check: '16-bit transition wipe between periods', status: 'pending' },
      { hour: 'Hour 77', task: 'Star player indicator & active selection circle', check: 'Crisp cyan ring under controlled skater', status: 'pending' },
      { hour: 'Hour 78', task: 'Crowd cheer volume dynamic response to play', check: 'Crowd roars on scoring chances and big checks', status: 'pending' },
      { hour: 'Hour 79', task: 'Post-game three stars of the match presentation', check: 'Presents top performers with stat badges', status: 'pending' },
      { hour: 'Hour 80', task: 'Phase H visual polish & presentation sign-off', check: 'Presentation passes 60 FPS profile check', status: 'pending' }
    ]
  },
  {
    phaseId: 'I',
    title: 'Phase I: Multiplatform Portability & Budgets',
    hoursRange: 'Hours 81–90',
    status: 'upcoming',
    summary: 'Web WebAssembly/WebGPU build, mobile touch controls, iOS safe insets, and SteamDeck controller mapping.',
    deliverables: [
      { hour: 'Hour 81', task: 'VRAM footprint audit & texture compression pass', check: 'Total texture memory remains under 250MB web cap', status: 'pending' },
      { hour: 'Hour 82', task: 'Draw call batching & instanced mesh consolidation', check: 'Draw calls capped under 90 on web renderer', status: 'pending' },
      { hour: 'Hour 83', task: 'Mobile virtual dual-stick touch controls overlay', check: 'Responsive touch joystick and action buttons', status: 'pending' },
      { hour: 'Hour 84', task: 'iOS notch safe-area inset & home indicator padding', check: 'HUD elements clear notch and island cutouts', status: 'pending' },
      { hour: 'Hour 85', task: 'SteamDeck 1280x800 native 16:10 aspect profile', check: 'UI scales cleanly without letterboxing distortion', status: 'pending' },
      { hour: 'Hour 86', task: 'Web browser keyboard mapping (WASD + Space/J/K/L)', check: 'Zero-latency browser keyboard input verified', status: 'pending' },
      { hour: 'Hour 87', task: 'Fixed 60 FPS frame rate pacing & delta-time safety', check: 'Physics remains deterministic on variable refresh', status: 'pending' },
      { hour: 'Hour 88', task: 'Memory leak stress test across 10 consecutive matches', check: 'Heap allocation remains flat over 1 hour', status: 'pending' },
      { hour: 'Hour 89', task: 'Save data serialization & cross-platform cloud sync', check: 'JSON save files sync cleanly across devices', status: 'pending' },
      { hour: 'Hour 90', task: 'Phase I multiplatform build validation (PC, Web, Mobile)', check: 'Builds deploy cleanly across all three targets', status: 'pending' }
    ]
  },
  {
    phaseId: 'J',
    title: 'Phase J: Final Polish, Audio Masters & Release Freeze',
    hoursRange: 'Hours 91–100',
    status: 'upcoming',
    summary: 'Master audio integration, difficulty tuning (Rookie, Pro, Legend), bug fixing, and release build candidate.',
    deliverables: [
      { hour: 'Hour 91', task: 'Master audio mix balance (SFX, crowd, organ, whistle)', check: 'Clean dynamic range across speakers & headphones', status: 'pending' },
      { hour: 'Hour 92', task: 'Difficulty slider tuning: Rookie, Pro, Legend AI', check: 'AI reaction times scale from 350ms to 90ms', status: 'pending' },
      { hour: 'Hour 93', task: 'Edge-case collision fixes (behind-net puck wedging)', check: 'Zero puck wedging in net mesh or corner boards', status: 'pending' },
      { hour: 'Hour 94', task: 'Instant rematch flow without reloading assets', check: 'Rematch restarts within 0.5s from memory', status: 'pending' },
      { hour: 'Hour 95', task: 'Accessibility options (colorblind teams, high-contrast puck)', check: 'High-visibility orange puck mode verified', status: 'pending' },
      { hour: 'Hour 96', task: 'Complete gamepad rumble feedback profile', check: 'Haptic rumble on shot release, post, and check', status: 'pending' },
      { hour: 'Hour 97', task: 'Exhibition tournament bracket mode integration', check: '8-team single elimination knockout tournament', status: 'pending' },
      { hour: 'Hour 98', task: 'Full regression test suite pass (100% test coverage)', check: 'All automated simulation tests green', status: 'pending' },
      { hour: 'Hour 99', task: 'Final QA gameplay stress test with playtesters', check: 'Zero crashes or soft-locks reported', status: 'pending' },
      { hour: 'Hour 100', task: 'Release build candidate lock & gold master tag', check: 'Hockey Heroes 2.5D Exhibition Ready for Gold', status: 'pending' }
    ]
  }
];

export const MATCH_RULES_SPEC: MatchRuleConfig[] = [
  {
    id: 'penalties',
    name: 'Penalties & Infractions',
    options: ['Off', 'On (No Fighting)', 'Full NHL (Fighting Allowed)'],
    activeOption: 'On (No Fighting)',
    description: 'Enforces 2-minute minor penalties for tripping, hooking, and high-sticking. Full NHL allows 1v1 fights with 5-minute majors.',
    tapeToTapeImpact: 'Matches Tape to Tape arcade style when Off; provides authentic simulation depth when On.'
  },
  {
    id: 'period_length',
    name: 'Period Length',
    options: ['3 Minutes', '5 Minutes', '10 Minutes', '20 Minutes (Full)'],
    activeOption: '5 Minutes',
    description: 'Duration of each of the 3 standard match periods. Clock runs at accelerated 2x speed by default.',
    tapeToTapeImpact: '5-minute periods provide optimal 12-minute session length for sports RPG pacing.'
  },
  {
    id: 'overtime',
    name: 'Overtime Format',
    options: ['Sudden Death 5-Min 3v3', 'Continuous 5v5', 'Direct Shootout'],
    activeOption: 'Sudden Death 5-Min 3v3',
    description: 'Resolution method for tied games after regulation time. 3v3 sudden death provides high-drama open ice.',
    tapeToTapeImpact: 'Fast-paced sudden death mirrors modern overtime thrills and keeps story momentum high.'
  },
  {
    id: 'fatigue',
    name: 'Line Fatigue & Line Changes',
    options: ['Off', 'Manual Line Changes', 'Automated Shift Cycling'],
    activeOption: 'Off',
    description: 'Sprint 08 decision: Fatigue removed from planned Exhibition scope. No energy decay or stamina penalties applied during matches.',
    tapeToTapeImpact: 'Consistent full-speed gameplay aligns with Tape to Tape momentum without stamina throttling.'
  },
  {
    id: 'puck_physics',
    name: 'Puck Bounce & Board Restitution',
    options: ['Dampened (Easy)', 'Realistic HDPE (0.72)', 'Super Bouncy (Arcade)'],
    activeOption: 'Realistic HDPE (0.72)',
    description: 'Restitution coefficient when puck impacts HDPE rink boards, acrylic glass, or goalie pads.',
    tapeToTapeImpact: 'Calibrated 0.72 restitution allows accurate bank passes and realistic rebound opportunities.'
  }
];
