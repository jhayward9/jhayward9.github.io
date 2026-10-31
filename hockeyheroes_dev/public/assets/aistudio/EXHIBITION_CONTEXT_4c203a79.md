# Hockey Heroes — Combined Exhibition Context

Consolidated October 28, 2026 from all ten Markdown documents in `docs/exhibition`.

## Consolidated handoff

Hockey Heroes is a 16-bit ice hockey RPG. Exhibition is the planned standalone, replayable hockey baseline for later reuse by career and other modes. The intended loop rewards skating into space, drawing defenders, passing to open teammates, one-timers and rebounds; defense rewards switching, lane coverage, positioning and committed checks.

### Which information takes precedence

- **Current Exhibition direction:** the October 28 Exhibition Mode plan and sprint backlog establish Tape to Tape-inspired gameplay using existing Hockey Heroes pixel graphics. This supersedes the earlier NHL 94-only direction for Exhibition. NHL 94 research remains historical reference; this consolidation does not change career design.
- **Implementation target:** Unreal Engine 5.8/C++ in `unreal/HockeyHeroes`. Godot/C# is the preserved prototype/regression reference. Earlier recommendations to implement in Godot or add a projected presentation are historical proposals, not instructions to replace the current Unreal renderer or rink perspective.
- **Recorded implementation status:** Sprint 01 is complete. Sprints 02–100 are not started in the supplied documents. The next task is Sprint 02: timestamped reference comparison and repeatable drills. The name Exhibition is the intended player-facing name; the baseline still uses older labels, with renaming scheduled for Sprint 05.
- **Presentation history:** arena redesign was followed by richer GBA-style materials and then professional fixture/net refinements. The professional pass supersedes wooden fixture finishes while retaining playable geometry. Historical captures and test reports describe their own revisions and engine, not necessarily the present Unreal build.
- **Evidence boundary:** the records below are preserved source reports. This consolidation does not rerun builds, inspect current gameplay implementation, certify linked assets, or turn proposals into completed features. Source wording such as “current” refers to the date and engine of that source.

### Recorded Unreal baseline

Sprint 01 records Unreal 5.8.4, a successful incremental Development Editor build, three successful automation suites, and a rendered DX11 1280×720 capture. It does not establish a clean rebuild, full human match, controller acceptance, audio acceptance or FPS benchmark. It records a newer-than-preferred MSVC warning and 21 editor widget registration warnings in the rendered log.

The prototype has three skaters and an automatic goalie per team, fixed human control of home index 0, momentum skating with a 1.45× sprint, directional timed passes/shots, swept puck reception and rink collisions, radial checks, simple AI, fixed-Y goalie tracking, three 60-second periods, alternating ends and career-derived stats/XP/Specials. Ties can finish. These existing behaviors are comparison evidence; the planned Exhibition configuration changes several of them.

Controls are WASD/arrows, Shift sprint, Z shoot, X pass, C check, F/R Special pass/check, F1 controls, Escape pause and F5 restart confirmation. Gamepad actions and switching are absent in the recorded baseline. Actual input polling and animation adaptation are in `Private/UI/HHFoundationHUD.cpp`; GameMode selects the HUD. Eight-player assumptions exist in simulation, input and rendering.

The working renderer uses native Unreal Canvas and JSON atlas regions. Reuse the arena layers, goals, team atlases, skating/crossover sheets, goalie/action/fall/celebration poses, puck and UI. Preserve vertical rink orientation, nearest-neighbor filtering, feet anchors, sprite scale and behind-net layering. No new art generation, renderer rewrite, backend, networking or parallel Godot implementation is in the Exhibition backlog.

### Planned Exhibition requirements

- Standalone entry, side selection, fixed equal ratings, one human team versus AI, and no career XP, stat growth, save writes, Special gauge or Special actions. Preserve career behavior through separate configuration/adapters.
- Start tuning with 3 skaters plus goalie; expand to 5 skaters plus goalie after spacing/readability review. Use stable roster IDs, eligible replacement lines, penalty-box membership and safe extra-attacker substitutions.
- Implement actor-independent actions, selected-skater state, defensive switching, receiver control transfer on completed passes, responsive momentum tuning and backward skating. During a pass flight, movement stays with the passer.
- Ground passes first: aim/distance/lane selection, bounded receiver lead, genuine interception, and separate catches/blocks/deflections. Then quick shots, charged shots, goalie reaction/recovery, rebounds/covers, buffered one-timers and optional saucers after ground-pass review. The proposed 150 ms one-timer window is a tuning starting point.
- Directional committed checks with contact/recovery windows and miss consequences; ordinary body separation; no repeated stun locks. Positional team roles and decision intervals replace everyone chasing and clock-modulo decisions. Goalies need finite movement and Ready/Moving/Save/Recovery/Cover/Distribute states.
- Setup: Penalties **On / On, No Offsides / Off**; Line Changes & Fatigue **On / Automatic / Off**; Fighting **On / Off**; three periods of **5 / 10 / 20 minutes**; **Real-time / Accelerated** clocks; **Automatic / Manual** goalie control. Lock match rules after starting, show them in Pause, and retain settings across rematches while clearing match state.
- Rules: immediate-whistle offsides when enabled, icing, hooking/holding/tripping/roughing as 2-minute minors, penalty-box/strength management, power-play/penalty-kill AI, breakaway penalty shots, fighting when enabled, one 5-minute sudden-death overtime, one 30-second timeout per team, and Pull/Return Goalie. Pulling creates a sixth skater only at full strength and never erases penalty reductions.
- Match-local fatigue reduces speed/checking power, with bench recovery; Off keeps the top line at unlimited energy. Automatic line changes occur before each faceoff. Timeouts freeze match/penalty clocks and fully restore energy when fatigue is enabled. Separate simulation, game, penalty and timeout clocks; Pause freezes them all.

### Unresolved decisions to preserve

The source plans leave clock acceleration/defaults; overtime strength/end changes/final tie outcome; icing with Penalties Off and its exemptions/touch policy/restart side; exact offside tolerance; foul triggers and holding/hooking inputs; stacked/coincidental penalties, minimum strength, goal release and delayed calls; penalty-shot lifecycle; fighting controls/duration/penalties and compatibility with Penalties Off; fatigue rates/floors; substitution timing; timeout eligibility/skipping; goalie-pull/reset/input policies; poke checks; final sprint role; and precise shot assistance unresolved. Do not silently fill them in. Review essential core choices before their implementation, as required by the repository's AGENTS.md.

### Delivery and validation

The initial estimate is 100 one-hour sprints: 80 planned implementation/verification hours plus 20 contingency hours. It is an effort estimate, not a guaranteed deadline. The ten phases cover foundation, team control/skating, puck/passing, shots/saves, physical play/AI, complete matches, zone rules, penalties, lines/goalie options, and fighting/release validation. Each original ticket, dependency, check and phase gate is retained below. An elapsed hour does not mark a failing ticket complete; use contingency or revise the estimate without dropping requested features.

Keep pure C++ simulation testable independently of rendering. Preserve bounded substeps, ordered swept contacts, one authoritative puck owner, one result per match and explicit reset boundaries. Extend hockey and session automation for each feature; retain career/town regression after shared changes. Validate setting interactions, both attack directions, full rosters, clocks/stoppages, keyboard/controller play, and readable gameplay with human review. Historical tests below must not be presented as fresh test results.

## Complete source context

The sections below retain the full text of every source document, including numerical tuning, timestamps, references, sprint tables, reproduction steps and verification limitations. Source headings are nested beneath their section, and links between included documents point inside this file. Relative image and external-document links retain their original paths. Original files remain unchanged.

- [EXHIBITION_MODE_PLAN.md](#source-1)
- [EXHIBITION_SPRINT01_BASELINE.md](#source-2)
- [EXHIBITION_ONE_HOUR_SPRINTS.md](#source-3)
- [TAPE_TO_TAPE_GAMEPLAY_PLAN.md](#source-4)
- [NHL94_VIDEO_STUDY.md](#source-5)
- [HOCKEY_ONLY_PROTOTYPE.md](#source-6)
- [HOCKEY_GAMEPLAY_UPDATE.md](#source-7)
- [HOCKEY_ARENA_UPDATE.md](#source-8)
- [ARENA_REDESIGN.md](#source-9)
- [PRO_ARENA_REFINEMENT.md](#source-10)

---

<a id="source-1"></a>
## Source 1: EXHIBITION_MODE_PLAN.md

### Hockey Heroes — Exhibition Mode development plan

Date: October 28, 2026

Execution backlog: [one-hour development sprints](#source-3), including 80 planned implementation/verification hours and 20 contingency hours. Player-facing hockey mode is now named **Exhibition Mode**; existing internal identifiers remain until a safe implementation migration is needed.

#### Direction and status

Build a standalone, replayable hockey match whose skating, passing, shooting, physical play and team behavior are inspired by **Tape to Tape**, using Hockey Heroes' existing pixel graphics. Exhibition becomes the hockey baseline that career and other modes can later reuse.

The user's request establishes this planning direction over the earlier NHL 94-only reference for this mode. This document is a development proposal, not a claim of implemented functionality or authorization to implement every proposed mechanic. Existing career rules and playable prototypes remain intact. Review core rule choices before implementation, as required by AGENTS.md.

**Target experience:** carry the puck into space, draw a defender, pass to an open teammate, threaten a one-timer, and compete for the rebound. On defense, switch to a useful skater, close a lane, force a turnover, and break out. Passing and positioning should be more productive than repeatedly skating straight at the goalie.

#### Reference evidence and limits

- Supplied video: [Friendly Frenzy Games — Tape To Tape 1.0: The Rebuild Begins, Episode 1](https://www.youtube.com/watch?v=YJwgyMW16Lc), runtime 51:11. Targeted browser playback/screenshot samples near [20:00](https://www.youtube.com/watch?v=YJwgyMW16Lc&t=1200s) and [40:00](https://www.youtube.com/watch?v=YJwgyMW16Lc&t=2400s) show attacking-zone spacing, players positioned away from the puck, a selected-player indicator and a compact score/period/clock display. The 15:00 sample is a campaign map and is outside this plan.
- [Developer's Steam description](https://store.steampowered.com/app/1566200/Tape_to_Tape/) identifies responsive arcade hockey, big hits, one-timers, saucer passes, dekes, rebounds and saves, with positioning, passing and timing rewarded.
- These are targeted samples, not an exhaustive video study. They do not establish precise acceleration, collision rules, input bindings, AI algorithms, goalie probabilities or timing windows. Every mechanic and numerical target below is a proposed Hockey Heroes adaptation. Do not claim frame-accurate Tape to Tape parity.
- Before tuning, expand the reference log with short timestamped sequences for a breakout, completed/intercepted pass, one-timer, missed check, save/rebound and faceoff. Record observable behavior separately from inferred implementation; identify campaign abilities so they do not influence baseline tuning.

#### Current foundation — verified from source

Primary implementation: Unreal 5.8/C++, under `unreal/HockeyHeroes`. Godot remains the regression reference rather than a second implementation target for every new feature.

| Area | Current Unreal behavior | Required development |
|---|---|---|
| Teams/control | Three skaters and one automatic goalie per side; human always controls index 0 | Selected-skater identity, receiver control transfer, deliberate defensive switching; configurable roster size |
| Skating | Acceleration, coast drag, reversal braking, facing and velocity; 1.45x sprint | Tune response, add backward-facing movement, improve collision response |
| Puck | Stick anchor, swept reception, rounded boards, posts/nets, behind-net space | Separate catches, blocks, deflections, saves and rebounds |
| Passing/shooting | Directional normal actions, receiver lead, timed releases | Actor-independent actions, better pass selection, shot preparation, buffered one-timers |
| Defense | Radius-based checks, stun and puck release | Directional contact, commitment/recovery and readable knockback |
| AI | Puck chasing, simple wing support, periodic passes/shots | Assigned roles, spacing, lane evaluation, transition behavior |
| Goalies | Track puck X on a fixed Y; collect/distribute through normal reception | Crease positioning, reaction/recovery states, controlled rebounds and covers |
| Match | Three 60-second periods, goal delay, center reset, alternating ends; ties can finish | Exhibition setup, actual faceoff interaction, overtime, results/rematch |
| Progression | Match reads career stats; period callbacks grant XP; pass/check Specials remain | Fixed Exhibition ratings, no career writes or Specials in Exhibition |

Relevant code: `Public/Simulation/HHHockey.h`, `Private/Simulation/HHHockey.cpp`, `Private/Simulation/HHSession.cpp`, `Private/UI/HHPrototypeViews.cpp`, `Private/Core/HHFoundationGameMode.cpp`, and `Private/Tests/HHPrototypeTests.cpp`, all under `unreal/HockeyHeroes/Source/HockeyHeroes`.

#### Proposed Exhibition rules

| Decision | Recommended first baseline |
|---|---|
| Match access | Exhibition entry independent of career creation and town travel; select side and start |
| Players | One human controlling a team versus AI; selectable Automatic or Manual goalie control |
| Team size | Tune first with existing 3+goalie; final baseline 5 skaters+goalie per team, subject to spacing/readability review |
| Teams/ratings | Existing home/visitor graphics; equal fixed ratings initially, with no career modifiers |
| Duration | Three periods; selectable 5, 10 or 20 minutes with an explicit real-time or accelerated clock setting; retain 60-second developer preset for quick tests |
| Tied score | One 5-minute sudden-death overtime period; outcome if still tied is TBD before implementation |
| Rules | Configurable penalties/offsides, icing, line changes/fatigue, fighting, penalty shots and timeouts, as specified below |
| Progression/abilities | No XP, stat growth, special gauge or Special actions in Exhibition; retain those in existing career/prototype configurations |
| Scope | Windows keyboard and controller; local multiplayer and online/backend work deferred |

These defaults keep play flowing and make tuning reproducible. They are design choices for Hockey Heroes, not assertions about Tape to Tape's rules. Keep period end changes already working. Resolve a goal occurring exactly at the horn by simulation event time; never count it twice.

#### Basic hockey rules — requested scope

The following settings were added at the user's request on October 28, 2026. They replace the earlier deferral of penalties, offsides, icing, fighting and line changes and the earlier period/overtime proposal. They are planned requirements, not implemented features. “Official NHL rules” describes the requested enforcement direction; this plan specifies the basic subset below, not a claim of complete NHL rulebook coverage. Additional exceptions must be specified before their feature is implemented.

##### Game Setup settings

| Setting | Options and behavior |
|---|---|
| Penalties | **On:** enforce hooking, holding, tripping and roughing as 2-minute minors, plus offsides. **On, No Offsides:** enforce penalties but ignore offsides. **Off:** no penalty or offside calls; continuous play through those infractions. Ordinary goals, period horns and goalie-cover stoppages still apply. |
| Line Changes & Fatigue | **On:** manual line swaps; active skaters tire and lose speed/checking power. **Automatic:** switch lines before each faceoff; active skaters still tire. **Off:** top line stays on the ice with unlimited energy and no fatigue. |
| Fighting | **On:** aggressive checking can trigger a fight; combatants go to the penalty box. **Off:** no fight triggers regardless of physical play. |
| Period Length | **5, 10 or 20 minutes** for each of three periods. Separate **Real-time / Accelerated** clock choice; display the expected real duration before starting. Acceleration multiplier and default settings are TBD. |
| Goalie Control | **Automatic:** CPU handles positioning/saves, with human takeover after a controlled save for distribution. **Manual:** human controls goalie positioning throughout live play; teammates skate under AI control. Bindings must distinguish goalie movement/save/distribution from skater actions. |

Expose all settings before puck drop and show the active rules in Pause. Lock rule settings for a running match so penalty, fatigue and clock state cannot be invalidated mid-play. Rematch retains settings but resets match state. Developer test presets are separate from player-facing period options.

##### Infractions, special situations and restarts

- **Offsides:** with Penalties On, an attacker entering the opponent's zone across the blue line before the puck causes a whistle and a neutral-zone faceoff. Track puck and skater crossings in simulation order, relative to the current attack direction. No calls with On, No Offsides or Off. Delayed-offside/tag-up handling and exact skate-crossing tolerance are TBD; the initial requested behavior is an immediate whistle.
- **Icing:** an untouched puck sent from the shooting team's half past the opposing goal line, without a goal, causes a whistle and a faceoff in that team's defensive zone. Clear the pending icing candidate on an eligible touch or goal. The request does not explicitly state whether icing remains active with Penalties Off; record that interaction as TBD rather than silently coupling it to offsides. Short-handed exemptions, touch/hybrid versus automatic icing, and restart-side selection must be specified before implementation.
- **Minor penalties:** hooking, holding, tripping and roughing send the offender to the box for 2 minutes, reducing the offending team's on-ice strength and creating a penalty kill/power play. Show offender, infraction, remaining time and current strength. Define action/contact triggers for each infraction, including holding/hooking inputs, before coding detection. A directional check alone must not be labelled every type of foul.
- **Penalty management:** specify power-play goal release, coincidental/stacked penalties, minimum skater count, delayed calls and period carryover before the penalty milestone. Penalty timers use game-clock time, stop with play, and carry through period breaks. Line changes cannot replace a boxed player and erase the disadvantage. Implement power-play and penalty-kill AI with the strength system.
- **Penalty shots:** award a dedicated one-attacker-versus-goalie attempt for a clear breakaway foul from behind involving a trip or hold with a clear path to the net. Record attacker/defender, direction of contact, puck control and clear-path evidence. Define attempt start, completion/miss, subsequent faceoff, clock handling and whether a separate minor applies before implementation. No award when Penalties Off.
- **Fighting:** qualifying aggressive checks can initiate a fight only when Fighting On. Add explicit fight, resolution and box states, and reuse current character graphics. Fight duration, controls/resolution, penalty length and whether coincidental fight penalties reduce team strength are TBD. With Penalties Off, no box penalties are allowed; proposed resolution is to disable Fighting in setup for that combination, pending review.
- **Overtime:** if tied after regulation, start one **5-minute sudden-death** period. The first valid goal ends the match immediately. Overtime strength, end changes and the outcome if still tied after five minutes are TBD; do not retain the earlier unlimited-overtime assumption or silently add a shootout.
- **Timeouts:** each team has one **30-second timeout per game**, available from Scoreboard/Pause at an eligible stoppage. Freeze play and match/penalty clocks during the timeout. Fully restore skater energy when fatigue is enabled (manual or automatic lines). A timeout cannot be spent twice or reset at a period break/overtime. Live-play eligibility and whether the 30 seconds can be skipped are TBD.
- **Pulling the goalie:** add **Pull Goalie / Return Goalie** to the Scoreboard pause menu. Pulling replaces the goalie with a sixth skater at full strength and leaves an empty net. Respect existing penalty reductions: the extra attacker does not erase penalties. Define safe substitution at resume, role assignments, manual-goalie input handoff, goal/faceoff/period reset policy and automatic-versus-manual return before implementation. Pulling is available for late-game tactics; no automatic score/time restriction is assumed.

##### Fatigue, clocks and roster requirements

Use match-local energy, separate from career stats and the Special gauge. Active skaters drain energy, benched skaters recover, and reduced energy lowers speed and checking power. Drain/recovery rates and minimum performance floors are tunable/TBD; line changes Off bypasses these modifiers entirely. Display energy and active/next lines clearly. Keep sprint resource-free until fatigue tuning explicitly defines its energy interaction.

Provide enough roster entries for replacement lines, boxed players and an extra attacker using existing team art. Use stable roster IDs separate from active simulation slots. Manual line selection must define safe substitutions without duplicate skaters, extra players or possession teleporting; on-the-fly changes versus stoppage-only changes remains TBD. Automatic changes occur before each faceoff, as requested, and select only eligible players. Human selection must transfer safely when a controlled skater leaves the ice.

Separate simulation seconds, displayed game-clock time, penalty-clock time and timeout wall time. Real-time clock runs 1:1; accelerated mode uses a documented multiplier for regulation and overtime game time and penalty timers. A timeout lasts 30 real seconds while game clocks remain frozen. Pause freezes every timer, including an active timeout. Bench recovery and active fatigue use simulation time with explicit tuning per clock mode so acceleration cannot silently exhaust a line or remove the need to change it. Test the 2-minute penalty/5-minute overtime interaction under both clock settings.

#### Gameplay specification

##### Skating and control

Preserve momentum, but make the first movement response prompt and reversals intentional. Tune acceleration, top speed, braking, coast distance and turning separately in rink-relative units. Do not globally speed everything up to simulate responsiveness. Keep the current sprint behavior for the first comparison; decide whether it improves the final game before removing or redesigning it. Match-local fatigue is controlled by the Line Changes setting described above.

Human control follows a completed pass to the receiver. During flight, movement remains with the passer; a pending one-timer can be assigned to the intended receiver. Defensive switching scores eligible skaters by intercept opportunity, goal-side position and distance, excludes stunned skaters/goalies, and uses stable tie-breaking. Add a short switch lock to prevent flicker. Following an opponent's turnover must not arbitrarily switch the human every frame.

Use action names with keyboard/controller mappings: Skate, Pass, Shoot, Check, Switch, Backward Skate and Pause. Preserve Z/X/C where practical and expose bindings in the controls screen. Analog steering and keyboard diagonals must produce equivalent maximum speed. Menus consume their own inputs.

##### Puck and passing

The puck stays visually aligned with the stick during possession. Loose puck travel, boards, posts and body contacts remain authoritative simulation events. Never teleport a pass to its recipient or let an intended target override an earlier interception.

Pass selection weighs aim, distance and lane obstruction. Lead a moving receiver with bounded prediction; use a free directional pass when no teammate qualifies. A brief target cue makes selection understandable. Players outside the lane cannot magnetically capture the puck. Distinguish a controlled reception from a body block or hard deflection.

Ground passes ship first. Add saucer passing only after ground play is stable, using a small simulation height and matching shadow/vertical offset on the existing puck graphic. Specify height thresholds for sticks, bodies, boards and goals before enabling it. This feature must not depend on new art or become an uncounterable pass.

##### Shooting and one-timers

Begin with a quick directional wrist shot; introduce a held charge for a stronger, more committed shot after the quick shot feels good. Cap charge and make interruption cancel safely. Shot speed, aim assist and preparation time are separate tuning values. Assistance can gently bias aim within a narrow cone; it cannot redirect any facing direction into a guaranteed goal.

Buffer Shoot shortly before the selected receiver contacts an incoming pass. On valid arrival, execute one release rather than a catch followed by a second full windup. Start with a proposed 150 ms input window and tune through playtests. Expire the request on interception, invalid contact, stun, stoppage or timeout. The existing shot/pass poses provide the anticipation and follow-through.

Initial deking comes from changing skating direction and protecting the stick side. A dedicated deke action is a later enhancement, gated on the core pass/shot loop; no new animation requirement for the first baseline.

##### Defense and collisions

Turn checking into a short directional commitment with a contact window and recovery. A miss leaves an opening. Resolve impact using relative movement, facing and capped impulse; release a checked carrier's puck into open play. Prevent repeated stun-locks and multi-hit processing from one contact. Ordinary body contact separates players without acting like a full check.

Use positional interception and a separate short-reach poke action only if testing shows a defensive gap. The final binding and automatic-versus-manual poke policy remain a review choice; do not silently borrow a control scheme from an unverified guide.

##### Team AI and goalies

Assign team roles rather than sending every skater toward the puck. In possession: carrier, near support, far support, and defensive safety; at five skaters, include point/slot coverage. Without possession: one pressure player, lane coverage, goal-side defenders and rebound coverage. Reassign roles with hysteresis when possession changes. Teammates must offer reachable passes and avoid occupying the carrier's path.

The carrier evaluates carrying, passing and shooting based on space, pressure, passing lanes and shot angle. Replace clock-modulo passing with decision intervals and cooldowns. Difficulty changes reaction, decision quality and defensive pressure first; keep physical rules equal and avoid hidden speed advantages.

Goalies position relative to puck angle and crease bounds, move laterally with finite speed, and have Ready, Moving, Save, Recovery, Cover and Distribute states. Use shot path, contact region and reaction timing to choose a save, rebound or goal. A goalie cannot instantly collect every shot inside a circle or recover immediately after a lateral save. Tune fixed seeded scenarios before adding randomness. Covers produce a stoppage/faceoff; safe possession can produce an outlet. Reuse existing goalie frames.

#### Art and presentation constraints

Reuse arena base/foreground, goals, team atlases, skating/crossover sheets, goalie/action/fall/celebration poses and existing UI styling. Keep rink orientation, sprite scale, nearest-neighbor filtering, feet anchors and behind-net layering. Adding players must reuse these assets. Do not rotate or redraw the rink to imitate the reference's perspective.

Improve gameplay readability with a selected-player marker distinct from possession, a restrained puck highlight, pass-target cue and temporary state notices. Keep the puck, relevant receiver and goal visible within camera limits; change the current camera's fixed index-0 dependency to selected-skater tracking. Tune framing with five-skater congestion tests. Use existing audio where available; missing sound polish must not block mechanical validation.

#### Incremental delivery order

Each row is a milestone containing small, separately playable changes. Implement one feature, verify it, then continue. Do not couple the entire overhaul into one rewrite.

| Stage | Deliverable and dependencies | Acceptance gate |
|---|---|---|
| 0. Reproducible baseline | Reference log, seeded scenario harness, capture current feel; introduce Exhibition config and fixed roster ratings | Exhibition can start without a save; complete/restart/quit never changes career XP, wins or files; career regression still passes |
| 1. Team control | Generalize index-0 actions to actor IDs, selected skater, receiver transfer, Switch action and controller adapter | Every home skater can move/pass/shoot/check; five chained passes transfer control correctly; switching is stable and marker/camera agree |
| 2. Skating feel | Tune first response, coasting, reversal and backward-facing movement in isolated drills | Straight, diagonal, stop, turn and reversal behave consistently at 30/60/120 render FPS; human review accepts the feel |
| 3. Puck and passing | Contact categories, lane-aware target selection, lead passes, free passes and board play | Open passes complete; obstructed passes can be intercepted; fast pucks cannot tunnel through posts, players or goalies; no duplicate owner |
| 4. Shooting and saves | Quick shot, charge, goalie movement/recovery, rebounds/covers | Shots can miss, score, be saved or rebound; a lateral pass can expose the goalie; no routine auto-goal or automatic catch of every shot |
| 5. Combination offense | Buffered one-timers, give-and-go AI support; saucers after ground-pass signoff | Pass/shot sequence works from both attack directions; blocked or intercepted feeds cancel; rebound remains contestable |
| 6. Physical defense | Directional check, miss recovery, knockback and contact separation | Good timing produces turnovers; misses have a cost; no check spam/stun loop; puck remains recoverable near boards/nets |
| 7. Positional teams | Possession/defense roles and transition logic, then expand to 5+goalie | Breakouts, cross-ice passes and defensive recovery work; teammates spread out; five-skater play remains readable with current art |
| 8. Match structure and setup | Timed faceoffs, 5/10/20-minute periods, real/accelerated clocks, 5-minute sudden-death overtime, results/rematch and pause/quit | Horn/goal event ordering is correct; overtime ends immediately on a goal; unresolved tie policy is decided and tested; settings persist across rematches without retaining match state |
| 9. Zone rules | Blue-line/center-line tracking, offsides and icing, neutral/defensive-zone faceoff placement | Correct calls in both attack directions; ignored offsides in both disabled modes; touches/goals cancel icing candidates; icing-setting interaction is decided and tested |
| 10. Penalties and special teams | Infraction detection, box/timers, roster eligibility, reduced-strength AI, power plays/penalty kills and penalty shots | All four minors produce the correct disadvantage; Off suppresses calls; goals, timer expiry, stacked/coincidental penalties and period carryover follow specified policy; penalty-shot flow resumes safely |
| 11. Lines, fatigue and timeouts | Replacement rosters, manual/automatic line selection, energy modifiers/recovery and one timeout per team | No duplicate/ineligible skaters; automatic changes before faceoffs; Off has no fatigue; speed/check effects are observable; timeout restores energy, freezes clocks and is consumed once |
| 12. Goalie options and extra attacker | Automatic post-save takeover, continuous Manual goalie control, Pull/Return Goalie menu actions | Input ownership is clear in both modes; empty-net goals work; sixth skater appears only at full strength with goalie pulled; penalty reductions remain intact; returning goalie removes extra attacker |
| 13. Optional fighting | Trigger, interaction/resolution, box handling and setup compatibility | Off never triggers fights; On resolves once and applies specified penalties; Penalties Off combination follows the reviewed setup policy; existing graphics remain usable |
| 14. Baseline lock | Difficulty presets, full rules/settings regression matrix, recorded drills and human matches; freeze a named tuning version | All acceptance checks pass and human review accepts gameplay, rule feedback, special teams, line management and both goalie modes |

The first useful review build is stages 0–3: a playable team-controlled passing game. The next is stages 4–6: a complete attacking/defending loop. Stages 9–13 depend on the full-roster match flow in stages 7–8; implement each rule separately. Do not declare Exhibition complete until all requested settings and their acceptance gates pass. Optional settings such as Fighting Off do not make implementation of the On option optional scope.

#### Implementation boundaries

Keep the existing pure C++ simulation testable without rendering. Add small modules as needed for match configuration/tuning, team control, puck contacts, team AI and goalie behavior; avoid a speculative framework rewrite. Expose validated tuning through Blueprint-facing data/configuration without making presentation own match rules.

Replace hard-coded home indices, eight-player loops, pass targets and index-0 camera/action assumptions before expanding rosters. Decouple match ratings from `Profile*` while retaining a career adapter. Replace implicit delay/Finished combinations with explicit Ready, Faceoff, Playing, GoalStoppage, GoalieCover, RuleStoppage, PenaltyShot, Fight, Timeout, PeriodBreak, Overtime and Finished transitions as match flow grows. Keep rewards outside the simulation; Exhibition's result consumer grants none. Keep rule detection, penalty/strength management, roster/substitutions, energy and clock conversion modular, with configuration-driven behavior.

Preserve bounded simulation steps and ordered swept events. Model one authoritative puck owner and one result per match. Clear queued actions, selection buffers, contact cooldowns, role assignments and camera state at the correct reset boundary. Use seeded decisions for repeatable AI tests; do not promise cross-platform lockstep determinism or add networking here.

#### Verification and completion

- Extend `HockeyHeroes.HockeySimulation` with meaningful cases for switch eligibility, control transfer, pass interception, one-timer cancellation, check contact/recovery, goalie rebound/recovery, full-roster indexing and overtime event ordering.
- Cover each Penalties option crossed with each Line Changes option, both Fighting settings, both goalie modes, all three period lengths and both clock modes. Test compatible combinations with focused interaction cases, especially fighting with penalties disabled, fatigued extra attackers, substitutions during penalties and manual-goalie handoff while pulled.
- Verify offsides/icing in both directions, correct faceoff location, penalty expiry/goal release/period carryover, breakaway penalty shots, fight resolution, timeout exhaustion, empty-net scoring and the five-minute overtime horn. Check match/penalty/timeout clocks during pause and every stoppage. Resolve all rule-policy TBDs before marking their milestone complete.
- Extend `HockeyHeroes.CareerAndPrototypeFlows` to verify Exhibition isolation and retain existing career period rewards, save/load, abandonment and rematch behavior. Run grid/town regression after shared session/input changes.
- Build the Unreal Development Editor target and run relevant automation after each feature. Use the existing low-memory build settings and one running prototype at a time, documented in `UNREAL_PROTOTYPES.md`.
- Run real keyboard/controller playtests: breakout, two-on-one, cross-ice one-timer, chase a rebound, defend a lead, cover/outlet, period horn, pause mid-release, overtime, quit and rematch. Repeat with both attack directions and at full roster size.
- Record input-to-action delay, pass outcomes, shot/save/rebound counts, switch choices, AI bunching and frame time. Proposed target: sustained 60 FPS at 1280x720 on the current development PC, with machine/build details recorded. Numerical success rates are tuning evidence, not substitutes for human review.
- Use current Godot behavior to check preserved functionality; do not require old fixed-control or goalie behavior to remain identical inside the new Exhibition configuration.

Done means a player can configure the requested rules, launch Exhibition, understand controls, play a readable full match, create chances through passing, defend through positioning/checking, manage penalties/lines/goalie choices, resolve overtime and rematch safely, all using the existing graphics. Record actual build/test results and unresolved issues at implementation time. No gameplay build or tests were run for this planning-only document.

#### Core choices to review before implementation

The user's basic-rule additions are included in Exhibition scope: configurable penalties/offsides, lines/fatigue, fighting, 5/10/20-minute periods, goalie control, icing, penalty shots, a 5-minute sudden-death overtime period, timeouts and an extra attacker. Remaining policy decisions are explicitly marked TBD above, especially icing with penalties disabled, fighting/penalty compatibility, overtime ending tied, clock acceleration and detailed penalty/substitution handling. Poke-check policy, sprint's final role and precise shot assistance remain tuning/review decisions. These changes apply to Exhibition; extending the validated baseline into career is a later scoped task.

---

<a id="source-2"></a>
## Source 2: EXHIBITION_SPRINT01_BASELINE.md

### Exhibition Mode — Sprint 01 baseline

Completed October 28, 2026. Sprint scope: build/run the existing Unreal hockey prototype and inventory controls, simulation constants, reusable assets and known failures. No gameplay, tuning, assets or career rules were changed. This completes the first sprint's deliverable; it does not claim an hour of elapsed work or completion of the full manual acceptance checklist.

Source baseline: commit `aac667f0edeab11564df4b7062cfdbe5bcefe3b8`, with the Exhibition planning documents present as untracked work. Existing player-facing naming is intentionally retained until Sprint 05.

#### Build and run evidence

| Check | Result |
|---|---|
| Installed engine | Unreal 5.8.4, changelist 58902052 |
| Editor target | `HockeyHeroesEditor Win64 Development`: succeeded; target already up to date; zero compile actions; UBT reported 3.04 seconds |
| Build settings | Existing `Open-Editor.ps1`: `-WaitMutex -NoHotReloadFromIDE -NoUBA -MaxParallelActions=1` |
| Automation | `Verify-Prototypes.ps1` exited 0; all three suites reported Success; zero Error/Warning lines in the automation log |
| Rendered launch | `L_HockeyModePrototype`, DX11, windowed 1280×720, transient capture mode; process exited 0 |
| Runtime initialization | `HH_PROTOTYPE_READY L_HockeyModePrototype`; art manifest: 64 regions, four character sets, missing=0 |
| Rendered art check | `HH_ART_CAPTURE textures=10 missing=0` |
| Screenshot | Fresh 1280×720 image captured at 01:46:54 UTC and inspected visually |

Automation success entries occurred at 01:46:03 UTC:

- `HockeyHeroes.CareerAndPrototypeFlows`: progression/save roundtrip, career creation/activity returns, practice/league results, allocation, hockey pause/resume, restart, session XP and rematch reset.
- `HockeyHeroes.GridAndTown`: step/collision/input behavior, pause, NPC/building transitions and town reachability.
- `HockeyHeroes.HockeySimulation`: acceleration/coast/reversal, diagonal limit and frame-rate comparison, action windup, interrupted Specials, pass reception, fast-puck sweeps, goalie-before-goal ordering, scoring/stoppage, boards/posts/net/corners, period-two attribution, checks and a complete simulated match with exactly three reward callbacks.

These are three automation suites, not three assertions. Successful simulation checks do not establish Tape to Tape gameplay feel or human/controller acceptance.

![Current rendered hockey baseline](screenshots/exhibition-sprint01-baseline.png)

The screenshot shows the rink, six skaters around center, puck, selected rookie marker, team rings, scoreboard/period clock, XP/Special HUD and current controls. Goalies are outside this camera view. The capture uses existing automated startup play, not scripted human input.

Local generated evidence, ignored under `unreal/HockeyHeroes/Saved/Previews/Sprint01/`:

- `build.log`: copy of this run's UnrealBuildTool log.
- `automation.log`: copy of this run's full prototype automation output.
- `hockey-baseline.log`: rendered startup, art check, screenshot and exit log.
- `hockey-baseline.png`: original capture; tracked copy above preserves the visual baseline.

#### Reproduction

From the repository root, run `./unreal/HockeyHeroes/Verify-Prototypes.ps1` to build and execute all existing suites. For interactive play, use `Play Unreal Hockey Mode Prototype.cmd` (builds first). Do not run additional game/editor instances unnecessarily on this machine.

For the rendered baseline, start the installed `UnrealEditor.exe` with the project path and these arguments, supplying absolute output paths:

```text
/Game/HockeyHeroes/Maps/L_HockeyModePrototype
-game -windowed -ResX=1280 -ResY=720 -dx11 -nosplash
-unattended -nosound -HHTransient
-HHCapture="<absolute output PNG path>"
-abslog="<absolute output log path>"
```

Existing capture code requests a screenshot after approximately four accumulated runtime seconds and quits afterward. Startup/screenshot overhead is additional wall time. Transient/capture mode disables career saving. The prior user's editor process was left running and unmodified; the newly launched capture process exited itself. No interactive input was sent to the user's editor.

#### Current controls — verified in source

| Action | Binding/behavior |
|---|---|
| Skate | WASD or arrows; normalized direction; rookie index 0 only |
| Sprint | Either Shift; 1.45× top-speed multiplier, no energy cost |
| Shoot / Pass / Check | Z / X / C |
| Special Pass / Special Check | F / R; Special Shot absent |
| Controls | F1 |
| Pause/resume | Escape; menus stop session simulation |
| Restart | F5 in hockey-only mode opens confirmation |
| Menus | Up/Down and Enter, or mouse |
| Rematch | Play Again on results resets standalone session |

No gamepad actions or skater-switch binding exist in the current adapter. **Actual input polling and animation adaptation live in `Private/UI/HHFoundationHUD.cpp`, not `HHFoundationGameMode.cpp`.** The latter selects the HUD and has no gameplay input implementation. Later input/roster tickets must include the HUD source/header as well as session/simulation code.

#### Simulation inventory

Sources: `Public/Simulation/HHHockey.h`, `Private/Simulation/HHHockey.cpp`, `Public/Simulation/HHCore.h`, and `Private/Simulation/HHSession.cpp`, beneath `unreal/HockeyHeroes/Source/HockeyHeroes`. Coordinates are source pixels, +Y down; speeds are pixels/second, acceleration pixels/second², durations seconds.

| System | Current value/behavior |
|---|---|
| Players | Two teams, 3 skaters + goalie each; home indices 0–3, away 4–7; human index 0 |
| Rink | Ice rectangle (96,64), size 608×1072; corner radius 72; skater margin 12; puck margin 3 |
| Goals | Mouth Y=144/1056; posts X=360/440; valid crossing X strictly between 367 and 433; net depth 24; swept post radius 7 |
| Integration | Each Tick consumes time in substeps no larger than 1/120 second |
| Skate top speed | `97.5 + SpeedStat × 2.5`; default stat 1 gives 100; sprint gives 145 |
| Acceleration/braking | 260 acceleration, 390 when opposing current velocity, 65 coast deceleration; stunned velocity decays at 240 |
| Shot speed | `300 + ShootStat × 10`; default 310 |
| Pass speed | Normal 230; Special 440; goalie outlet 220 |
| Pass targeting | Home wing indices 1–2 only; alignment ≥0.25; score `2×alignment − distance/560`; lead time capped at 0.5; AI lead multiplier 0.05 versus human 1 |
| Pass animation | 0.06 anticipation, 0.24 total duration |
| Shot animation | 0.12 anticipation, 0.38 total duration; aim committed when queued |
| Puck | Board reflection multiplier 0.8; velocity multiplier `pow(0.82, dt)`; at most 4 bounces per substep |
| Reception | Swept circles around player positions; radius 13 skater / 18 goalie; normal release pickup lock 0.025 |
| Check | Radius 29.5 normal / 65 Special; stun 0.8 / 2; impulse 75 / 130; action 0.28; cooldown 0.7 |
| Checked carrier | Puck speed 140 away from checker; pickup lock 0.2 |
| Goalie | Puck-X tracking clamped 373–427; fixed Y=162/1038; requested speed capped at 0.705×skate speed; immediately queues outlet on reception |
| Match | 3×60-second periods; one-second reset delay; 1.2-second goal celebration; tied result can finish; ends alternate each period |
| Period XP | `35 + 4×passes + 4×checks + 6×interceptions`; standalone changes remain session-only |
| Special gauge | Cap 100; normal completed pass/check +20, interception +25; enabled in current baseline |
| Camera | Puck tracking biased 12% toward rookie; vertical scrolling only; simulation projection scale 0.8 with HUD offset; HUD uses 640×360 logical view |

All player speeds/shot speeds currently share the career profile, including opponents. These are prototype constants, not measured Tape to Tape values. Preserve them as comparison evidence before retuning.

#### Reusable graphics and rendering

The renderer uses native Unreal Canvas and JSON atlas regions; Paper2D/Enhanced Input being enabled does not mean their asset/input systems currently drive play.

| Existing asset | Reuse and constraints |
|---|---|
| Imported arena base/foreground and top/bottom goals | Manifest keys `arena-base`, `arena-foreground`, `goal-top`, `goal-bottom`; layered feet-Y drawing, current rink coordinates |
| Team action atlases | `comets`/`visitors`, imported from `SourceArt`; original sources in `assets/art/hockey`; 40×48 frames, (20,40) ground anchor, 8 direction rows, 11 pose columns |
| Male hockey animation | Manifest `male-hockey`: 24 clips / 56 frame entries; existing cardinal art plus diagonal/crossover PNGs in `assets/art/characters/male-hockey-skating-v2` |
| Female hockey animation | Manifest `female-hockey`: 8 clips / 20 frame entries; existing `female-hockey-v1.png/.tres` |
| Action/goalie/fall/celebration | Current team-atlas poses already selected by action/stun/goalie states; stick and puck anchors are code-driven |
| Puck, markers and UI | Current Canvas ovals/lines/text; no new bitmap art needed to start Exhibition |

Manifest: `unreal/HockeyHeroes/Content/HockeyHeroes/Data/prototype-art.json`. Texture import/rebuild procedures are in the Unreal README; provenance is in the hockey and character readmes. Do not regenerate art during baseline work.

#### Failures, warnings and limitations

**No build, automation or rendered-launch failure was observed.** This is not a warning-free runtime:

- UBT warns that installed MSVC 14.51.36260 is newer than preferred 14.50.35717. Incremental build succeeded; no clean rebuild was performed and no toolchain setting changed.
- Rendered log has 21 `LogEditorDataStorageUI` widget-factory registration warnings and zero `Error:` lines. The warning messages concern editor widget-purpose registration; the game initialized, captured and exited successfully. Root cause remains uninvestigated; do not report them as fixed or guaranteed harmless.
- Screenshot shows center-ice bunching. Source confirms loose-puck pursuit lacks positional assignments. Record for AI sprints rather than infer all positioning behavior from one image.
- Current skating art shares similar uniforms across opponents; colored ground rings distinguish teams. Action atlases use separate team art. Review team readability and pose consistency without creating new art.
- HUD tick/drawing loops and pose storage assume eight players. Five-skater expansion needs renderer/input review in addition to simulation changes.
- Missing planned features include team switching, five-skater rosters, rules/setup, rebounds/one-timers, fatigue/lines, manual goalie, pulling, fighting and overtime. Their absence is planned backlog, not a failed existing automation assertion.

Environment: Windows 10 IoT Enterprise LTSC 10.0.19044, approximately 15.8 GiB physical RAM, NVIDIA GeForce GTX 1650 Ti / Intel UHD Graphics. Rendered capture used DX11. No FPS benchmark, full manual match, physical controller test, audio test or new Godot verification was performed. Existing automation includes a full simulated match and pause/action checks; it does not replace those manual tests.

#### Handoff

Sprint 01 is complete: baseline build, automation, rendered launch, screenshot and inventories are recorded. Next is **Sprint 02**, the timestamped reference comparison and repeatable gameplay drills. No gameplay implementation from later sprints was pulled into this task.

---

<a id="source-3"></a>
## Source 3: EXHIBITION_ONE_HOUR_SPRINTS.md

### Hockey Heroes — Exhibition Mode: one-hour development sprints

Planning date: October 28, 2026. Status: Sprint 01 completed; [baseline evidence and inventory](#source-2). Sprints 02–100 remain not started.

#### Objective and estimate

Rename the player-facing hockey mode to **Exhibition Mode** and develop it into a complete standalone hockey game with Tape to Tape-inspired handling, the existing Hockey Heroes graphics, and the configurable basic rules in [the Exhibition specification](#source-1). That document remains the detailed feature specification; this is its execution backlog.

**Initial budget: 100 one-hour sprints: 80 planned work hours plus 20 contingency hours.** This is a single-developer effort estimate from the existing playable Unreal prototype, not a delivery guarantee. AI, goalie balance, penalty interactions and fighting are the largest uncertainties. Re-estimate after each review gate; expand the backlog if evidence requires more hours. At four focused hours per day the initial budget is approximately 25 working days; at two hours per day, approximately 50. No calendar dates are committed.

Use Unreal 5.8, C++ and the existing 2D asset/rendering path in `unreal/HockeyHeroes`. Preserve current rink orientation, pixel filtering, character sheets, goals and animation poses. Keep gameplay in testable C++; expose settings/tuning through Blueprint-facing types when useful. Do not replace the working renderer with a new Paper2D architecture merely to complete this plan. No art generation, career redesign, backend, online multiplayer or second Godot implementation is included.

#### How each hour works

- Minutes 0–5: read the next ticket, inspect the relevant code and reproduce its starting scenario.
- Minutes 5–40: implement one narrow change, preserving a playable configuration.
- Minutes 40–55: compile as needed, run targeted automation and verify the observable result in the game when relevant.
- Minutes 55–60: record changed files, evidence, remaining issue and next ticket; prepare a small reviewable change.

Build time, debugging and documentation count toward the hour. If the check does not pass, the sprint is unfinished: use a contingency hour or split it into follow-ups. Do not mark a feature complete solely because the hour elapsed. Run the broader relevant suites at phase gates, rather than repeating every suite for every tuning change. One feature at a time; do not start dependent work with failing prerequisites.

Unless marked completed, tickets are **Not started**. Each table's check is the sprint's definition of done in addition to the standard hour workflow. Row order is the default dependency order. Every phase depends on the preceding phase's gate; explicit cross-phase dependencies identify important coupling.

#### Phase A — Safe Exhibition foundation: hours 01–08

Primary areas: `HHSession`, `HHHockey`, `HHPrototypeViews`, launcher/docs and existing automation.

| Hour | Sprint task | Observable completion check |
|---|---|---|
| 01 — Done | Build/run the existing Unreal hockey prototype; inventory current controls, simulation constants and reusable assets | Build, all three automation suites and rendered launch passed; [evidence, warnings and inventory](#source-2) |
| 02 | Expand the supplied video reference log with representative hockey sequences and local comparison drills | Timestamp observations separately from proposed behavior; identify a repeatable skate/pass/shot drill |
| 03 | Create Exhibition match configuration and defaults separate from career data | A match can be constructed with fixed ratings without reading a career save |
| 04 | Separate Exhibition results/rewards from career consumers | Completing, restarting and quitting Exhibition cannot change career XP, wins or save files |
| 05 | Rename visible hockey-mode menu, HUD/help and launcher labels to Exhibition Mode | Player-facing launch and menu text agree; preserve internal identifiers/map paths unless migration is necessary |
| 06 | Add standalone Exhibition entry, side selection and start/back navigation using current UI | Start either side without creating a career; backing out restores valid menu focus |
| 07 | Add a seeded scenario helper and compact event capture for selected player, puck owner and match state | The same scripted drill can be repeated and inspected without rendering |
| 08 | Foundation regression and policy review checkpoint | Standalone flow and career isolation pass; record required rule decisions and their affected future tickets |

**Gate A:** launch Exhibition independently with fixed ratings and no progression side effects. Do not implement an unresolved core rule by guessing; prepare the concrete alternatives at hour 08 and obtain decisions before the affected ticket. Unrelated work can continue.

#### Phase B — Team control and skating: hours 09–16

Primary areas: `HHHockey`, session/input adapter, current camera and selection rendering.

| Hour | Sprint task | Observable completion check |
|---|---|---|
| 09 | Replace index-0 action entry points with validated actor IDs | Any eligible controlled skater can pass, shoot and check; invalid IDs fail safely |
| 10 | Add selected-skater state and stable defensive switching | Switching excludes goalies/boxed/inactive/stunned skaters and does not flicker |
| 11 | Transfer control on completed passes | Five chained passes give control to actual receivers; interception does not transfer to an opponent |
| 12 | Connect selected marker and camera to selection rather than fixed index 0 | Marker, input and framing identify the same player on both teams |
| 13 | Add named skating/action inputs through the current Unreal adapter; use Enhanced Input where it fits | Keyboard and controller can skate/pass/shoot/check/switch/pause without double actions |
| 14 | Expose movement tuning and tune acceleration, braking and coasting in the baseline drill | Record values and compare straight, diagonal, coast and reversal behavior |
| 15 | Add backward-facing skating without changing travel momentum | A skater faces the play while retreating; normal steering resumes cleanly |
| 16 | Input and movement integration review | Keyboard/controller and 30/60/120 render-FPS checks pass; human review accepts initial movement feel |

**Gate B:** responsive team control with readable selection. Keep existing sprint initially; final fatigue interaction is reviewed in Phase I.

#### Phase C — Puck contacts and passing: hours 17–24

Primary areas: rink sweeps, possession/release events, pass selection and existing sprite anchors.

| Hour | Sprint task | Observable completion check |
|---|---|---|
| 17 | Add puck-contact categories without changing existing swept-event ordering | Tests distinguish reception, block and solid contact with one authoritative owner |
| 18 | Resolve catches versus hard deflections using configurable contact conditions | A hard body impact can leave a loose puck instead of always granting possession |
| 19 | Add lane obstruction to directional teammate selection | An open aligned receiver is preferred over a visibly blocked alternative |
| 20 | Tune bounded lead passes and free-direction fallback | Moving receivers can collect passes; no eligible target still produces a free puck |
| 21 | Add a restrained intended-receiver cue using current UI shapes | Cue agrees with target choice and disappears on release/cancellation/stoppage |
| 22 | Define height/contact thresholds and implement saucer flight in an isolated scenario | Existing puck/shadow renders height; landing and collisions match specified thresholds |
| 23 | Route saucer input into normal pass targeting/reception and cancellation | Elevated pass can clear a low obstacle but cannot bypass all defenders/boards |
| 24 | Passing and fast-puck regression review | Interception, posts, boards, behind-net play and ownership pass from both directions |

**Gate C:** first team-controlled passing review build. Ground passing must pass its checks before enabling saucers in normal play.

#### Phase D — Shots, saves and combinations: hours 25–32

Primary areas: action queues, goalie states, puck contact outcomes and existing action poses.

| Hour | Sprint task | Observable completion check |
|---|---|---|
| 25 | Tune quick directional shots separately from pass speed and movement | Quick shots can miss; aim direction is readable and not forced toward goal |
| 26 | Add capped held-shot preparation and interruption handling | Hold/release creates one shot; stun/possession loss cancels without duplication |
| 27 | Replace fixed-Y goalie tracking with bounded angle-based crease positioning | Goalie tracks a puck moved around the zone with finite lateral speed |
| 28 | Separate goalie save contact from skater reception; add save/recovery timing | Goalie can save a shot and cannot instantly recover across the crease |
| 29 | Add directed rebounds and controlled possession outcomes | Seeded shots demonstrate saves, goals and recoverable rebounds |
| 30 | Add goalie cover/outlet states and a safe restart request | Cover stops play once; outlet releases once; neither duplicates possession |
| 31 | Buffer receiver one-timers with expiration/cancellation rules | Timely Shoot releases one valid feed immediately; interception/stun expires the request |
| 32 | Offensive-loop playtest and goalie balance review | Cross-ice feed, one-timer, miss, save and rebound work in both attack directions |

**Gate D:** playable shooting/goalie loop. Existing poses must communicate anticipation, release and recovery; review tuning before adding more shot variants.

#### Phase E — Physical play and positional teams: hours 33–40

Primary areas: contact/check resolution, team decisions, active roster and camera density.

| Hour | Sprint task | Observable completion check |
|---|---|---|
| 33 | Make a check a directional commitment with contact window and recovery | A check can miss; one action cannot repeatedly hit the same target |
| 34 | Tune impact, loose-puck release and ordinary separation | Checks create contestable turnovers without persistent stun loops or net clipping |
| 35 | Add stable attacking roles for carrier, support and safety | Teammates create passing space rather than following the puck in a cluster |
| 36 | Add defensive pressure, lane coverage and role reassignment | One skater pressures while others protect useful lanes/goal-side space |
| 37 | Replace clock-modulo AI passing with carry/pass/shoot evaluation | AI decisions respond to pressure and angles with bounded decision intervals |
| 38 | Add give-and-go support and rebound pursuit using existing roles | A passer moves into support; a rebound attracts a suitable skater without collapsing every role |
| 39 | Expand active play to five skaters plus goalie per side | No hard-coded eight-player assumptions; formations, passes and switching work for twelve active players |
| 40 | Full-team camera, density and defense review | Both sides can break out, defend and combine; puck/receiver remain readable with current graphics |

**Gate E:** full-strength five-skater match loop. Poke-check controls remain a reviewed choice, not an implicit extra feature; if selected, allocate explicit follow-up hours.

#### Phase F — Clocks, faceoffs and complete matches: hours 41–48

Primary areas: explicit simulation states, session setup/results and game clocks.

| Hour | Sprint task | Observable completion check |
|---|---|---|
| 41 | Introduce explicit match states around existing goal/period delays | Legal transitions are recorded; live actions are rejected during stoppages |
| 42 | Separate simulation time, game time and stopped clocks; apply configured clock scale | Real-time and approved accelerated rate produce expected displayed time; pause freezes both |
| 43 | Add 5/10/20-minute period selection and duration preview | Setup values reach simulation; developer short preset stays separate |
| 44 | Implement configurable faceoff location, formations and timed puck-drop interaction | Early/late input differs from well-timed input; only one team obtains initial possession |
| 45 | Integrate goal, cover and period-end faceoffs and alternating ends | Correct formations restart play; event ordering prevents goals after the horn |
| 46 | Add one five-minute sudden-death overtime and reviewed expiry policy | Goal ends overtime immediately; no-goal expiry follows the chosen policy |
| 47 | Complete results, rematch and quit flows with settings retained | Rematch clears scores/actions/clocks/ownership and retains only setup choices |
| 48 | Match-flow integration review | Full regulation and tied-match scenarios pass; a playable match can be completed without intervention |

**Gate F:** complete Exhibition match before optional enforcement is turned on. Overtime strength and tied-expiry policy require decisions before hour 46.

#### Phase G — Zone rules and penalty infrastructure: hours 49–56

Primary areas: modular rules detection, strength/box state, ordered rink crossings and HUD.

| Hour | Sprint task | Observable completion check |
|---|---|---|
| 49 | Add the three Penalties setup modes and immutable per-match rule configuration | On, On No Offsides and Off have explicit flags visible in Pause |
| 50 | Add blue-line entry tracking and offside restart selection | Early zone entry whistles only in On; neutral-zone faceoff works in either attack direction |
| 51 | Track icing candidate, origin, touches and goal-line crossing | Touch/goal cancels candidate; valid icing returns play to the correct defensive zone |
| 52 | Integrate reviewed icing exemptions/settings and AI zone-entry behavior | Selected policy works with penalties disabled/short-handed; AI can enter legally |
| 53 | Add penalty records, stable roster eligibility and reduced on-ice strength | A scripted minor removes the offender for 2 game minutes without allowing a replacement |
| 54 | Add timer expiry, period carryover and approved power-play goal release | Timers stop with play; expiry/goal returns the correct eligible player once |
| 55 | Handle approved coincidental/stacked penalties, strength floor and call timing | Multiple infractions cannot create illegal player counts or erase a queued penalty |
| 56 | Display box/strength timers and review rules infrastructure | Calls, restart locations and strength are understandable; all setup modes pass focused checks |

**Gate G:** reliable rule/penalty infrastructure driven by scripted infractions. Actual contact detection follows next. Decide icing details and penalty exceptions before their tickets.

#### Phase H — Fouls, special teams and penalty shots: hours 57–64

Primary areas: explicit infraction actions/contact evidence, role AI and isolated attempt flow.

| Hour | Sprint task | Observable completion check |
|---|---|---|
| 57 | Implement reviewed tripping trigger and infraction event | Eligible trip creates one minor; ordinary separation does not; Off suppresses call |
| 58 | Implement reviewed hooking action/contact trigger and input feedback | Hook evidence identifies actor/victim; legal stick interaction is distinguished |
| 59 | Implement reviewed holding action/contact trigger and release | Hold has bounded duration and one call; possession loss/stoppage cleans up state |
| 60 | Implement reviewed roughing criteria on aggressive contact | Qualifying contact produces one call and reason; ordinary checks remain usable |
| 61 | Adapt attacking roles for power-play spacing | Extra player produces usable width/options without filling the penalty deficit incorrectly |
| 62 | Adapt defensive roles for penalty-kill coverage and cleared pucks | Reduced team protects lanes and can recover/clear; expiry restores full-strength roles |
| 63 | Detect qualifying breakaway fouls and enter a one-attacker penalty-shot scenario | Only reviewed behind-the-attacker trip/hold conditions qualify; normal match is suspended safely |
| 64 | Finish penalty-shot goal/miss/reset flow and penalty integration review | Outcome applies once, clock policy is respected and correct restart/box policy follows |

**Gate H:** all four requested minors and penalty shots work with special teams. Inputs, detection criteria, shot eligibility and penalty-shot exceptions need decisions before implementation. These are distinct mechanics, not random labels applied to a check.

#### Phase I — Lines, energy, timeouts and goalie options: hours 65–72

Primary areas: bench roster, substitution transactions, energy tuning, control ownership and Scoreboard/Pause.

| Hour | Sprint task | Observable completion check |
|---|---|---|
| 65 | Add bench lines and validated active/bench/boxed roster transitions | Roster IDs stay stable; no duplicate active skaters or boxed-player substitutions |
| 66 | Add manual line selection and reviewed safe substitution timing | Swaps preserve player count and give human control to an eligible replacement |
| 67 | Add Automatic faceoff line changes and Off top-line policy | Automatic selects eligible lines before each drop; Off retains top line |
| 68 | Add energy drain, bench recovery, speed/check modifiers and energy display | On/Automatic fatigue is measurable; Off stays at full performance; reviewed sprint interaction is respected |
| 69 | Add one 30-real-second timeout per team with full energy restoration | Game/penalty clocks freeze, pause freezes timeout, and repeat use is rejected |
| 70 | Add automatic-goalie post-save human distribution takeover | Save possession transfers input once; release returns to the appropriate skater |
| 71 | Add continuous manual-goalie mode and control help | Human controls goalie positioning while skaters use AI; stoppages safely clear held inputs |
| 72 | Add Pull/Return Goalie transaction and extra-attacker role | Full-strength pull produces six skaters/no goalie; return reverses it; short-handed pull keeps penalty reduction and transfers manual input safely |

**Gate I:** line changes, energy and both goalie modes integrate with penalties. Review fatigue/clock tuning and pulling during penalty shots/fights; prohibit invalid state transitions. If hour 72 cannot include all interactions, split it and spend contingency rather than accepting unsafe substitutions.

#### Phase J — Fighting, setup polish and release validation: hours 73–80

Primary areas: fight states/interaction, setup validation, visual feedback and automation/playtests.

| Hour | Sprint task | Observable completion check |
|---|---|---|
| 73 | Add Fighting On/Off, approved penalty-setting compatibility and qualifying trigger | Off never triggers; approved On combination starts only one eligible fight |
| 74 | Implement the reviewed bounded fight interaction with existing poses/feedback | Participants can resolve the encounter; other live hockey actions remain suspended |
| 75 | Add fight outcome, box penalties, cleanup and restart | Each combatant receives the reviewed consequence once; strength/clock/restarter are correct |
| 76 | Finish Game Setup, Scoreboard/Pause actions and keyboard/controller menu navigation | Every requested option is selectable or explains an incompatible setting; active rules/control help are readable |
| 77 | Tune initial difficulty presets and visual/action readability | Difficulty changes decisions/reaction, not hidden physical rules; marker, puck and action feedback remain clear |
| 78 | Run automated settings/interaction regression; address highest-priority failures | Record results across penalties/lines/fighting/goalie/clock options and focused combined cases |
| 79 | Run human keyboard/controller matches and profile full-roster rendering | Record frame time and feel issues on the development PC; capture at least one full-match result |
| 80 | Fix a bounded final issue, rerun affected checks and prepare baseline candidate notes | Release gate is explicitly passed or failed with evidence; no unresolved required feature is marked complete |

**Gate J:** all requested features and settings function with existing art. Hours 78–80 are validation passes, not enough reserved time to fix arbitrary failures. Failed gates draw from contingency or trigger a revised estimate. A full real-time 3×20-minute match alone takes over an hour with stoppages: schedule its human endurance test across additional contingency sprints, while using clock injection for automated boundary checks. Keep all 20 contingency hours available until risks are resolved.

#### Contingency backlog: hours 81–100

Each is a real one-hour sprint with a single reproduced issue, a bounded fix and a check. Assign exact tickets from findings; these are reserves, not precompleted work or permission to omit features.

| Reserved hours | Initial allocation | Exit evidence |
|---|---|---|
| 81–84 | AI spacing, goalie balance and input feel | Repeat the failing drill; record before/after behavior and relevant regression |
| 85–88 | Rule combinations, penalty queues and substitution bugs | Reproduce the exact settings combination; add a meaningful regression check |
| 89–91 | Fighting/manual-goalie/controller integration | Complete the affected live flow with clear input ownership and cleanup |
| 92–94 | Full-length endurance sessions and follow-up, including 20-minute real-time periods | Record a complete long match across sessions and verify clocks, fatigue, transitions and results |
| 95–97 | Performance/build problems and broader regression fixes | Record target-machine measurements or successful relevant build/test evidence |
| 98–100 | Final playtest findings and candidate verification | Close remaining release blockers; publish actual results and remaining nonblocking issues |

Reserve allocations can move between categories. If the 100-hour budget cannot satisfy the release gate, write the next numbered one-hour tickets with updated effort. Do not silently remove manual goalie control, fighting, line changes or rules to meet the estimate.

#### Engineering boundaries and release checklist

Prefer small modules as complexity warrants: Exhibition config/tuning, team control, puck contacts, team/goalie AI, rules/penalties, roster/energy and clock/state flow. Keep presentation from owning scoring or infraction decisions. Use Blueprint-facing configuration wrappers around tested simulation data; do not move authoritative puck physics into animation events. Stable roster IDs, explicit match states and ordered swept events are prerequisites for full rules integration.

Primary existing source locations, relative to `unreal/HockeyHeroes/Source/HockeyHeroes`:

- `Public/Simulation/HHHockey.h` and `Private/Simulation/HHHockey.cpp`: match, puck, skating, AI and rink.
- `Private/Simulation/HHSession.cpp`: mode entry, setup, pause/results and career separation.
- `Private/Core/HHFoundationGameMode.cpp`: Unreal GameMode/HUD selection.
- `Private/UI/HHFoundationHUD.cpp` and its header: actual current input polling, sprite playback, capture and fixed eight-player assumptions; Sprint 01 confirmed GameMode only selects the HUD.
- `Private/UI/HHPrototypeViews.cpp`: existing renderer/HUD and reusable art presentation.
- `Private/Tests/HHPrototypeTests.cpp`: extend hockey and career-flow checks as features land.

Use the existing low-memory Unreal build settings documented in [Unreal prototypes](UNREAL_PROTOTYPES.md), and keep one running prototype at a time. Build after C++ structural changes, use targeted automation per feature, and run full hockey/career/grid regression at integration gates affected by shared changes. Do not claim tests or performance passed without recorded runs.

Release requires:

- Exhibition naming, standalone launch, setup, readable controls, pause, results and safe rematch.
- Human-accepted skating, team switching, passes, shots, one-timers, rebounds, checks and five-skater team AI with existing graphics.
- All requested penalties/offsides, icing, penalty shots, lines/fatigue, fighting, periods/clocks, goalie options, extra attacker, timeout and overtime behaviors; no relevant policy TBD remains.
- Settings-combination regression and real keyboard/controller play, including both attack directions and a long match.
- No Exhibition career writes or rewards; existing career/overworld flows preserved.
- Proposed performance goal of sustained 60 FPS at 1280×720 verified on the recorded development PC, or a documented unresolved blocker.

This plan renames the development target and player-facing terminology. Actual code, UI, map or launcher changes begin in the implementation sprints; this planning document does not claim the running game has already been renamed.

---

<a id="source-4"></a>
## Source 4: TAPE_TO_TAPE_GAMEPLAY_PLAN.md

### Hockey Heroes — Tape to Tape gameplay study and implementation plan

Prepared October 25, 2026. **Proposal only; no gameplay changes implemented.**

#### Recommendation

Keep the existing C#/Godot planar simulation and add a separate presentation projection plus explicit puck height. Build the feel through acceleration, turning, timed stick releases, physical contact and goalies with limited movement and recovery. Preserve Hockey Heroes' 16-bit artwork, vertical attack directions and RPG progression.

This is a plan to approximate the visible experience, not a reconstruction of Tape to Tape's source code or exact physics. The supplied [Tape To Tape 1.0 Official Trailer](https://www.youtube.com/watch?v=5U1IPhyGQKw) was inspected in Browser using samples across its 1:23 duration and frame stepping through the opening and approximately 0:30–0:34. It is an edited montage with camera cuts and power-ups; numerical parity cannot be established from it.

`GAME_DESIGN.md` and `docs/DEVELOPMENT_ROADMAP.md` currently confirm **NHL 94 on SNES** as the gameplay baseline. Treat this document as an additional proposed feel/presentation reference. Before implementing a core departure, settle whether Tape to Tape supplements that baseline or replaces particular requirements. This planning request does not require changing the confirmed design now.

#### 1. What the trailer actually supports

Timestamps are approximate and refer to the supplied video. Links reopen the relevant sequence.

| Sequence | Visible evidence | Proposed lesson for Hockey Heroes | What remains uncertain |
|---|---|---|---|
| [0:00–0:03](https://www.youtube.com/watch?v=5U1IPhyGQKw&t=0s) | Angled end-zone view, upright characters, grounded shadows, changing skating/stick poses, a player down near the right boards | Separate feet, body, blade and shadow; make contact produce a readable fall and continued displacement | Acceleration, steering model, hit trigger, knockdown threshold and recovery duration |
| [Around 0:30](https://www.youtube.com/watch?v=5U1IPhyGQKw&t=30s) | Close crease attack followed by another attacking shot pose and a broad goalie stance; these are separate cuts | Use distinct anticipation, release and follow-through; goalie silhouette should communicate coverage | Input bindings, charge mechanics, aim assistance, save probabilities and whether adjacent shots belong to the same play |
| [Around 0:31](https://www.youtube.com/watch?v=5U1IPhyGQKw&t=31s) | Close-up shows a puck visibly above a separate ice shadow near a goalie | Give the puck a ground position plus height; evaluate vertical clearance at contact | Exact gravity, launch angle, spin and rebound coefficients; close-up timing is not a reliable flight measurement |
| [0:32–0:35](https://www.youtube.com/watch?v=5U1IPhyGQKw&t=32s) | Character close-ups and large expressive stick/body poses | Original pixel animations can carry force without complex rigid-body characters | Close-ups do not establish the normal gameplay camera or input timing |
| [Around 1:05–1:15](https://www.youtube.com/watch?v=5U1IPhyGQKw&t=65s) | Wider rink play, player indicators, loose puck and conspicuous ability-related objects/effects | Keep puck, controlled rookie and contact feedback readable under motion | Which unusual trajectories/impulses come from baseline hockey versus power-ups |

**Observation:** The trailer has strong depth cues and exaggerated action poses. **Engineering inference:** A planar simulation with height can reproduce the features we need. The footage does not establish whether Tape to Tape internally uses 2D or 3D bodies, nor prove a particular friction, mass or AI algorithm.

#### 2. What the repository already provides

This is a source review, not a fresh playtest or a claim that existing tests passed today.

| System | Current code | Gap to address |
|---|---|---|
| Skating | `HockeyMotion.Skate`: acceleration 260, reversal braking 390, coast drag 65 world units/s². Starting speed 100, sprint multiplier 1.45 | One vector approaches the desired velocity; no separate lateral grip, bounded heading turn or explicit checking lunge |
| Simulation timing | `HockeyMatch.Tick` subdivides calls into steps no larger than 1/120 second | These are bounded substeps, not a persistent fixed-tick accumulator; fractional steps and input arrival still depend on the caller |
| Shooting/passing | Pending releases, 0.12 s shot / 0.06 s pass windup, facing-based aim, receiver leading | No puck height, inherited release velocity, shot variants or separate deflection versus collection |
| Puck/world | Swept puck path against boards, posts, nets and goal lines; earliest player contact along a path | Player centers are sampled at their updated positions; no height, crossbar or moving-player relative sweep |
| Checking | Immediate radial search: normal reach 29.5, fixed 0.8 s stun and 75 knockback; special reach 65 | Success is independent of approach speed and facing; normal hit is an area action rather than timed shoulder contact |
| Goalies | Track puck X on a fixed Y line; 18-unit collection circle; possession queues a pass | No angle/depth positioning, shot recognition, finite save commitment, pad rebounds or recovery states |
| Presentation | `HockeyPresentation`: foot-Y sorting, upright directional art, shadows, raised boards and nets; `HockeyCamera`: puck-led scrolling | Already supplies some 2.5D cues, but uses direct world-to-screen positions; height and a consistent projected ground plane need a shared transform |
| Checks | `tests/HockeyGameplayChecks.cs` covers movement, shots, contact before scoring, rink geometry, shifts and match completion | Preserve behavioral guarantees; revise exact-value assertions deliberately when approved tuning changes them |

Untracked character artwork and preview tools existed during this review. This plan does not modify them or assume they are integrated into the live match.

#### 3. Foundation: separate simulation from the screen

##### Coordinate model

Keep ground position `(x, y)` and velocity in world units. Introduce puck `Height` and `VerticalVelocity`; skater lift is initially visual only. Never derive collisions from the animated head, stick image or a screen-space shadow.

Proposed presentation transform, relative to camera ground position:

```text
screenX = originX + zoom * (worldX - cameraX)
screenY = originY + zoom * (depthScale * (worldY - cameraY) - heightScale * height)
```

Start with a parallel oblique view. Prototype `depthScale` around 0.75–0.9 in a preview, then choose through comparison; this is our experiment, not a measured trailer parameter. Map rink markings, collision debug overlays, feet, stick contact points and shadows through the same transform. Keep upright sprite proportions independent of ground-plane compression. Use the inverse ground transform for any later pointer aiming.

Update camera bounds from the projected viewport footprint; current 640×276 gameplay assumptions cannot simply be reused after compressing depth. Keep the 640×360 output and reserve the existing HUD space. Round only final rendered positions, never physics state.

Sort grounded actors by ground depth with a stable tie-break. Draw puck shadow at ground position and puck image at projected height. Ground sorting alone will fail for pucks above net roofs or bodies: split net front/roof layers and use explicit vertical occlusion rules. Give the near boards a foreground layer. Validate both end zones and behind-net movement before adding perspective scaling or cinematic zooms.

##### Modular boundaries

Extract only as each feature is built:

- `HockeyTuning`: named parameters and an isolated comparison preset; current career defaults remain available.
- `HockeyProjection`: world/screen mapping shared by renderer, camera and debug tools.
- Extend `HockeyMotion` for skating; introduce `PuckPhysics`, `ContactResolver` and `GoalieController` when their respective phases begin.
- Keep `HockeyMatch` responsible for match lifecycle, ownership and action/reward events; presentation consumes state without deciding results.

Preserve one authoritative puck owner. Save XP/stat data separately from transient physics state. Later ENet work can use input commands and simulation snapshots; networking and backend work are outside this implementation sequence. Fixed ticks help repeatable tests but do not guarantee cross-machine floating-point determinism.

#### 4. Skating: push, glide, carve and stop

Retain responsive initial motion and visible residual momentum. Decompose velocity into forward and lateral components relative to a movement heading. Apply push acceleration along desired travel and configurable lateral grip to remove sideways slip. Treat strong reverse input as braking before accelerating in the new direction. At high speed, bound heading rotation so a reversal cannot instantly rotate the velocity vector.

Keep movement heading, visual facing and release aim separate. The current game already separates facing from residual momentum; preserve that useful behavior. A shot/pass can hold its facing through the action while the skater keeps gliding. Do not force an uncontrolled spin when releasing movement input. Preserve analog input magnitude if controller input is added.

Animate push/glide from actual motion and acceleration, rather than only held direction. Drive stride distance from distance traveled; add lean and ice spray from turn/braking intensity. Skater collision uses a footprint at the feet. Boards remove or redirect inward normal velocity while preserving tangential glide.

Use the current 100-unit starting cruise speed as the first comparison anchor. Its nominal start-to-speed time is about 0.38 s (100/260). Test alternate acceleration, lateral grip and turning separately before changing the overall pace. Sprint, fatigue and RPG multipliers rejoin only after fixed-stat feel is reviewed.

**Acceptance:** start, coast, 90° cut, reversal and board glide are repeatable; diagonals respect the intended speed cap; input feels responsive without instant high-speed direction changes; idle/glide/push poses remain distinct.

#### 5. Shooting and puck physics

Keep existing tap-to-shoot and directional passes first. Retain cancellable anticipation and release the puck once from a stable simulation blade anchor. Do not make projectile release depend on a changing drawn sprite offset. Follow-through should continue after release without freezing the skater.

For the first height-enabled shot, expose horizontal speed and launch elevation independently. Add a tunable fraction of the shooter's velocity at release, with an output cap. Start with low wrist-style shots; add slap shots, one-timers or charge input only as separately reviewed mechanics. The montage does not prove a charge system.

Integrate height and vertical velocity with gravity; handle the precise landing time and remaining substep. Use separate ground sliding drag, vertical landing restitution and board/post restitution. Suppress tiny repeated vertical bounces below a settling threshold.

Resolve the earliest eligible event over the puck's swept motion: boards/posts/crossbar/net, moving skaters, goalie volumes, ground landing and legal goal crossing. Evaluate height **at contact time**, including the puck radius. Use relative motion for moving actors so fast opposite-direction crossings cannot miss. Continue the remaining substep after a rebound with a bounded contact loop and overlap recovery.

Height needs explicit geometry and rules: under the crossbar can score; crossbar contact rebounds; above the bar cannot score. Net backs/sides/roof still block valid contacts, including shots from behind. Define an initial containment policy for pucks above boards before enabling such trajectories; a test-only preset can cap launch height below board clearance until an out-of-play rule is chosen. Do not let a 2D clamp teleport an airborne puck back into the rink.

Replace automatic capture of every skater contact with separate collection, block/deflection and miss outcomes based on height, relative speed and eligible stick/body regions. Make passes controllable at ordinary reception speeds; keep hard shots capable of producing rebounds. Avoid global pickup immunity that lets a newly released shot pass through a nearby defender. Any releaser grace should apply only to that releaser and end predictably.

**Acceptance:** grounded passes still work; shots show readable flight and shadow; high pucks cannot be collected by low blades; fast shots hit posts/crossbar/players correctly; carried and loose goals score once; no scoring from above or behind the net. Preserve action cancellation and Special gauge behavior.

#### 6. Bodychecking: contact with momentum

Give the normal check a short anticipation/active/recovery timeline with a forward shoulder/contact region. Resolve a hit on actual swept contact during the active window, once per target per action. Keep ordinary skating bumps separate from an intentional check.

Use closing speed along the contact normal rather than total speed:

```text
closingSpeed = max(0, dot(attackerVelocity - defenderVelocity, normalAttackerToDefender))
```

Base impulse and stagger/knockdown severity on that closing speed, contact alignment and bounded effective masses. Tune a small intentional-check contribution for low-speed readability. Side swipes should produce weaker outcomes than a committed approach; a stationary opponent behind the checker should not be hit by a forward check.

Use controlled fall/slide/get-up states rather than full character ragdolls. Separate players safely, transfer some impulse and release the puck once at the contact point when possession is lost. Give the loose puck a bounded combination of carrier momentum and contact impulse. Cancel queued shots on a successful disrupting hit. Prevent repeated pinning/stun resets from the same contact; define short recovery protection explicitly.

Keep Thunder Check's existing special behavior in its own rule path while normal checking is tuned. Changes to goalie protection, penalties and checking eligibility require their own design decisions.

**Acceptance:** head-on, glancing, rear, stationary and board-adjacent scenarios have distinct readable outcomes; no remote hits, repeat reward farming or penetration through nets/boards; interrupted releases and ownership remain correct.

#### 7. Goalies: positioning, commitment and rebounds

Use a state machine: **Track → Set → React/Save → Recover**, with separate **Hold → Distribute** for possession. Goalie motion remains controlled; the puck physically interacts with equipment regions.

Track a target on the angle between the defended goal center and the puck/carrier, constrained to a crease envelope. Let depth vary modestly with threat distance. Clamp lateral speed and acceleration; retain useful current velocity rather than teleporting to the target. Behind-net puck positions use a post-coverage rule instead of extrapolating a shot through the back of the goal.

On a released shot, predict approximate intercept time, lateral location and height. A reaction delay and finite slide commitment create an opportunity to beat the goalie with a lateral pass. Save volumes must follow the current pose over time; a goalie must not cover the whole net by changing animation after the puck passes.

Use simple pad, torso, glove/blocker and stick regions with height ranges. Start with low pad blocks and torso contact, then add glove/blocker distinctions. Reflect puck velocity relative to the moving surface and damp it by equipment tuning; bound outputs so saves cannot add unlimited energy. Favor reachable rebound directions as an explicit arcade assist, not an invisible guaranteed save.

Separate catching/covering from blocking. A catch requires an eligible region, manageable speed and the correct active state. A hard or poorly aligned contact rebounds. After a save, require recovery before another committed movement. Hold only a puck actually controlled; distribution chooses a valid teammate or safe clear and uses the existing release pipeline. Do not add a new whistle rule implicitly.

Difficulty changes reaction delay, movement limits and recovery within readable bounds, rather than a random goal veto. Initially use fixed attributes; later map current Skill/Speed/Strength rules with capped effects. Manual goalie control remains a separate unresolved feature.

**Acceptance:** centered low save, far-side shot, lateral pass then shot, rebound scramble, high shot, post/crossbar contact, behind-net play and distribution all resolve geometrically. A puck beyond active coverage can score. Goalie contact must precede a later goal crossing when appropriate, without an all-purpose collection circle.

#### 8. Delivery sequence — one feature at a time

| Phase | Concrete deliverable | Review gate |
|---|---|---|
| 0 — Reference and harness | Confirm supplemental-reference scope; build a resettable practice scenario with fixed stats, no Specials/fatigue, input recording and visible physics overlays | Current career regression baseline recorded; comparison conditions reproducible |
| 1 — Ground projection | Shared transform, depth-sorted pixel characters, grounded shadows, projected camera bounds | Both ends, behind nets, board occlusion and screen-edge markers visually checked; simulation outcomes unchanged |
| 2 — Skating | Push/coast/brake/turn tuning and readable lean/stride feedback | Empty-rink movement approved in play before adding opponents |
| 3a — Puck flight | Height, landing, height-aware world geometry and goal events | Ground passes plus high/low collision cases pass |
| 3b — Shots and receptions | Stable release anchor, inherited velocity, separate blocks/collections | Release timing, interception, rebounds and cancellation reviewed |
| 4 — Normal checks | Active contact window, impulse, fall/slide/get-up, possession drop | Head-on/glancing/board checks pass; Specials remain isolated |
| 5a — Goalie positioning | Crease envelope, angle/depth tracking, limited acceleration | Breakaway and lateral-pass movement reviewed |
| 5b — Saves | Save regions, commitment, recovery, catch/rebound/distribution | Shot scenario matrix passes without guaranteed catches |
| 6 — Integration | Reapply RPG/endurance; camera/animation/audio polish; compare ordinary and Special actions | Complete career/practice matches and progression regression pass |

Each row is a separate implementation/review unit. Extracting all systems up front or building a 3D rink is unnecessary for the first playable comparison. Best first coding task: **the isolated practice comparison harness**, followed by projection and skating.

#### 9. Verification and tuning

Use the existing `dotnet build`, `dotnet run --project tests/ProgressionTests.csproj` and Godot headless `--smoke-test` workflow when implementation begins. This document-only change does not run or claim those checks.

Add focused behavioral cases as each feature arrives: constant-tick replay, varied rendering rates, moving contact, height clearance, post-versus-goal ordering, one release per input, one reward per check, goalie recovery and ownership invariants. Use a persistent fixed simulation accumulator if exact tick replays are required; input commands receive a tick index, and visuals may interpolate. Pause must stop simulation, timers and pending releases together.

Record side-by-side practice clips for start/stop/turn, shot release, impact slide and goalie recovery. Compare normalized quantities such as body lengths traveled per second and goal-width crossing time; raw trailer screen pixels vary with zoom and camera movement. Never derive acceleration across a camera cut or use a cinematic close-up as ordinary gameplay timing.

Keep numeric tuning in one place and change one family of parameters per review. Automated checks establish consistency; actual keyboard/controller play establishes whether it feels like hockey. Final regression includes three periods, one XP award per period, saves, endurance/bench shifts, Specials, town entry/exit and both period attack directions.

#### Decisions needed before the affected implementation

1. Is Tape to Tape a presentation/feel supplement to NHL 94, or should a specific confirmed baseline requirement change?
2. Approve the proposed height-aware puck rules, normal check contact model and goalie recovery/catch behavior as their individual tasks begin.
3. Decide shot variants/inputs, out-of-play behavior and any manual goalie controls before adding them. Team size and fixed-rookie control are separate design questions; this plan does not change them.

These decisions do not block the analysis or the plan. Existing controls, career rules and confirmed design remain the starting point.

---

<a id="source-5"></a>
## Source 5: NHL94_VIDEO_STUDY.md

### NHL 94 hockey reference study

Study date: October 11, 2026. Purpose: provide reference context for the Hockey Heroes hockey-mode art, movement, puck simulation and camera overhaul.

Source: [patkajape — NHL 94 - Red Wings vs Blackhawks](https://www.youtube.com/watch?v=59TDFYJa_cE), runtime 10:32. The user identifies this as the Super Nintendo reference. The visible title/description names NHL 94 but does not independently identify the platform. Preserve the already-confirmed SNES baseline in GAME_DESIGN.md; do not substitute behavior from another version.

Method: browser playback with targeted seeks and successive visual samples in the neighborhoods listed below. This was not a continuous viewing of the complete video or a frame-by-frame physics measurement. Timestamps identify inspected neighborhoods. No input recording or underlying game code was available.

#### Observed presentation

| Sample | Direct visual observations |
|---|---|
| [2:09–2:28](https://www.youtube.com/watch?v=59TDFYJa_cE&t=129s) | Center-ice faceoff uses a referee inset. Play proceeds through neutral ice toward the lower goal. Players change facing and stick poses; a goal announcement appears over the rink, with celebration and a fallen player visible. |
| [3:09–3:27](https://www.youtube.com/watch?v=59TDFYJa_cE&t=189s) | Successive views move from the lower defensive zone, through neutral ice with a detached puck, to the upper goal area. The puck is a small dark oval, clearly distinct from the much larger player sprites. |
| [5:21–5:38](https://www.youtube.com/watch?v=59TDFYJa_cE&t=321s) | Play near the right boards progresses through neutral ice and the upper goal area; a later sample shows the lower goal area. Player silhouettes and stick direction change with the action. Rink scenery scrolls while the score and clock stay anchored. |
| [7:23–7:25](https://www.youtube.com/watch?v=59TDFYJa_cE&t=443s) | Second-period end uses a referee inset and Period Over message. Side benches, boards and surrounding seating remain part of the scene. |
| [8:25–8:28](https://www.youtube.com/watch?v=59TDFYJa_cE&t=505s), [9:29–9:32](https://www.youtube.com/watch?v=59TDFYJa_cE&t=569s) | Third-period lower-goal views show different skating/action poses, goalie positioning and crowded goalmouth play. Players overlap spatially without losing their upright character silhouettes. |

##### Rink and camera

- The rink's long axis runs vertically on screen; goals occupy the upper and lower ends. It is an elevated oblique view: the ice is viewed from above, but players, boards and nets have visible height/front or side faces. Calling this a strict overhead view would omit those depth cues.
- The camera shows a portion of the rink. It scrolls lengthwise through the zones and sideways toward play near the boards. The position of center markings, goals and board edges changes between samples; the full rink is not fitted into one stationary screen.
- Player scale appears stable across the inspected gameplay samples. They do not shrink as they travel toward the upper end. The samples do not establish a specific projection matrix or internal rendering technique.
- Rounded rink corners, yellow board bases, glass/supports, bench openings, spectator rows, ice markings and visible net depth make this an indoor arena. Open ice stays comparatively quiet so the puck and players are readable.
- The near and far goals have different visible faces. There is visible ice behind the nets. Hockey Heroes therefore needs goal objects inside the rink, rather than treating an opening in an outer boundary as the entire goal.
- Clock/period appears at lower left and team scores at lower right. These remain screen-space overlays during camera movement. A star beneath a selected player and a nearby number/position label provide another layer of identification.

##### Player sprites and motion

- Upright, compact hockey silhouettes use helmets, shoulders, jerseys, dark skates and extended sticks. Contrasting uniforms distinguish teams even in traffic.
- Directional body and stick poses convey facing. Skating poses suggest pushing/leaning; goalies have a wider equipment silhouette. Falls and celebrations are distinct poses, not merely recolored standing players.
- The visual motion reads as skating and gliding through directional changes. However, footage without input telemetry cannot distinguish held input from coasting, or establish acceleration, braking, reversal time or turning radius. The existing design's momentum/skidding reference comes from its separately cited SNES manual; these samples do not numerically validate it.
- Sprite facing, action pose and travel velocity should be treated as separate concerns in the proposed implementation. A character can be drawn upright on a flat collision plane; the artwork does not require a 3D physics conversion.

##### Puck and contact

- The puck is much smaller than a skater and visually independent during loose travel. Near possession it is read in relation to the stick, rather than centered in the character's torso.
- Successive samples show detached puck travel across space while players pursue or reposition. A carried puck and a released puck need different presentation and simulation states.
- Goalmouth traffic and a fallen skater show why grounded contact, action poses and overlap order matter. These observations do not establish a collision impulse formula or the exact input that caused a fall.
- These samples do **not** isolate a board rebound sufficiently to estimate restitution, nor determine friction, maximum shot/pass speeds, reception radius, lift height, post response or goalie save probability. All remain measurement targets, not source-derived constants.

#### Comparison with the current Hockey Heroes prototype

Verified against src/HockeyMatch.cs, src/Main.cs and project.godot during this study.

| Area | Current implementation | Proposed overhaul target |
|---|---|---|
| Rink/view | Horizontal rink drawn at fixed screen coordinates, entire playing surface visible | Vertical rink larger than the gameplay viewport; elevated arena artwork; bounded camera scrolling on both axes |
| Skating | Velocity is assigned directly from desired movement each tick; facing follows nonzero input | Separately tunable acceleration, coasting, braking/reversal and turning, validated against controlled SNES reference scenarios |
| Players | Three skaters and one goalie per side; fixed rookie control; shared procedural Person drawing | Original directional hockey sheets, distinct goalie/action states and clear ground anchors; team/control format remains an existing unresolved design decision |
| Possession | Puck attached at a fixed offset from owner; other owners use team attack direction | Stick-relative visual anchor per facing/action with one authoritative owner; tune reception/contests separately |
| Loose puck | Velocity decay, axis-aligned board bounces and endpoint pickup checks | Independent motion with rounded boundaries, posts/net geometry and continuous fast-puck collision checks; tune constants after observation |
| Goals | Scoring when puck crosses left/right outer boundary within a Y range | Visible upper/lower goal mouths with interior goal-line crossing, playable space behind nets and separate posts/boards |
| HUD | Scores, clock, Special/energy bars and instructions drawn in the fixed view | Screen-space score/clock and control marker; review available play area before choosing final HUD placement |
| Pixel scale | 640×360 internal viewport with nearest texture filtering | Choose an original sprite grid and sprite-to-rink scale using one representative scene before commissioning full asset sets |

#### Proposed implementation sequence

These are planning recommendations, not approval to change core mechanics.

1. **Rink, scale and camera proof:** one original arena mockup, a representative skater/goalie/puck and a scrollable vertical rink. Check both end zones, boards, behind-net space, HUD coverage and overlap order. Decide pixel grid/aspect ratio from the playable composition, not the YouTube screenshot dimensions.
2. **Skating baseline:** a fixed-attribute practice scene for starting, holding speed, releasing input, 90-degree turns, reversal and contact. Tune one behavior at a time. Validate facing/action art independently of velocity.
3. **Puck baseline:** loose glide, directional passes, normal shots, reception, angled board rebounds, corners, posts and goals. Test rapid movement so the puck cannot skip collision or scoring boundaries.
4. **Team play and normal actions:** resolve existing control/team-format decisions, then validate switching, defensive actions and goalie behavior in separately reviewed changes. Integrate Specials and RPG modifiers after the normal reference baseline is stable.

Use original Hockey Heroes art with documented provenance. This video supplies composition and behavior references, not extracted sprites, logos or rink textures. Do not infer native sprite sizes from compressed/upscaled playback.

#### Measurements still needed

Use reproducible reference inputs where possible: time/distance to speed, coast distance, stop/reversal time, turn path, diagonal speed, pass/shot travel time, angled board rebound, pickup/interception behavior and goal/post response. Track world motion relative to rink markings so scrolling is not mistaken for player velocity. Camera follow target, thresholds, lag, edge clamps and any look-ahead remain TBD; the samples establish scrolling behavior, not its algorithm.

No gameplay code or core mechanics changed as part of this study. No runtime tests were needed for this research document; implementation claims above were checked by source inspection.

---

<a id="source-6"></a>
## Source 6: HOCKEY_ONLY_PROTOTYPE.md

### Hockey-only prototype

Double-click **Play Hockey Prototype.cmd**, or run:

```powershell
powershell -ExecutionPolicy Bypass -File tools/Play.ps1 -HockeyOnly
```

The launcher builds C#, imports assets and opens `scenes/HockeyPrototype.tscn` directly on the ice. In Godot, open that scene and press **F6** to play it. The normal career launcher and main scene remain available.

This is a dedicated place to playtest the existing hockey gameplay. It shares `HockeyMatch`, `HockeyMotion`, rink collisions, camera and character/arena presentation with the career game, so future gameplay fixes apply to both. It does not load the town, career menus or saved player data.

#### Current playtest rules

- Comets versus Foxes: three skaters and an automatic goalie per team. Control rookie **#11**, identified by the gold star. Blue rings identify your team; orange rings identify opponents.
- Three 60-second periods. Attack up in periods one and three, down in period two. Goals stop play and reset the faceoff. Regulation ties finish as ties; replay from results.
- Existing momentum skating, directional passing/shooting, checking, interceptions, board/post/net collision, goalie distribution, special pass/check remain active. This change does not retune those mechanics.
- Each restart/rematch starts at level 1 with all five attributes (Speed, Defense, Shoot, Pass, Special) at 1 and zero score, XP and special gauge. Period XP is earned in memory and displayed on the HUD/results. Level-ups do not automatically change attributes, and this scene has no stat-allocation menu, keeping comparisons repeatable.
- XP and results are session-only. There is no match-completion career bonus, league qualification or career saving in this scene.

#### Controls

| Action | Key |
|---|---|
| Skate / aim facing | WASD or arrows |
| Sprint | Shift |
| Shoot / pass / check | Z / X / C |
| Existing special pass / check | F / R |
| Pause / resume | Esc |
| Controls help / resume | F1 |
| Restart prompt | F5 |

Pause and controls freeze the simulation, clock and pending action releases. F5 opens a restart confirmation; choose Keep Playing or Restart Match. The final score offers Play Again and Quit. There is no town return step.

#### Validation

Build and progression tests:

```powershell
dotnet build
dotnet run --project tests/ProgressionTests.csproj
```

With a Godot .NET executable, run the dedicated scene checks and existing game regressions:

```powershell
& $env:GODOT_EXE --headless --path . res://scenes/HockeyPrototype.tscn -- --smoke-test
& $env:GODOT_EXE --headless --path . -- --smoke-test
```

The dedicated checks exercise direct launch, shooting, paused input/clock blocking, controls, restart/cancel, bench/return, all three period rewards, fixed attributes, results and rematch. They also run the shared gameplay checks for movement, puck collision, scoring, goalie contact and action handling. Render review uses `--capture-hockey-prototype` on the dedicated scene and writes rink, controls, pause and results PNGs under `.godot/`.

Known limitations carry over from the existing hockey simulation: simple AI, fixed rookie control, placeholder action/goalie poses, keyboard input, no audio, one-timers, full penalties/offside/icing, overtime or online play. This is not a completed NHL 94 rules implementation. Team-control/rules changes and physics tuning remain separate reviewable tasks.

October 25 RPG reset: endurance, fatigue penalties and recovery shifts are removed. Sprint remains available without a resource cost; B has no action. Defense, Pass and Special effects await further design.

---

<a id="source-7"></a>
## Source 7: HOCKEY_GAMEPLAY_UPDATE.md

### Hockey gameplay update — October 11, 2026

This records the earlier no-art-change update. Subsequent user authorization enabled the [arena and sprite update](#source-8), replacing the horizontal rink and procedural hockey characters described below.

Subsequent October 11 change: Special Shot has been removed at the user's request pending NHL 94 gameplay feel. The historical Special Shot behavior/testing below no longer describes an available move. Normal shots, Special Pass and Special Check remain.

Requested scope: apply gameplay context from `NHL94_VIDEO_STUDY.md`, preserving all existing art and sprites and adding necessary skating/passing/shooting animation. The document's planning recommendations are reference context, not authorization to implement its entire overhaul.

#### Implemented behavior

- Skaters accelerate to speed, coast after input release, and brake before reversing. Desired facing and travel velocity are separate: aiming can change while momentum still carries the skater the other way. Directional input is normalized; pressing both W and Up does not create extra diagonal speed.
- Hockey runs in Godot's fixed physics callback, with simulation substeps no longer than 1/120 second. Menus and pause suspend simulation and animation together. Town movement stays in its original frame loop.
- Possession follows the animated stick blade instead of a torso offset. Puck anchors stay inside existing board limits. Only one skater owns the puck.
- Passes select an eligible wing in the facing cone, prioritize alignment and lead the receiver's velocity. With no eligible wing, a pass travels freely in the facing direction. A completion reward requires the selected receiver to actually collect it.
- Shots travel in the facing direction rather than automatically aiming at the goal. Passes have 60 ms anticipation and 240 ms total action time; shots have 120 ms anticipation and 380 ms total action time. Aim is committed at activation. Duplicate inputs cannot replace the queued release or generate additional pucks. Checking/stunning the carrier cancels a pending release.
- The Special gauge is spent only on a successful release. An interrupted Special windup leaves the gauge intact. Existing gauge rewards, RPG modifiers, stamina, XP and match progression remain in place.
- Loose pucks use segment-circle reception checks, resolving the earliest eligible receiver before board/goal crossings. Fast shots cannot leap through a goalie. Goals use the interpolated crossing position at the existing goal line, then stop play; input during faceoff cannot release a puck or spend a Special.
- Goalies collect and distribute pucks through the same animated passing action.
- Existing body shapes, colors, skate rectangles and stick lines animate without new assets. Bodies remain upright, mirror for left/right facing, skate pieces alternate during pushes, and sticks swing through anticipation and recovery. Coasting has no active skate push. Overworld drawing, rink art, HUD art and all asset files remain unchanged.

#### Prototype tuning and boundaries

Acceleration 260, reversal braking 390, coast drag 65 world units/second squared. These are adjustable **prototype values**, not measurements of NHL 94 SNES. Original speed, puck friction and board restitution values remain prototype tuning. Automated checks establish reproducibility, not authentic numerical parity with the source game.

This update retains the horizontal rink and goal openings, fixed view, rookie control, three skaters plus goalie per team, sixty-second periods, unchanged attack directions and existing Specials. Vertical rink/camera, behind-net play, rounded boards/posts, player switching, lineups, shot variants/one-timers, manual goalie control, penalties and overtime need separate scoped work. No new art or sprites were created or edited.

#### Validation

`dotnet build` and the progression console suite pass. Godot 4.7.2 .NET headless checks cover acceleration, cruise, coasting, reversal, facing independence, diagonal normalization, equivalent 30/120 Hz integration, shot anticipation, timed direction, input spam, interrupted Specials, all three Specials, actual pass receptions, opposing shot interceptions, fast-puck catches, goalie-before-goal ordering, board rebounds, goal stoppages, town entry/exit and a complete AI match with exactly three period XP awards.

The `--capture-hockey-animation` option renders a deterministic skating/coasting/shot/pass sequence into ignored `.godot/hockey-motion-*.png` files for animation inspection without modifying the user's career save. Numerical matching to SNES gameplay and human balance testing remain open.

---

<a id="source-8"></a>
## Source 8: HOCKEY_ARENA_UPDATE.md

### Hockey arena and sprite update — October 11, 2026

**October 25 visual follow-up:** The screenshot-guided indoor arena redesign adds fuller spectator seating, paired team benches, opposite officials' boxes, updated markings and layered boards/glass, with a wider 0.8-scale hockey view. Physical rink geometry and match rules remain unchanged. See [ARENA_REDESIGN.md](#source-9) for the current renderer, captures and verification; the original implementation notes below describe the October 11 state.

The user authorized the visual changes previously deferred by the no-art-change constraint. This implements the vertical rink, scrolling camera, interior goals/behind-net space and dedicated hockey characters described in the video study. It does not declare the full NHL 94 SNES gameplay baseline complete.

Subsequent October 11 change: Special Shot functionality, boosted shot speed, gauge spending and Q activation were removed at the user's request. It will be redeveloped after hockey feels like NHL 94. Normal shooting and its art/animations, Special Pass, Special Check, the gauge and career saves remain. Build and gameplay checks passed, including Q inactivity and normal shots retaining normal speed with a full gauge. Interrupted-Special coverage now uses Special Pass.

#### Presentation and assets

- Original indoor arena on an 800×1200 world canvas; 608×1072 playing surface with rounded corners. Raised white boards, yellow bases, glass/supports, spectator rows, benches, fictional markings and distinct near/far net depth provide an elevated view. Upright characters keep constant pixel scale across the rink.
- Bounded camera scrolls on both axes, follows the puck and blends a little toward the rookie. Margins keep the puck visible during fast travel. The rookie has a ground star, number label and screen-edge indicator during long passes. Scores, period, attack direction, stamina, Special and instructions stay fixed in screen space. Rendering remains 640×360 with nearest filtering.
- Two original 440×384 imported sprite atlases, eight facing rows and eleven pose columns. Each frame is 40×48 with ground anchor (20,40). Skaters have helmet shading, directional face/back details, jersey stripes, skate pushes, pass, shot anticipation/release, check, prone and celebration poses. Goalies have wider pads, masks, gloves and ready/distribution states. Goal celebrations animate a small hop during the stoppage.
- Editable SVG sheets are generated deterministically by `tools/generate_hockey_art.py`. Godot rasterizes these code-native pixel shapes; no video frames, NHL logos, Nintendo sprites or third-party art are used. Provenance and frame mapping are in `assets/art/hockey/README.md`.
- Ground-Y sorting orders characters, puck and net fronts. Stick/puck anchors share action state and facing.

#### Geometry integration

`HockeyRink.cs` shares measurements with rendering, skating clamps, puck collision and tests. Goal mouths are at Y=144 and Y=1056 inside the boards, with 24-unit deep solid backs/sides and solid posts. Skaters can move behind either net but cannot move through its body. Sweeps resolve receivers, rounded boards, posts/net backs and goal crossings in order, reflecting remaining travel after impact. A shot from behind rebounds without scoring; loose or carried pucks crossing from the front inside the opening score once.

AI positioning, passing and shooting use the vertical goals. Comets attack up in periods one/three and down in period two; goalies switch defending ends. A goal pauses for a 1.2-second celebration, then returns to center faceoff. XP formulas, rookie control, team size, action timing/Specials, stamina and career saves remain in place. Overworld artwork and sprites are unchanged.

#### Validation and remaining scope

Build: zero warnings/errors. Progression/save-serialization tests pass. Godot gameplay checks cover imported atlas dimensions, eight facings and pose selection, camera bounds at both ends, rounded corner rebounds, posts, back-of-net rebound/no goal, behind-net skating, carried/loose goals, period direction/scoring and goalie repositioning, plus momentum/action/Special/pass/interception/town/full-match regressions. Checks run on Godot 4.7.2 .NET and the launcher's Godot 4.6 .NET runtime.

Center ice, both end zones, a corner, action/fall/celebration compositions and the animation sequence were rendered and inspected. Capture helpers use no career saves: `--capture-arena` writes `.godot/arena-{center,upper,lower,corner,poses}.png`; `--capture-hockey-animation` writes action frames.

Scale, camera blend, collision radii and art proportions are original prototype choices, not measured SNES constants. Switching/full five-skater lineups, penalties, icing/offside, one-timers/shot variants, manual goalie controls and overtime still need separate work. Human playtesting and balancing remain necessary before claiming source-game parity.

---

<a id="source-9"></a>
## Source 9: ARENA_REDESIGN.md

### Hockey-mode arena redesign — October 25, 2026

**Current fixture/net refinement:** [PRO_ARENA_REFINEMENT.md](#source-10) records the user's subsequent professional-material pass, curved nets and simplified faceoff markings. It supersedes the wooden fixture finish described below while retaining the same playable geometry.

**Subsequent style iteration:** The user requested the richer GBA overworld finish instead of the flat SNES-style rendering. The active arena now uses [generated indoor sprite materials and furniture](../assets/art/indoor_rink_gba/README.md): frosted blue ice, shaded ivory/oak boards, expressive spectator modules, reserve benches, officials and mesh. Markings, shared geometry, the camera and gameplay from this redesign remain in place. Images linked below record the earlier geometric version; the linked asset guide contains current GBA-style captures.

The user's supplied overhead rink screenshot guided the indoor venue's composition: lengthwise ice, rounded ends, larger paired faceoff circles, side and end seating, both team benches along one side, and officials'/penalty boxes opposite. The visual treatment follows Hockey Heroes' established 16-bit RPG direction: softened ice blue-green, warm ivory boards, muted coral/blue markings, small colorful spectators, upper-left material highlights and layered 2.5D glass/net depth. The center crest is an original comet; no source-game logo, screenshot pixels or external assets were imported.

#### Implemented

- `src/HockeyArenaArt.cs` owns the venue artwork: stepped seats with aisles and lights, corner structural wedges, two team benches with seated figures, opposite boxes/scorer's desk, ice reflections/scratches, faceoff/neutral markings and original center-ice crest.
- Boards have a golden kickplate, ivory face, shaded cap, translucent glass and upright supports. Near-end boards/glass render after the players and puck, so objects near that wall sit behind its foreground layer. Net bases and goal fronts keep their existing ground-Y ordering.
- Creases are semicircular and point toward the playing area. Goals retain their shared physical mouth/post/back coordinates, with a separate raised mesh roof, frame highlights and contact shadow.
- Hockey camera renders at **0.8 scale**: an **800 × 345** world-unit view inside the existing 640 × 276 gameplay area. Both side stands now fit on screen; the camera still follows play vertically and clamps within the same 800 × 1200 world. HUD size and placement remain in screen space. Camera projection is shared with the offscreen-player indicator and regression checks.
- The finished character adapter accepts an optional world scale, preserving its existing town/default rendering. Hockey characters, procedural action/goalie fallbacks, puck, selection rings and rink artwork share the same scale.
- Benched players are drawn at the corresponding new left-side bench. This is a display mapping; simulation bench positions, endurance recovery, saved return positions and input behavior remain unchanged.

`HockeyRink.cs`, match physics, rules, AI, collision bounds, goal detection, period timing, XP and saves were not changed. This is an active hockey-mode renderer update; the standalone skating preview and town presentation were preserved.

#### Verification

- `dotnet build --no-restore`: zero warnings/errors.
- `dotnet run --project tests/ProgressionTests.csproj --no-restore`: passed allocation, XP, persistence/migration, fatigue and recovery checks.
- Godot 4.7.2 .NET `--headless --path . -- --smoke-test`: passed imported character/scenery assets, camera containment/projection, existing skating/puck/net/goal/period behavior, bench recovery/return, complete match, town routes and input regressions.
- Rendered and visually inspected center ice, both ends, a rounded corner, action/fall/celebration poses, both benches and an 800 × 1200 complete venue overview. Capture run exited successfully with no rendering errors.

Reproduce the visual checks with the normal graphical Godot executable: `--path . -- --capture-arena`. It writes `.godot/arena-{center,upper,lower,corner,poses,benches,overview}.png` without saving career progress. The overview omits actors/HUD so the complete venue can be compared directly with the reference.

Saved review images: [center ice](screenshots/arena-redesign-center.png), [upper end](screenshots/arena-redesign-upper.png), [lower end](screenshots/arena-redesign-lower.png), [benches](screenshots/arena-redesign-benches.png), [complete rink](screenshots/arena-redesign-overview.png).

The 0.8 presentation scale intentionally reveals more of the arena and makes players smaller on screen. Art scale and crowd density remain visual tuning choices; human playtesting is still needed to evaluate long-session readability. No new hockey rules or 3D projection system are implied by the reference.

---

<a id="source-10"></a>
## Source 10: PRO_ARENA_REFINEMENT.md

### Professional arena fixtures, nets and faceoff marks — October 25, 2026

The user supplied two hockey references and requested cleaner faceoff circles, rounded nets and a professional indoor arena finish without wooden/grained structures. This updates the live hockey renderer while retaining the established GBA-style raster shading, ice, characters and 2.5D depth.

#### Changes

- The four end-zone faceoff circles contain a center dot and short paired outside hashes. The internal rectangular hash/grid motif is removed.
- Each net has an elliptical/D-shaped rear outline, mesh clipped to its curved roof, curved rear nylon courses and rounded mouth-pipe corners. Bases render before skaters and front pipes retain ground-Y ordering. No rectangular mesh image spills outside the curved cage.
- Six new v3 AtlasTextures select professional fixtures from two generated atlases: navy molded seats on concrete/steel terraces, smooth white HDPE boards with yellow plastic kickplates, and white/gray steel/polymer benches and officials' boxes. Glass uses lower-opacity neutral tint and silver/charcoal posts; brown structural trim is removed. Natural hair/skin and hockey stick shafts retain their colors.
- The v2 ice and nylon mesh remain active. Prior wooden fixture art/resources are preserved; `IndoorArenaSprites.cs` explicitly loads the six v3 fixtures and two retained v2 materials.

`HockeyRink.cs`, goal mouth coordinates, the existing net collision envelope, behind-net clearance, camera, skating/puck physics, rules, scoring, bench shifts and saves are unchanged. The rear curvature is an artwork silhouette within the original goal envelope, not a new collision/goal-scoring model.

#### Validation

C# build passed with zero warnings/errors. Godot 4.7.2 imported both new PNGs and loaded all active atlas regions. The existing smoke suite covers region bounds, character assets, camera, puck/net/post contacts, behind-net skating, scoring/period changes, endurance shifts and town routes/input. Progression/save checks passed.

Graphical capture exited successfully with no rendering errors. Reviewed both goal directions, faceoff circles, crowd orientation, professional boards/glass, bench shifts, corner play and fallback action/goalie poses. Reproduce with `--path . -- --capture-arena` using the graphical Godot executable; captures do not save career progress.

Current views: [upper end](screenshots/pro-arena-upper.png), [lower end](screenshots/pro-arena-lower.png), [center ice](screenshots/pro-arena-center.png), [benches](screenshots/pro-arena-benches.png), [complete rink](screenshots/pro-arena-overview.png).

Material art was edited with built-in imagegen; PNGs were copied unchanged. Python/Pillow only inspected alpha and region bounds and wrote text resources. See [asset notes](../assets/art/indoor_rink_gba/README.md) and [exact prompts](../assets/art/indoor_rink_gba/PROMPTS-V3.md). Generated edges can retain minor alpha fringe; in-game captures were reviewed at the active 0.8 presentation scale. Final feel/readability still benefits from human playtesting.
