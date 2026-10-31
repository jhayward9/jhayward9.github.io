# Finished assets in the playable prototype — October 25, 2026

This connects the assets already created to the running game. Source PNGs, measured atlas resources and the standalone skating preview are preserved. Missing art intentionally keeps its placeholder; this is a mixed-art prototype.

## Active assets

| Asset | Live use |
|---|---|
| Male/female casual sheets | Career character walking/idle in town and interiors, plus reused NPC idle characters |
| Male hockey cardinal/diagonal/crossover set | Male skaters, including the rookie when using the male appearance; eight-direction skating, glide, turn selection and small diagonal foot bank |
| Female hockey sheet | Female rookie and home wings; four-direction skate and idle clips, since no female diagonal/crossover extension exists |
| Winter town atlas | Snow ground, paths, trees, rocks, benches and hockey statue |
| Outdoor rink venue | Town practice destination, with its baked stands, boards, nets and entrance |
| Official arena exterior | Domed v2 league/championship building, with its preserved threshold aligned to the existing enter-building interaction |

Character textures use the measured `SpriteFrames` instead of equal grid slices. V1 resources draw at 0.125 scale around (176,327); the curved set uses (192,353). `CharacterArt.cs` adapts the authored clip selection and unequal duration weights to C# rendering. Motion/turn input comes from the existing simulation, not a second movement controller. Phase survives direction changes and clip timing freezes with menus/pause.

Finished hockey sprites already include sticks, so their locomotion rendering suppresses the old procedural stick. Blue/orange ground rings preserve team identification while both teams reuse the available red uniform. Original goalie, shot/pass/check, fall and celebration poses remain fallback artwork; finished movement sprites resume after the action ends. There are no finished action-specific replacements yet. The baked sprite blade positions are approximate relative to the existing physical release anchors and need a future art/contact alignment pass.

Town scenery occupies a 1600×900 scrolling map. The latest adjustment uses the midpoint between the full-size and half-size passes for small props, ground details, path widths, square and placeholder houses, keeping character, practice-rink and arena sizes intact. Rendering and local prop collision dimensions share `TownLayout.SceneryScale = 0.75`. Paths remain connected to preserved door cells and practice access; Eli is beside the path. The arena door remains source (768,840) at 0.375 scale. The practice venue remains scenery entered with E. Props retain foot sorting; interiors retain their fixed view. Houses and interior furniture remain placeholders. See [overworld scale](OVERWORLD_SCALE.md) for dimensions, renders and validation.

## Physics status

Existing momentum, coasting/reversal, continuous puck contacts, rink boards/posts/nets, goal scoring, periods, endurance/bench shifts, RPG allocation and saves remain active. No completed standalone physics asset was waiting to be loaded. `docs/TAPE_TO_TAPE_GAMEPLAY_PLAN.md` explicitly describes proposed work, so no puck-height system, new turning model, projection or other proposed mechanic was inferred from it. Special Shot remains removed; Q remains inactive.

## Verification

- C# build: zero warnings/errors.
- Finished-resource checks: all five character resources load, expected clip counts and canvas sizes, atlas rectangles within source textures, eight direction choices, authored push/recovery timing, crossover and glide selection, pause and placeholder dispatch.
- Scenery resources load; a flood-fill verifies safe access to every building, NPC and practice entrance. Entry/exit checks cover all four buildings.
- Existing match simulation, Q-inactive/normal-shooting, progression/allocation, endurance and save migration/serialization checks pass.
- Game renders inspected for male/female town characters, arena approach, interior NPC/player, male crossover, female hockey and action fallback. `--capture-finished-assets` reproduces these without saving career progress.

Documentation screenshots are excluded from Godot's import scan by `.gdignore`: a pre-existing preview capture has a PNG filename but invalid PNG contents. It is preserved as supplied and is not a runtime resource. Gameplay PNGs import/load successfully.

Remaining work is art consistency, character-specific NPCs, production action/goalie sheets, female diagonals/crossovers, blade-contact cleanup, final map scale/tile seams and the separately planned hockey refinements.
