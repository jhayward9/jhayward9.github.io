# Unreal prototype rebuild

The three Unreal maps now contain playable native C++ flows rather than foundation placeholders. See [launchers and controls](../unreal/HockeyHeroes/README.md).

## Manual inspection

1. Launch the tile movement prototype. Tap a direction and release: exactly one cell should finish. Hold to chain steps, turn at centers, test opposite keys and the narrow gap. Pause halfway through a step and resume. Talk to Eli, enter the cabin, and return through its yellow exit.
2. Launch hockey mode. Skate/coast/reverse, acquire the puck, aim by facing, shoot/pass/check and try the two Specials once the gauge fills. Test goal posts and behind-net play. Pause, view controls, cancel/restart with F5, finish three periods, then Play Again. XP stays in the session.
3. Launch the full prototype. Create a name/gender, walk to each house, speak to residents, and use home saving. Explore the stadium's seven rooms and return to the foyer. Start practice from the outdoor rink and league games with Coach. Abandon a match from Pause and verify the return location. Complete a match, allocate growth points with preview/apply/discard, then restart and Continue the saved career.

The port keeps the existing prototype defaults: 16-unit/88-unit-per-second grid movement; three skaters plus goalie on each side; fixed rookie control; momentum and 1.45x sprint; 3x60-second periods; alternating attack directions; existing pass/check Specials; level-50 progression and allocation decay. It does not resolve Proposed/TBD mechanics in GAME_DESIGN.md.

Unreal uses its own save. Importing Godot careers remains a separate migration task.

## Verification — October 27, 2026

- Unreal 5.8 Development Editor build succeeded.
- All three native automation suites passed: grid/town, hockey simulation, and career/prototype flows. Coverage includes stepping and collision, doors and rooms, momentum, puck reception, posts and nets, goals, a complete simulated three-period match, XP, stat allocation, save/load, pause, restart and career return locations.
- Six real Unreal game runs rendered successfully: movement, hockey, career title, town, stadium foyer and stats. Screenshots and logs are in `unreal/HockeyHeroes/Saved/Previews`. The final renderer loads textures on demand and logs missing-art checks at capture time.
- The movement launcher built and opened the game. A quick keyboard tap moved exactly one tile from (3, 9) to (4, 9); the input adapter now preserves presses released within the same frame. Pause was also checked in the running game.
- The original Godot C# build and progression tests passed after adding the offline art exporter.

These checks establish a playable rebuild; they do not replace the hands-on acceptance checklist above. Town and interior decoration is composed in the native renderer and is not a pixel-perfect copy of every source scene. The launchers use the installed engine and C++ build tools; packaged executables and Godot save migration are not included.

During final checks, a separate Unreal editor consumed about 7.8 GB and exhausted Windows' memory/pagefile limit. Closing that editor restored successful builds and game launches. Run one prototype at a time and close other Unreal projects before building or testing on this machine.
