# Current playable prototype — October 25, 2026

Launch with `Play Hockey Heroes.cmd` or `tools/Play.ps1`. The normal `scenes/Main.tscn` game includes the current arena, town layout and grid movement; the separate movement test course is optional.

## Included progress

- **Arena:** professional v3 crowd seating, HDPE boards, steel/polymer benches and officials' fixtures; retained v2 ice/mesh; rounded net artwork and simplified end-zone faceoff marks. Both side stands fit the 0.8-scale hockey view. See [professional arena refinement](PRO_ARENA_REFINEMENT.md).
- **Overworld:** 1600×900 winter town, enlarged environment around unchanged character sizes, pixel-aligned scrolling camera, aligned arena/practice approaches and scenery collision footprints. See [overworld scale](OVERWORLD_SCALE.md).
- **Movement/interactions:** shared GridWalker in town and interiors: four cardinal directions, 16-unit smooth steps, tap/hold walking and turns at centers. Face doors/NPCs and press E; walking interactions resolve at the next center. Pause freezes a step; menus and transitions require movement-key release before continuing.
- **Connected loop:** explore → enter arena and talk to Coach → league match → results/return; or practice entrance → practice → results/return. Abandoning a match also restores the originating town location. Practice wins do not count toward league qualification. The in-game controls page explains the new town input and how to reach the arena/practice rink from the square.
- Existing character locomotion, placeholder action/goalie poses, physics, RPG allocation and career persistence remain. Special Shot remains removed; Q is inactive.

These systems were already connected in the latest source revisions. This refresh rebuilt/imported them together, updated player instructions, expanded cross-mode checks to press actual menu buttons and verify activity returns/reward guards, and refreshed current-build captures. It does not replace the approved movement controller or introduce new hockey physics.

## Validation

`dotnet build`: zero warnings/errors. Godot 4.7.2 .NET asset import and headless smoke checks pass: movement at multiple frame rates, all town routes and facing interactions, pause/stats blocking, actual league/practice launch buttons, abandoned league return, completed practice return, input gates, single result rewards, current character/arena textures, collisions, scoring, periods and Q inactivity. Progression/allocation/save migration tests pass.

Smoke/capture modes now keep career writes in memory, so exercising real results and return-to-town buttons cannot overwrite the player's save. Normal game saves retain their existing behavior.

Rendered controls, enlarged arena/practice approaches, professional rink end zones and benches were inspected. Reproduce with `--capture-preview` (including controls), `--capture-town-scale`, or `--capture-arena` after the engine argument separator `--`.

Current-build captures: [arena](screenshots/current-prototype-arena.png), [overworld](screenshots/current-prototype-overworld.png), [controls](screenshots/current-prototype-controls.png).

Remaining limits: incomplete character action/goalie/environment art, simple AI, no full NHL 94 rule set, online play or exported Windows build. Human feel/balance review is still needed.

October 25 RPG update: five stats are Speed, Defense, Shoot, Pass and Special. Endurance and recovery shifts are removed. Campaign levels run from 1 to 50, earning 49 growth points. Spending a point adds 2 to the chosen stat and subtracts 0.125 from each other stat, clamped to 0–20. Four-stat builds approach the cap while an abandoned fifth decays to zero; all five cannot be maximized. New Defense/Pass/Special effects remain TBD. Schema 3 refunds old allocations and clamps earlier careers to level 50 on load; current allocations persist.
