# Hockey Heroes — Progress report context / index

Updated October 29, 2026 (UTC). The user requested three separate active reports. This file is their navigation/context index, not a fourth delivery backlog. Update the relevant report(s) on subsequent requested scans; keep shared counters consistent without double-counting work.

| Active report | Scope | Current recorded progress |
|---|---|---|
| [Exhibition Mode prototype](EXHIBITION_PROGRESS_REPORT.md) | Standalone hockey; no Story/economy/locations/audio requirement | Original sprints **13/100 = 13%**; separate rink integration **12/12 = 100%**; next Sprint **14** |
| [Full-game prototype](FULL_GAME_PROTOTYPE_PROGRESS_REPORT.md) | Functional Story/RPG sample; only **Frontier, Normund** and **Superior, Hisery** playable; **no audio required** | Playable new-story cities **0/2 = 0%**; customization/economy **2/60 = 3.3%**; reusable movement, progression and saves already exist; final gates **0/8** |
| [Full game](FULL_GAME_PROGRESS_REPORT.md) | Complete approved RPG/story/Specials/items/audio/SFX/locations and final release content | Shared CE **3.3%**, original hockey ledger **13%**; full-game story workstreams **0/10**, audio **0/8**, final acceptance **0/10** |

A final gate being 0% means no complete final acceptance pass is recorded, not that the current prototype has no working gameplay. Source sheets, existing foundations and fully finished features have separate percentages inside each report. Do not average overlapping sprint/source/checkpoint percentages into a game-wide estimate. Scope estimates and unapproved mechanics remain explicit.

## Scope instructions for future updates

- **Exhibition prototype:** no audio assets, audio settings or sound acceptance gates. Preserve the original hockey sprint ledger; don't mark whole mixed-scope tickets complete just because audio is excluded.
- **Full-game prototype:** exactly two playable cities: Frontier in Normund and Superior in Hisery. Both provinces are labels, not extra cities. No other-city exploration, music/SFX playback or collectible-audio system is needed for prototype acceptance. Agree the minimal campaign/system sample before implementing unresolved mechanics.
- **Full game:** keep all intended Story/RPG systems, approved Specials, catalogues, production content, audio/SFX and approved location expansion. Sixteen named cities in the world plan does not imply sixteen playable maps.
- Prototype exclusions defer work to the full game; they do not cancel final requirements. No silent gameplay changes or automatic backlog execution are authorized by a report update.
- Preserve implemented behavior and historical evidence. Percentage changes must name numerator, denominator and scope. Completed source-art delivery is not completed runtime animation.
- Inspect current files, source, tests and relevant records on a scan. Read a referenced chat with `read_thread` before relying on its latest contents. Record fresh versus historical testing honestly.

## Shared evidence and next work

Source baseline: `9e4a7d2` plus existing uncommitted work. The most recently inspected automation log records all six suites succeeding October 29, 2026 at **16:12:32–16:12:33 UTC**. The report split did not rerun tests, decode/edit assets, launch the game or perform hardware/visual acceptance.

Recorded next development tickets: **Exhibition 14** (movement tuning) and **CE-03** (versioned schema). Current ordinary hockey, town movement, three-slot saves and level/stat progression remain working foundations. No Frontier/Superior campaign conversion, economy, new Special progression or audio runtime is claimed complete.

Newer [story planning context](STORY_LORE_PROTOTYPE_AND_FULL_GAME_TASKS.md) resolves the capital, school/opening and several cast decisions. It supersedes the old combined report's unresolved-capital wording. Prototype city/audio boundary is now confirmed; campaign duration, fixture policies, minimum Special/mini-game set and catalogue specifics still have unresolved gates.

## Planning and asset sources

- [Exhibition backlog/policies](EXHIBITION_CONTEXT.md), [remaining sprints](EXHIBITION_REMAINING_SPRINTS_AND_RINK_PLAN.md), [rink integration](exhibition-rink-art/RA01-12_integration.md).
- [Customization/economy sprints](CUSTOMIZATION_ECONOMY_ONE_HOUR_SPRINTS.md), [art deliveries](CUSTOMIZATION_ART_ASSETS_REQUIRED.md), [economy decisions](ECONOMY_RULES_CE02.md).
- [Story prototype/full-game preparation](STORY_LORE_PROTOTYPE_AND_FULL_GAME_TASKS.md), [overworld art](RPG_OVERWORLD_ART_BACKLOG.md), [UI screens](UI_UX_SCREEN_INVENTORY.md).
- [Audio/SFX backlog — full game only](AUDIO_SFX_ASSET_BACKLOG.md).
- [Preserved pre-split combined report and history](PROGRESS_REPORT_HISTORY_2026-10-29.md). Historical scopes/percentages there are not current acceptance requirements.

## Referenced chats previously read

These references remain sources of requirements; reading dates and extracted content are preserved in the history. A future update must reread a chat before relying on changed contents.

- [Add Hockey Heroes story and lore](thread://01a184fe-949e-79c2-b44c-cac7e547f25d?hostId=local).
- [Add character appearance customization](thread://01a184e8-bc51-73b3-b964-cdc768342706?hostId=local).
- [Add store item list](thread://01a184fe-f7af-7a21-b016-a6b8bead46ed?hostId=local).
- [List needed overworld assets](thread://01a184d7-5965-7e31-8aac-12915d03e74a?hostId=local).
- [Plan Hockey Heroes UI screens](thread://01a184d9-1b43-71a3-b191-02de3afaf468?hostId=local).

## Change log

| Date (UTC) | Change | Validation |
|---|---|---|
| 2026-10-29 | Split combined report into Exhibition prototype, two-city full-game prototype and full game. Removed prototype audio gates; retained final-game audio/collectibles. Preserved historical report and original counters; replaced stale story-decision percentage with content workstreams | Local source/planning review, report link/checklist/percentage and whitespace checks; no new gameplay tests |
