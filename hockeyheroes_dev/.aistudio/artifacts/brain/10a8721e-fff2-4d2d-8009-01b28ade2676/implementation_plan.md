# Hockey Heroes: Three-Tier Development Progress Report Specification

This specification documents the **Three-Tier Development Progress & Status Report** updated based on `PROGRESS_REPORT_CONTEXT_60f3c28f.md` (**October 29, 2026 UTC, commit `9e4a7d2`**).

***

## 1. The Three Active Report Tiers & Scope Index

| Active Report Tier | Document Reference | Scope Summary | Audio Requirement | Headline Progress | Next Immediate Ticket |
|---|---|---|---|---:|---|
| **Exhibition Mode Prototype** | `EXHIBITION_PROGRESS_REPORT.md` | Standalone tape-to-tape hockey simulation; no Story, economy, or overworld locations required | **Excluded** | **13 / 100 Sprints (13.0%)**<br/>Rink Art: 12/12 (100%)<br/>Sheets: 44/44 | Sprint 14: Movement Tuning (Accel 260, Braking 390, Drag 65) |
| **Full-Game Prototype** | `FULL_GAME_PROTOTYPE_PROGRESS_REPORT.md` | Functional Story & sports-RPG campaign sample; bounded strictly to **Frontier (Normund)** and **Superior (Hisery)** | **Excluded** | **0 / 2 Playable Cities (0.0%)**<br/>Overworld: 7/9 (77.8%)<br/>CE: 2/60 (3.3%)<br/>Gates: 0/8 (0%) | Define minimal 2-city campaign flow & CE-03 customization schema |
| **Full Game (Commercial Release)** | `FULL_GAME_PROGRESS_REPORT.md` | Complete approved RPG, multi-year story campaigns, Specials, items, full audio/SFX, 16-city lore, and console release content | **Required for Release** | **0 / 10 Story Streams (0.0%)**<br/>Audio: 0/8 (0%)<br/>Release/Ports: 0/11 (0%) | Author chapter manuscripts, full audio production & Sound Cues |

***

## 2. Key Scope Reconciliations & Differences Applied

1. **Explicit Audio Boundary:**
   - **Exhibition Prototype:** Audio assets, sound settings, and audio acceptance gates are **excluded**.
   - **Full-Game Prototype:** Music, SFX playback, and audio settings are **excluded** from prototype acceptance.
   - **Full Game:** Audio and SFX (8 groups, `0/8`) is strictly a **commercial release requirement**.

2. **Two-City Story Prototype Boundary:**
   - Bounded to exactly two playable cities: **Frontier in Normund** (home school) and **Superior in Hisery** (rival city).
   - The remaining 14 cities are world lore, not extra playable prototype maps.

3. **Story Planning Resolutions:**
   - Capital hierarchy is **resolved**: Superior in Hisery, Marmalade in Normund.
   - 14-year-old school opening and 3 player-named leads (protagonist, best friend, rival cousin) are confirmed.

4. **Security & Access Control:**
   - Export access is restricted exclusively to **`jesseianhayward@gmail.com`**.
   - Unauthenticated sessions return an explicit **"Unauthorized User"** message and modal guard.
