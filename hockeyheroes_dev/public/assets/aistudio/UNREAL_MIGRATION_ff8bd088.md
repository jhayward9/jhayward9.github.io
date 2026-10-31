# Unreal migration — October 26, 2026

**Current status:** The subsequent prototype rebuild implements all three playable entry points with individual launchers. See [Unreal prototypes](UNREAL_PROTOTYPES.md) and [runtime setup](../unreal/HockeyHeroes/README.md). The foundation scope and validation below describe the earlier milestone.

The user authorized an Unreal Engine project base first, followed by later ports of the complete prototype, tile movement engine prototype and hockey mode prototype. Unreal 5.8/C++ with Blueprint-facing engine types is the migration target. Godot/C# remains the working reference until parity is demonstrated. This changes the engine direction, not approved gameplay rules.

## Foundation scope

Project: `unreal/HockeyHeroes/HockeyHeroes.uproject`. Windows/scalable blank C++ foundation with Paper2D, Enhanced Input, a boot status HUD, four saved maps, organized content directories and a build/open launcher. No gameplay, asset conversion, career import, multiplayer or backend port is claimed here. Imported art will need nearest-neighbor texture settings and verified frame/anchor conversion; enabling Paper2D alone does not do this.

## Incremental ports

| Stage | Existing source | Unreal destination and parity checks |
|---|---|---|
| Tile movement | `src/GridWalker.cs`, `GridMovementPreview.cs`, `GridMovementChecks.cs` | Shared Movement code + `L_TileMovementPrototype`. Preserve 16-unit cells, 88 units/sec, full tap steps, held chaining, latest direction priority, opposite cancellation, center-only turns, collision and pause/resume. |
| Hockey mode | `src/HockeyMatch.cs`, `HockeyMotion.cs`, `HockeyRink.cs`, `HockeyCamera.cs`, `HockeyPose.cs`, `HockeyPrototype.cs`, presentation helpers and `tests/HockeyGameplayChecks.cs` | Shared Hockey code + `L_HockeyModePrototype`. Preserve current team/control model, movement, puck sweeps, passing/shooting/checking, goals, period direction changes, XP, pause/restart/rematch and session-only progression. |
| Full prototype | `src/Main.cs`, `Town.cs`, `TownLayout.cs`, `TownTerrain.cs`, `TownMovementChecks.cs`, presentation helpers, `Progression.cs`, `SaveStore.cs` | `L_FullPrototype` integrates shared movement and hockey, career creation, town/interiors, conversations, practice/league flow, stat allocation and persistence. Check exactly-once rewards and safe activity returns. |
| Presentation and assets | `assets/art`, source metadata, Godot animation resources, `tiled` | Import original PNGs with provenance; translate sprite regions, timings, feet anchors, sorting and camera behavior. Godot `.tres`/`.tscn` and Tiled files are not automatically Unreal assets. |

Use the existing test scenarios as specifications. Port and validate one feature at a time; do not implement Proposed/TBD mechanics simply because they appear in GAME_DESIGN.md. C# gameplay must be translated or adapted to C++; this is not a direct engine import. Godot ENet/RPC APIs also require later Unreal-specific architecture work.

Current hockey has three skaters and one goalie per team and fixed rookie control. Preserve it for initial parity. Broader NHL 94 baseline changes still need the decisions recorded in GAME_DESIGN.md. Do not restore Special Shot or endurance during migration.

Coordinate/unit mapping, sprite depth sorting, pixel-perfect camera output and the Unreal input asset layout must be established with the first playable port. Maintain source simulation constants by explicitly mapping units rather than silently retuning movement. Career save migration is a separate task: do not overwrite the existing Godot `career.json`.

## Foundation validation — October 26, 2026

- Unreal `HockeyHeroesEditor Win64 Development` C++ build: passed with `-NoUBA -MaxParallelActions=1`. The initial accelerator build exhausted Windows commit/pagefile capacity; the launcher uses the successful lower-memory settings.
- Unreal Python commandlet: created and reloaded all four maps; map checks reported zero errors and zero warnings; commandlet exit code 0.
- Headless `-game -NullRHI` startup: loaded `L_Bootstrap` with `HHFoundationGameMode`, then quit with exit code 0.
- Existing Godot `dotnet build HockeyHeroes.csproj --no-restore`: passed, zero warnings/errors.
- Existing `dotnet run --project tests/ProgressionTests.csproj --no-restore`: passed stats, allocation, XP, validation, migration and persistence checks.
- PowerShell launcher parsed successfully; changed tracked text files passed `git diff --check`.

The editor was launched with the new project. Windows screenshot capture timed out, so the foundation HUD has not been visually verified. Packaging and gameplay parity are future checks. Local engine validation logs are in `unreal/HockeyHeroes/Saved/Logs/foundation-map-creation.log` and `foundation-boot-check.log` (generated/ignored).
