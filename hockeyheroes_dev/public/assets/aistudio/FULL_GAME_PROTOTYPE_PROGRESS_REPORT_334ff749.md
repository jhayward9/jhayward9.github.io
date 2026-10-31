# Hockey Heroes — Full-game prototype progress

Updated October 29, 2026 (UTC). [Report index](PROGRESS_REPORT_CONTEXT.md) · [Exhibition prototype](EXHIBITION_PROGRESS_REPORT.md) · [Full game](FULL_GAME_PROGRESS_REPORT.md).

## Confirmed boundary

Build the functional Story/RPG prototype with exactly **two playable cities**:

- **Frontier**, in the province of **Normund**.
- **Superior**, in the province of **Hisery**.

Normund and Hisery are provinces, not additional playable cities. No explorable Riversdale, Bearclaw, Marmalade, Petryl or Van Isles map is a prerequisite. Away opponents/competitions may be represented through menus, dialogue or the shared rink without creating another explorable city; their fixture/travel rules still need definition.

**No audio/music/SFX production, playback, collection playback or audio settings is required for this prototype.** A proposed record shop or collectible-music system belongs to the full game; at most use a clearly limited text/location placeholder if a prototype scene needs it. No audio task counts against prototype completion.

Use representative functional RPG systems and reusable/simple presentation rather than the complete production catalogue. This scope does not mean removing RPG, story, item or ability work from the complete game. Exact prototype campaign duration, minimum Specials/mini games and location/interior roster still need their planning gates: the earlier suggested full two-year playthrough was a proposal, not automatically approved by the two-city instruction.

## Progress and percentages

Percentages measure the stated checkpoints. Prototype acceptance is distinct from reusable baseline systems and source delivery; no aggregate game percentage is inferred from these overlapping rows.

| List | Completed | Percentage | Scope |
|---|---:|---:|---|
| Reusable overworld movement/function baseline | 7/9 | **77.8%** | Movement, collision, doors, dialogue, returns, camera and menu gates exist; runtime Tiled import and final story-map expansion pending |
| Two required cities playable as the new story | 0/2 | **0%** | Current Cedarbrook map is not yet an accepted Frontier map; Superior is not implemented |
| Existing overworld art checkpoints | 3/11 | **27.3%** | Protagonists, winter scenery and venue landmarks available/in use; eight remaining groups below |
| Customization/economy original planned tickets | 2/60 | **3.3%** | CE-01/02; CE-03 next; minimal prototype catalogue still needs acceptance and no skipped ticket is credited |
| Modular appearance runtime | 0/4 | **0%** | Resolver, free picker, saved cross-mode identity, later paid editing |
| Wallet/store/equipment runtime | 0/4 | **0%** | Wallet/earnings, persisted transactions, shop access/UI, loadout/modifiers |
| Bedroom customization | 0/4 | **0%** | Ownership, editor, collision/exit safety, persistent rendering |
| Food/drink runtime | 0/4 | **0%** | Catalogue/rules, inventory/shop, use, effect lifecycle |
| Dedicated mini-game delivery | 0/4 | **0%** | Guide/specification, first activity, rewards/state, retry/return validation |
| Story/calendar prototype implementation | 0/4 | **0%** | New setup/cast identity, chapter/scenes, fixtures/calendar, ending/post-story behavior |
| Existing three-slot saves | 7/7 | **100%** | Existing slot baseline only; future fields not included |
| New Story/RPG save extensions | 0/4 | **0%** | Appearance/economy, inventory/room/boosts, named cast/story, calendar/events |
| Existing RPG progression | 4/4 | **100%** | XP, cap, allocation/decay and persistence baseline; pending stat/modifier rules excluded |
| Shared controls acceptance | 4/8 | **50%** | Software groundwork complete; hardware/playthrough/glyph/accessibility gates open |
| Prototype release-to-review gates | 0/8 | **0%** | Eight final acceptance gates below; partly working baseline receives no whole-gate credit |

The shared hockey implementation is tracked at **13/100** in the Exhibition report; reuse validated behavior without implementing a second hockey engine. Missing Exhibition functions block only the Story features that depend on them. Final platform certifications and all-city production polish do not gate this prototype.

## Already usable groundwork

- [x] Grid-based walking, collisions, building/room entry, dialogue, practice/league entry and safe returns.
- [x] Three independent Story careers with creation, continue, confirmed deletion, legacy import, backups and load/save errors.
- [x] Level/XP/growth-point/stat allocation and persisted current career results.
- [x] Shared match, menus, controls/settings foundation and reusable UI/arena/scenery art.

The runtime remains a **12-year-old Cedarbrook/Cedar Comets** slice. It does not yet implement the **14-year-old Frontier/CEHA** story, Superior, pet/role setup or player-named friend/cousin. Existing Mom/Maya/Finn/Eli/Coach appearances are not final approved new-cast assignments.

## Functional prototype task list

- [ ] FP-01: lock a small playable chapter/campaign boundary and explicit minimum acceptance for captain/goalie paths; retain only Frontier/Superior exploration.
- [ ] FP-02: resolve fixture/team/tournament/time policies before scheduler implementation; preserve approved Cash/activity durations unless superseded.
- [ ] FP-03: version per-slot data and migrate old careers without erasing progression; include named cast, role/pet/profile, event IDs and required RPG fields.
- [ ] FP-04: new-save setup for player, best friend and cousin names, player identity/appearance, role and pet as defined in story context.
- [ ] FP-05: author playable Frontier routes and required interiors using current grid/collision system; replace old location text and map roles deliberately.
- [ ] FP-06: implement a bounded Superior destination, school/rival/match access and travel/return flow; specify which interiors are needed before commissioning all buildings.
- [ ] FP-07: minimal invitation/home/Brennan/academy tour scenes plus a defined story milestone/ending path; support loss/nonqualification outcomes.
- [ ] FP-08: define the minimal Battle Creek/plates/museum thread and initial Special demonstration; gameplay effect/charge/control approval remains required.
- [ ] FP-09: deliver the free modular creator, saved identity and paid-edit sample flow with supplied layers.
- [ ] FP-10: wallet/reward replay protection, atomic purchases and small approved equipment catalogue/loadout; modifiers must be actor-aware.
- [ ] FP-11: small accepted bedroom-decoration set with placement/store/move and safe exits.
- [ ] FP-12: small food/drink set with approved temporary effect, consumption/expiry and reload/abandonment rules.
- [ ] FP-13: first specified classroom/training mini game and captain/goalie instruction; local-rink 1v1 only after its rules are settled.
- [ ] FP-14: minimum calendar, competition/results/standings, award/unlock and post-story behavior required by the agreed campaign slice.
- [ ] FP-15: consistent prototype title/setup/slots/dialogue/stats/shop/editor/results/quit/error controls and readable text. No final soundtrack or production cutscene score required.
- [ ] FP-16: finish all eight acceptance gates below and record remaining limitations explicitly.

These are work packages, **not sixteen one-hour tickets**. Preserve CE-01–60 and split new map/story/calendar packages into estimated one-hour tickets after the dependent decisions. Do not silently squeeze the two-year scheduler into CE-26.

## Missing assets / reusable packs

Eight outstanding overworld production/integration groups:

- [ ] Seamless snow/paving/path junctions/plaza/thresholds.
- [ ] Modular walls/floors/corners/doors and occlusion pieces.
- [ ] Home and required friend/cousin/interior staging using existing houses/furniture.
- [ ] Distinct required cast sprites: protagonist/friend/cousin, parents, Brennan, museum contact and essential academy/Superior staff as their roles are specified.
- [ ] Location signs and clear Frontier/Superior wayfinding.
- [ ] Consistent scale, palette, pivots, transparency and sorting acceptance.
- [ ] Modular character layers and supported decoration anchors/footprints.
- [ ] Required map-authoring/runtime integration; Tiled is future work, not assumed working.

Existing town/winter/house/arena/practice/gym/locker/civic/stairs/window packs should be reused. Superior's distinct minimum scenery/layout and academy/museum/ruins/shop dressing need a destination-by-destination audit; their exact quantities are not yet established. Do not request production art for every future city.

Customization asset needs: layered front-idle/side-walk technical sample at **CE-13**, then body/skin, front/back hair, face, casual clothing/shoes and hockey-identity animation coverage. Four design sheets and 44 flattened hockey action sheets do not satisfy those interchangeable layers. User supplies art; preserve originals. See [precise delivery checklist](CUSTOMIZATION_ART_ASSETS_REQUIRED.md).

Small catalogue icons/thumbnails await approved equipment, decoration and food/drink entries. Existing furniture/shared UI are reusable. Optional portraits/reaction symbols/final branding may remain placeholders unless the chosen prototype scene requires them. **No audio assets are missing from this prototype scope.**

## Required / incomplete art deliveries — prototype

Status meanings: **missing production form** = required usable delivery does not exist yet; **reuse / integrate** = source assets exist but are not accepted in the destination; **define first** = quantity/content depends on an unresolved scene, catalogue or mechanic. The rows list unfinished work and do not count as completed assets merely because they are documented. Existing 3/11 overworld and other system percentages remain unchanged.

| ID | Required asset set | Current status | Concrete delivery / acceptance needed |
|---|---|---|---|
| FP-A01 | Frontier terrain/path kit | Reuse / incomplete | Snow, paving, turns/T-junctions/crossings/edges, square and door thresholds; seam/scale review at the current movement grid |
| FP-A02 | Superior city identity | Define first / incomplete | Bounded town layout, distinctive landmark/exterior/sign palette and only required interiors; no third-city pack |
| FP-A03 | Home / friend / cousin homes | Reuse / integrate | Stage suitable existing exteriors and furniture with working entrances, feet sorting and required room routes; no need to commission three replacement houses |
| FP-A04 | CEHA / arenas / school rooms | Reuse / define first | Existing arena/foyer/hallway/locker/gym/civic packs can supply minimum classroom, lobby and training compositions; new signs/architecture only for demonstrated gaps |
| FP-A05 | Museum / Academic Ruins / story props | Define first / incomplete | Minimum selected-scene ruin/plate displays, invitation and museum interaction props; placeholder staging acceptable until scope locked |
| FP-A06 | Named cast / family / pet | Missing production form | Distinct friend/cousin, parents, Brennan and essential museum/academy/Superior cast; chosen dog/cat and any needed poses after role/scene scope is set |
| FP-A07 | Interior construction / foreground pieces | Reuse / incomplete | Floors, walls/corners/partitions, doors, foreground/occlusion slices; assembled paths and exits remain usable |
| FP-A08 | Modular protagonist layers | Missing production form | CE-13 layered front-idle and side-walk sample first; then body/skin, hair/face, shirt/bottoms/shoes, masks, four-direction animation and shared anchors |
| FP-A09 | Hockey identity / role coverage | Source sheets supplied; integration incomplete | 44 flattened action sheets are present; prepare current clips and customized skin/face/hair under team uniforms/helmets; player-goalie coverage only after role behavior is specified |
| FP-A10 | Minimal equipment / food / decoration presentation | Define first / reuse | Icons for approved sample catalogue; furniture-derived thumbnails, footprints, anchors and accepted orientations. Text can carry early functional shop reviews |
| FP-A11 | First training / Special demonstration visuals | Define first / incomplete | Targets/checkpoints/hazards and clear/fail/ability feedback only for the agreed activity and approved mechanics; procedural placeholders can demonstrate behavior |
| FP-A12 | Location / interaction / travel markers | Incomplete | Frontier/Superior signs and arrival labels, door/activity prompts and minimum travel/return cues; do not require a full world-map painting |

No prototype audio assets, collectible-music cover art/player skin, store promotional graphics, final cutscene illustrations or platform-specific release art are required. The supplied LochLAN logo can be reused if splash is included; final branding remains full-game work. Final portraits are optional for this prototype unless a scene cannot communicate its participants otherwise.

## Required / incomplete UI and UX assets — prototype

The existing UI kit already supplies fonts, panels, buttons, cursor/icons and generic input badges. **Reuse it; do not request another entire kit.** Layouts, focus/hit regions, data bindings and error states are runtime/UI work. Each row below identifies both visual composition and behavior still needed for the functional prototype.

| ID | Screen / component | Current status | Required composition and interaction |
|---|---|---|---|
| FP-U01 | Title / mode selection / prototype controls | Functional base exists | Consistent kit treatment and selected/disabled/focus states; clear two modes plus utility access, no audio menu requirement |
| FP-U02 | Three Story slots / save management | Functional base exists | Readable slot cards, actual saved-field summaries, empty/occupied/unreadable states, named delete confirmation and save-failure/recovery feedback; do not invent stored playtime |
| FP-U03 | New Story setup / review | Incomplete | Player/friend/cousin name entry, gender/role/pet choices as specified, live appearance preview, options/palettes, Confirm/Back and selected-slot summary |
| FP-U04 | Appearance picker / later paid editing | Not implemented | Layer/palette controls, four-direction preview, draft/confirm/cancel; later price/current/resulting balance, insufficient funds, unchanged choice and failed-save states |
| FP-U05 | Overworld / location / dialogue | Functional base; new story content incomplete | Frontier/Superior labels, clear Interact prompt, speaker/name/choice/advance states and dynamic names; text fits and closing restores input safely |
| FP-U06 | Story pause / stats / help | Functional base; integration incomplete | Identity/role/XP/growth-point display, stat gain/loss previews, actual binding prompts and save/return/quit confirmation; no audio controls |
| FP-U07 | Match briefing / HUD / results | Shared base exists | Mode-specific objective/ready screen, selected player and role guidance, Story XP/earned rewards, safe return and clear loss/quit outcome; rink scoreboard is already integrated |
| FP-U08 | Shop / equipment / inventory | Not implemented | Row/icon slots, price/balance, owned/equipped state, effect comparison and purchase/use/cancel/error confirmations |
| FP-U09 | Bedroom editor | Not implemented | Owned/stored list, thumbnail, placement footprint/ghost, valid/invalid markers, move/store/confirm/cancel and door-route warning |
| FP-U10 | Consumable selection / active boost | Not implemented | Quantity/effect/lifetime, pre-match use confirmation, stacking/invalid-use explanations and expiry feedback once rules are approved |
| FP-U11 | Calendar / competition / travel / awards | Not implemented | Minimal appointment list, standings/results, qualification/locked reasons, chosen destination/return and achieved award display; text tables acceptable |
| FP-U12 | Training / Special onboarding | Not implemented | Briefing, controls, target/time/attempt counter, clear/fail, Retry/Return and approved unlock/resource states; no audio-only instructions |
| FP-U13 | Story scenes / ending / continuation | Incomplete | Simple scene dialogue/caption layouts, safe input gating/advance and unambiguous completion/post-story actions for the agreed slice |
| FP-U14 | Shared errors / transitions / controller access | Partial | Saving/loading/error/retry, abandon/quit/disconnect, keyboard/controller focus, long-name wrapping, contrast and non-color cues; transition art can be code-native |

Prototype UI acceptance is functional readability/navigation, not a unique painted screen for every row. Preserve pending content/mechanic gates. Use [screen inventory](UI_UX_SCREEN_INVENTORY.md), [UI-kit import guide](../assets/ui/shared/README.md), [customization art contract](CUSTOMIZATION_ART_ASSETS_REQUIRED.md) and [overworld asset backlog](RPG_OVERWORLD_ART_BACKLOG.md).

**Suggested first deliveries:** CE-13 character sample; Frontier terrain/interior gap samples; distinct opening cast; a Superior exterior/signage sample after its map role is defined. In parallel, wireframe setup/creator → dialogue → shop → room editor using the existing UI kit. Final catalogue icons follow approved item lists.

## Decisions still needed

The current [story planning record](STORY_LORE_PROTOTYPE_AND_FULL_GAME_TASKS.md) resolves earlier capital confusion: **Superior is Camarad's national capital in Hisery, not Hisery's provincial capital**. It also supplies CEHA, Brennan, parents/pet/roles and the opening. Older combined-report ambiguity is historical.

Open gates include 32-team versus 16-team grouping, regional-every-two-months versus twice-yearly provincial competition, year-end/national overlap, national top-eight eligibility/tie-breaks, Superior standings distribution, day/hour/missed-event policies, shop access, initial catalogue/effects, personality profiles, Special controls/unlocks, local-rink shootout/draw rewards, and the minimum ending/post-story behavior. The prototype's city/audio boundary is now confirmed; these unresolved mechanics are not decided by this report split.

## Final prototype acceptance — 0/8 complete

- [ ] FP-G1: create/reload three independent careers with the required new names/identity/role and no unintended overwrites.
- [ ] FP-G2: explore functional Frontier and its chosen interiors, with accessible story/activity/shop routes.
- [ ] FP-G3: travel to functional Superior and return safely; no third playable city needed.
- [ ] FP-G4: play the agreed story/competition slice through its defined completion and continuation outcome.
- [ ] FP-G5: demonstrate supported appearance, Cash/purchase/equipment, bedroom and consumable loops without debug grants.
- [ ] FP-G6: demonstrate agreed training/Special/role behaviors and durable unlocks without inventing unapproved mechanics.
- [ ] FP-G7: pass save/recovery/reward-once, shared hockey/town regression and keyboard/controller/input/readability checks.
- [ ] FP-G8: review build plus human end-to-end playthrough and documented limitations. **Audio and other-city exploration excluded.**

## Evidence / update log

Source baseline `9e4a7d2` plus existing working tree. Six-suite success at **16:12:32–16:12:33 UTC** is prior shared-prototype evidence, not proof of new maps/campaign/RPG completion. No new engine tests or screenshots were run for this documentation split.

| Date | Update |
|---|---|
| 2026-10-29 | Created separate two-city full-game prototype report; excluded audio and other playable cities; preserved existing system/sprint completion and defined eight open final gates |
| 2026-10-29 | Added explicit FP-A01–12 art-delivery and FP-U01–14 UI/UX matrices, separating existing reusable sources, unfinished integration and undefined content. Scope remains Frontier/Superior with no audio; percentages unchanged because no implementation/delivery completed |
