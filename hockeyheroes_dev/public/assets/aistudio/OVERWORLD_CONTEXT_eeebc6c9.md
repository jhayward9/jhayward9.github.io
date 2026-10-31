# Hockey Heroes — Combined Overworld Context

Consolidated October 28, 2026 from all three source documents in `docs/overworld`.

## Consolidated handoff

### Direction and implementation status

The approved overworld movement is four-direction, grid-aligned walking with smooth travel between adjacent cell centers, inspired by the GBA Mario Tennis and Mario Golf overworld feel. Exact reference-game movement has not been verified. The user approved the sample's direction handling, full-tile stopping and timing before integration into the playable Godot town and interiors on October 25, 2026.

The movement plan's “Proposed” sections and rollout sequence describe the original specification; its current-implementation section and the prototype report record the subsequent integration. The prototype's request to review feel “before integrating” is historical wording: integration is already reported complete. Further manual playtesting remains useful, but does not reverse that approval.

These documents describe the Godot/C# prototype. The repository's current migration target is Unreal Engine 5.8/C++ in `unreal/HockeyHeroes`, with Godot retained as the working reference until each port is validated. This consolidation does not establish Unreal implementation parity or authorize gameplay changes.

### Movement and input contract

- Cells are 16 × 16 world units. Walking speed is 88 units/second, approximately 0.182 seconds per step. No acceleration, inertia, running, diagonal travel or wall sliding is part of this feature.
- Track current cell, destination cell, facing and step progress separately from rendered feet. A tap completes one step; holding chains steps continuously; releasing finishes the current step and stops at its destination center.
- The latest newly pressed held direction wins. Opposing keys cancel their axis. Turns/reversals occur at centers, and a direction released before arrival does not queue a turn. Retain only the latest held direction rather than a route of queued inputs. Exact ties use the documented deterministic policy.
- Check the destination before every step, including multiple steps within a long frame. Walls, edges and occupied cells block entry but allow facing changes. The current logical footprint is one cell; larger actor footprints remain future work.
- Use feet for placement and depth sorting. Keep simulation/interpolation precise and round only presentation where needed. Hockey skating and hockey mini-games retain separate controllers.

### Interactions and transitions

E interacts with an adjacent facing cell. Doors/NPCs have explicit interaction cells; large objects may expose several. One E request during travel waits until arrival, resolves once before another step, and is consumed by dialogue or a transition. Pause freezes step progress and resume continues it. Dialogue/activity menus prevent movement; closing them requires released movement keys followed by a fresh press.

Door entry/exit, activity returns and reset use valid authored spawn cells/facing, clear active steps and queued interaction, and gate stale held input. Reject blocked spawn definitions. Entering/leaving remains deliberate through E. Moving NPCs, companions, automatic door triggers and pathfinding are outside this feature.

### Current environment scale and layout

The latest recorded scenery adjustment is the midpoint between full-size and half-size passes: 75% of the earlier full-size scenery, or 1.5× the half-size version. Character, rink and arena sprite sizes stay as recorded; source PNGs are preserved. This is a rendering/layout adjustment.

| Item | Recorded dimensions or setting |
|---|---|
| Town / exploration viewport | 1600 × 900 world units / 640 × 287 between HUD bars |
| VenueScale / SceneryScale | 2.5 relative to original compact venues / 0.75 for small scenery and matching footprints |
| Official arena | Domed v2 exterior, 576 × 384; source scale 0.375; source door threshold (768,840) aligned to grid approach |
| Practice venue | 370 × 555, previously 148 × 222 |
| Ground patches | 72 × 72 |
| Snowy paths / walking surface | 60 / 42 units across; connected branches and junction fills |
| Town square | 180 × 132 |
| Trees | Large approximately 81 × 98; small approximately 60 × 78 |
| Benches | South approximately 59 × 40; east approximately 28 × 51 |
| Statue / rocks | Approximately 77 × 73 / 53 × 46 |
| Placeholder houses | 156 × 108; doors 18 × 30; windows 21 × 21; roof bands 42 |
| Male/female characters | Source scale 0.125; grid and walk speed unchanged |

Houses resize around door thresholds to preserve interaction cells. Prop artwork and local collision footprints share the scenery multiplier. Paths connect houses, venues and square. The exterior camera translates scenery and characters together, rounds to whole pixels and clamps to map bounds; HUD/interior coordinates remain unchanged. Ground anchors and canopy depth sorting remain authoritative.

### Modules and authoring boundaries

`src/GridWalker.cs` is the map-independent stepping/direction controller; maps provide destination collision queries. `src/GridMovementPreview.cs` owns the isolated sample adapter, maps, rendering and interaction/pause handling. `src/GridMovementChecks.cs` supplies deterministic checks. `src/Town.cs` integrates the controller with town/interior interactions, arrival cells and release gates.

`src/TownLayout.cs` holds dimensions, connected paths, plaza, spawns, door approaches and prop placements/collisions. `TownProp.DrawScale` and `TownProp.Solid` share the 0.75 multiplier. `src/TownPresentation.cs` draws props/houses, `src/TownTerrain.cs` draws paths/plaza, and `src/Main.cs` provides scale captures.

Tiled authoring/import is future work, not a completed dependency of the existing town integration. The intended contract is a finite orthogonal 16-unit grid with separate Ground/Paths, Scenery, Collision, Doors, Spawns and NPC layers. Cell (x,y) has foot anchor `mapOrigin + ((x + 0.5), (y + 0.5)) * cellSize`. Doors need IDs, interaction cells, destination maps/spawn IDs; spawns need names and facing. Document exact properties/types before authoring. Keep maps, external tilesets and PNGs together with relative paths. Current generated art is not a uniform validated tileset; consistent-scale terrain/props and seam cleanup remain separate work.

### Launch, evidence and remaining work

The recorded Godot launch paths are `PlayMovementPrototype.cmd`, `./tools/Play.ps1 -GridMovement`, or `scenes/GridMovementPreview.tscn` with F6 after building. `Play Hockey Heroes.cmd` launches the integrated game. Sample controls: WASD/arrows walk, E interact, Esc pause, G grid overlay, R reset. The geometric test course includes walls, corners, a one-cell opening, Eli and a cabin door/exit.

The October 25 reports record successful C# builds, grid checks at 15/30/60/144 Hz and long frames, collision/input/spawn/interaction tests, town/hockey smoke checks, progression checks and visual captures. Scale checks include camera bounds/pixel alignment, routes to doors/NPC/practice, input gating, interiors and a flood-fill restricted to painted paths/plaza. These are historical reports; no build, gameplay test or fresh screenshot was run for this consolidation.

Reproduction flags and complete evidence are retained below, including `--grid-tests`, `--smoke-test` and `--capture-town-scale`. Capture mode does not write career saves. Career save format and hockey skating are reported unchanged. Remaining work includes Tiled integration, larger actor footprints, map expansion, art seams/final town art/interior furnishing, and validation of any Unreal port. Overworld practice artwork does not replace the hockey match simulation.

## Complete source context

All three source documents follow in full. Headings are nested and links between included documents point to their sections within this file. Other relative links retain their source paths and have not been verified. Original files remain unchanged.

- [Movement plan and integration status](#source-1)
- [Prototype controls and verification](#source-2)
- [Environment scale, layout and captures](#source-3)

---

<a id="source-1"></a>
## Source 1: OVERWORLD_MOVEMENT_PLAN.md

### Overworld tile movement plan

Status: user-approved prototype integrated into the playable town and interiors on October 25, 2026. See [prototype controls and testing](#source-2). The isolated movement test course remains available.

#### Direction and interpretation

The requested direction is linear tile movement for town exploration and building interiors, inspired by the overworld feel of Mario Tennis and Mario Golf on Game Boy Advance.

The approved interpretation is four-direction, grid-aligned movement with smooth travel between adjacent tile centers. This is a Hockey Heroes design; exact movement behavior in the reference games has not been verified. The user reviewed and approved the playable sample's four-direction travel, full-tile stops and timing before main-game integration. The proposed-rule sections below record that sample's original specification.

#### Proposed movement rules

- Use a logical grid with a provisional cell size of 16 × 16 world units. Artwork may cover several cells and does not determine collision size. Confirm scale against the current character and environment art before converting the town.
- Track the player's current cell, destination cell, facing and step progress separately from the rendered foot position.
- A fresh direction press requests one adjacent cell. A short tap completes one step. Holding a direction chains steps without a pause at each center; releasing finishes the active step and stops at its destination.
- Allow north, south, east and west. For simultaneous directions, the most recently pressed direction wins; exact ties retain the current direction when possible, otherwise use a fixed documented priority. Ignore an axis whose opposite directions are both held.
- Resolve turns and reversals at cell centers. Retain only the latest held direction while moving, so tapping several directions cannot queue a long route. On arrival, use that held direction or stop if none remains held.
- Start with a constant-speed step lasting approximately 0.18 seconds: 16 units at the current 88 units/second walking speed. Tune for responsiveness after playtesting; no acceleration, inertia or running is proposed for this first feature.
- Check the destination and required character footprint before starting a step. Blocked movement keeps the player in place but updates facing. Do not slide along walls or cut diagonally through corners.
- Animate from actual travel and facing. Use the feet as the placement anchor and draw order reference. Keep logical/interpolated coordinates precise; apply pixel rounding only for display if needed.

#### Interaction and interruptions

- Interact targets the adjacent cell in the facing direction. Doors and NPCs expose explicit interaction cells; large objects can expose several. Keep the existing E control.
- If E is pressed during a step, retain one interaction request until arrival, then resolve it once using the arrival position and facing. A dialogue or transition consumes it and clears pending movement.
- Pause freezes the step in place. Resuming continues it. Dialogue and activity prompts prevent new movement; closing them requires a fresh direction press to restart walking.
- Door entry, exit and activity return use explicitly authored walkable spawn cells and facing. Reset any active step and pending interaction on transition. Reject blocked spawn definitions during validation; do not silently place the player inside scenery.
- Keep the existing press-to-enter/leave behavior. NPC wandering, companion following and automatic door triggers are outside this first change.

#### Tiled authoring contract

Use a finite orthogonal map for the initial sample, with the provisional 16 × 16 grid. Keep these layers distinct:

| Layer | Purpose |
|---|---|
| Ground / Paths | Visual terrain |
| Scenery | Trees, benches, buildings and other artwork; may extend across cells |
| Collision | Explicit blocked cells, independent of artwork transparency |
| Doors | Objects with an ID, interaction cell, destination map and destination spawn ID |
| Spawns | Named objects aligned to cell centers, with facing |
| NPCs | Named actors with occupied and interaction cells |

Define cell `(x, y)` as a top-left map index; its world-space foot anchor is `mapOrigin + ((x + 0.5), (y + 0.5)) * cellSize`. Snap marker objects to those centers. Document property names and types in the starter map before manual town authoring begins. Keep the map, external tilesets and PNGs together using relative paths.

The current generated art is not a uniform tileset, and path seams are not validated. Prepare consistent-scale props and terrain separately before relying on a full map layout. Tiled import/conversion is a distinct integration task; this plan does not assume an importer already exists.

#### Implementation sequence

1. Build an isolated movement sample with a short path, corner, one-cell passage, obstacle, NPC and door. Keep the existing town available while reviewing movement feel.
2. Implement a modular grid movement controller and a small map/collision interface. Keep keyboard input, map data, rendering and interactions separate. Test step completion, direction arbitration and collision before integration.
3. Review the sample to settle full-tile stopping, direction handling, scale and speed. Confirm the core movement rules before changing the active town.
4. Prepare the Tiled starter map and validate its cell/property contract. Convert the existing town and interiors, including every door, spawn and activity return location.
5. Integrate animation, draw order, dialogue, pause and transitions. Run overworld checks and a hockey smoke test.

Hockey skating and hockey-based mini-game movement keep their own controllers. Implement this overworld feature before adding sprinting, moving NPCs or pathfinding.

#### Acceptance checks

- One tap moves exactly one cell; holding crosses many cells at a stable speed and stops on a center after release.
- Turns and reversals occur at centers, with deterministic results for simultaneous, opposite and rapidly changing inputs.
- Results agree across different frame rates, including frames long enough to span multiple steps; no overshoot or skipped collision checks.
- Walls, map edges and occupied cells block entry; one-cell passages remain traversable with the approved footprint.
- Animation faces correctly when blocked, idling, turning and walking behind scenery.
- Pause preserves step progress; dialogue consumes interaction once and cannot leak movement or door input.
- Every building and activity can be entered and exited repeatedly at valid spawn cells, with no stale queued input.
- A Tiled-authored sample preserves cell positions, collisions, interaction markers and spawn facing after conversion into Godot.

#### Current implementation

`src/Town.cs` now uses the same `GridWalker` as the approved `GridMovementPreview` scene, with grid-aligned walking, explicit door/arrival cells, facing-based interactions and input release gates. The main scene queues E interactions until arrival and freezes movement for pause and menus. Existing art keeps its authored placement; Eli and interior residents use grid-aligned foot anchors. Town integration and automated grid/game-flow checks are complete. Tiled authoring/import, larger actor footprints and future map expansion remain future work. The implementation sequence above records the original rollout plan.

---

<a id="source-2"></a>
## Source 2: OVERWORLD_MOVEMENT_PROTOTYPE.md

### Tile movement testing prototype

Double-click `PlayMovementPrototype.cmd` in the repository root. It builds the C# project, refreshes Godot imports and opens the isolated movement scene. It uses the same Godot .NET installation discovery as the normal game launcher. Alternatively, run `./tools/Play.ps1 -GridMovement` in PowerShell, or open `scenes/GridMovementPreview.tscn` in Godot and press F6 after building.

The approved controller is now integrated into the normal playable game's town and interiors. Launch the main game with `Play Hockey Heroes.cmd` to use it. Career save format and hockey skating are unchanged. This separate sample still uses geometric test scenery and the existing casual walking character; it is not a finished town or a Tiled importer.

#### Controls and course

| Control | Action |
|---|---|
| WASD / arrows | Walk; latest newly held direction takes priority |
| E | Talk / enter / leave / close dialogue |
| Esc | Freeze or resume, including midway through a step |
| G | Toggle grid and destination-cell outline |
| R | Return to courtyard spawn and clear pause/dialogue |

The yellow tile at the upper right is the cabin door: stand below it, face up and press E. Inside, the yellow exit is below the arrival position: face down and press E. Eli is the red marker. Stand next to him and face him to talk. The center wall has a one-cell opening; the square and horizontal wall provide corners to test.

Try these checks when judging the feel:

1. Tap a direction and release quickly. One full 16-unit step should complete. Hold it for a continuous walk, then release to stop at the next center.
2. Change direction or reverse midway through a step. The active step finishes before the new held direction takes effect. A direction released before arrival does not queue a turn.
3. Hold two directions, then release the newer one. The older held direction resumes at a center. Opposing keys cancel their axis.
4. Walk against walls and through the center opening. Blocked input changes facing without moving or sliding.
5. Press E as you approach Eli or the door. One interaction resolves at arrival before another movement step starts.
6. Enter and leave the cabin repeatedly. Close dialogue while holding a direction: release movement keys, then press again to resume. Transitions and reset use that same release gate to avoid stale input.
7. Pause halfway through a step, wait and resume. The character should continue the unfinished step.

Initial speed is 88 world units per second: a 16-unit step takes about 0.182 seconds. Full-tile stops, direction arbitration, character scale and speed are the main review points before integrating the town.

#### Structure and verification

- `src/GridWalker.cs`: map-independent cell stepping and direction selection; maps supply a destination-cell collision query. A cell is the prototype's logical foot footprint; larger actor footprints remain future integration work.
- `src/GridMovementPreview.cs`: sample maps, input, interaction adapter, rendering and pause/dialogue handling.
- `src/GridMovementChecks.cs`: deterministic movement checks, invoked with `--grid-tests` after the Godot command-line `--` separator when running this scene. The scene also checks its actual door/NPC adapter and map data.

Validated October 25, 2026: C# build with zero warnings/errors; headless grid checks at 15/30/60/144 Hz, long-frame collision, taps, turns, reversals, spawn rejection and interaction consumption; preview NPC/door/return/pause checks; existing town/hockey smoke suite. The rendered scene was captured and visually inspected. Manual feel review remains for the player.

---

<a id="source-3"></a>
## Source 3: OVERWORLD_SCALE.md

### Overworld environment scale — October 25, 2026

The latest requested adjustment uses the midpoint between the full-size proportion pass and the half-size pass: scenery is 75% of the earlier full size, or 1.5 times the half-size version. Character, rink and arena sprites retain their existing sizes. Paths use midpoint widths and connected spans. The source PNGs are preserved; this is an in-game rendering/layout change.

#### Dimensions and behavior

- `TownLayout.VenueScale`: 2.5 relative to the original compact venue presentation; small scenery uses its own scales.
- `TownLayout.SceneryScale`: 0.75 for small prop rendering, local collision footprints, house details, path edges and paving details.
- Town map: 1600 × 900 world units, with a 640 × 287 exploration view between the existing HUD bars.
- Official arena sprite: domed v2 exterior, 576 × 384 world units (source scale 0.375). Its source door threshold (768,840) aligns to the same grid approach. See [dome art and validation](../assets/art/official_arena/README.md).
- Practice venue: 370 × 555 world units (previously 148 × 222).
- Ground patches: 72 × 72 world units (midpoint between 48 and 96).
- Snowy paths: 60 units across, with 42-unit walking surfaces (midpoint between 40/28 and 80/56). Snow edges and stone texture repeats use the same 0.75 scale. Branches connect every house, venue and the square; floor fills open the junctions.
- Town square: 180 × 132 (midpoint between 120 × 88 and 240 × 176), with statue and east-facing bench positions interpolated to fit. Connecting paths meet its boundaries.
- Trees: large canvas approximately 81 × 98; small approximately 60 × 78. Benches: approximately 59 × 40 (south) and 28 × 51 (east). Statue: approximately 77 × 73, including padding and pedestal. Rocks: approximately 53 × 46. Each is exactly 0.75 times the full-size proportion pass before rounding.
- Placeholder houses: 156 × 108, with 18 × 30 doors, 21 × 21 windows and 42-unit roof bands. Houses resize around their door thresholds, preserving interaction cells.
- Male/female characters retain source scale 0.125. Grid cells remain 16 units and walking speed remains 88 units/second.

The camera translates the entire exterior, including characters, together. It rounds to whole pixels and clamps at the map edges. The HUD and building interiors keep their existing coordinates. Larger buildings can extend beyond a single viewport; walk around town to explore them. Ground anchors still determine drawing order.

`src/TownLayout.cs` holds the shared dimensions, connected path rectangles, square, safe spawn, door approaches and foot-relative prop placements/collisions. `TownProp.DrawScale` and `TownProp.Solid` apply the same 0.75 multiplier to art and footprint dimensions. `src/TownPresentation.cs` draws sized props and houses; `src/TownTerrain.cs` draws connected paths and the paved square. Eli remains beside the north–south path. Canopies remain depth sorted. `src/Main.cs` supplies the scale-capture mode.

#### Checks and previews

- `dotnet build`: no warnings or errors.
- `dotnet run --project tests/ProgressionTests.csproj`: passes.
- Godot .NET 4.7.2 `--headless --path . -- --smoke-test`: passes camera/map bounds, pixel alignment, frame-rate-independent walking, all reachable doors/NPC/practice routes, queued interactions, interior entry/exit, input gating, pause/stats, asset loading, match and progression regressions. A flood-fill restricted to the painted path floors and plaza proves every door, practice entrance and plaza visit cell is reachable without crossing off-path snow.
- `--path . -- --capture-town-scale`: captures male/female arena approaches, practice entrance, all three houses, male/female square views, trees and a full map without writing career saves. Rendered views were inspected for proportions, entry alignment and depth sorting.

Current screenshots: [full map](screenshots/town-median-overview.png), [square](screenshots/town-median-square.png), [female character in square](screenshots/town-median-female-square.png), [home](screenshots/town-median-home.png), [trees](screenshots/town-median-trees.png), [practice entrance](screenshots/town-median-practice.png). Earlier `town-scale-*`, `town-proportions-*` and `town-half-size-*` images record the preceding passes.

Source art seam cleanup, final town art and interior furnishing improvements remain separate work. Practice is still entered through E; the overworld rink artwork does not replace the hockey match simulation.
