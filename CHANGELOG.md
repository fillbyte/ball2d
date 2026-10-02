# Changelog

## 0.4.0-next.1 — 2026-10-03

- Breaking: match the live game's engine identity `5532af7ca9da3779ea23` and
  gameplay wire protocol 6. Hosts on `0.4.0-next.0` and earlier no longer share an
  engine or protocol with current web players. `core.wasm` adds the rollback
  support current players use and includes collision fixes; recordings from
  earlier engine builds are rejected.
- Add stadium surfaces: 36 `family/variant` ids across `grass`, `asphalt` and
  `felt`, listed by `listSurfaces()`. The `surface` room setting,
  `room.setSurface()`, `room.getSurface()` and the `onSurfaceChange` hook draw any
  stadium on any surface for every player, live and recorded as
  `Replay.surfaces`. A stadium file's `bg.type` sets its default surface, which
  `validateStadium()` reports. Physics is unchanged by the surface.
- Breaking: the bundled layouts are Small, Small Rounded, Classic, Rounded, Big,
  Big Rounded, Huge and Huge Rounded. `Easy`, `Big Easy`, `Asphalt`,
  `Asphalt Arena`, `Meadow`, `Training Green`, `Courtyard` and `Street Five` are
  removed; draw a layout on another surface instead. Add `listStadiums()` and
  `StadiumInfo` with IDs, names, dimensions and suggested team sizes.
- Add `room.getMatchStatsSnapshot()` and the `MatchStats*` types: in-memory
  per-team and per-player counters, heatmaps, distance, coverage, timeline and xG
  summary for the current match, never persisted. SDK host recordings carry the
  commentary policy as `Replay.commentary`.
- Commentary adds clearance, blocked-source, per-player goal count and anecdote
  families (`dullMomentMs`, `maxAnecdotesPerMatch`); match intelligence adds
  `clearance`, `blocked-at-source` and `scorer-tally` events, kick `trajectory`
  data and matching policy fields.
- Breaking (types): xG features move to the `shot-trajectory-v1` revision with ten
  values; `MatchXgVector` is `readonly number[]`, and models reviewed for the
  earlier four-value vector no longer match.
- `maxPlayers` clamps to 2–32. Declarations state defaults and accepted ranges.

## 0.4.0-next.0 — 2026-09-29

- Breaking: resets the pre-launch room protocol and gameplay wire protocol to 1,
  and rebuilds the engine to identity `2e6cea39a72fef7f7558`. Hosts on
  `0.3.2-next.1` and earlier no longer share a protocol or engine version with
  current web players; upgrade alongside the web game before you deploy.
- Physics (`core.wasm`) and the public API are otherwise unchanged from
  `0.3.2-next.1`.

## 0.3.2-next.1 — 2026-09-29

- Same engine identity `98c92c27828179bc4258` and room protocol as 0.3.2-next.0.
- Hosts now send a bounded, about 1 Hz match-statistics summary (heatmap cells and
  distance) that current web guests show; older guests ignore it.
- Carry the current runtime fixes: interrupted commentary fades in instead of
  overlapping, kickoff lines load first, and match intelligence exposes the frame a
  host observed to local consumers.

## 0.3.2-next.0 — 2026-09-28

- Rebuild the SDK for engine identity `98c92c27828179bc4258` and the current
  Ball2D service. Hosts must use the same engine identity as the players joining
  their room.
- Add optional host-local commentary, match intelligence and shot-quality
  contracts, configuration methods and observation hooks. These observations do
  not change the authoritative match result.
- Keep native API-key admission and direct peer gameplay. This candidate needs
  deployed-service and device/network acceptance before promotion to `latest`.

## 0.3.1 — 2026-09-26

- Match the Ball2D service deployed on 2026-09-26: the engine identity changed, so
  0.3.0 hosts and current web players no longer share an engine version. Physics
  (`core.wasm`) and the public API are unchanged.
- Validate more host-side wire input and service responses with typed schemas.
- Room callbacks are declared once as `RoomHooks` (`dist/types/room-hooks.d.ts`), which
  `Room` extends; the callbacks themselves are unchanged.

## 0.3.0 — 2026-09-25

- Use Ball2D stadium and recording formats throughout the SDK.
- Include the current shared room runtime and physics engine (the room protocol
  of that release).
- Bundle fourteen default stadiums: Classic, Easy, Small, Big, Rounded, Big Easy,
  Big Rounded, Huge, Asphalt, Asphalt Arena, Courtyard, Meadow, Street Five and
  Training Green. Hockey variants are retired.
- Add `onPlayerInput(player, prevInput)` and the `player.input` key bitmask.
- Remove the surface (wet grass / ground wear) room API.
- Remove retired compatibility assets and historical release claims.
- Validate service responses with typed schemas (Valibot, MIT; license included).
- Engine fix: kicks no longer move spectators in custom stadiums that give players
  the kick collision group, which could break snapshot restore.
