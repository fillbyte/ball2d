# Changelog

## 0.3.1 — 2026-09-26

- Match the Ball2D service deployed on 2026-09-26: the engine identity changed, so
  0.3.0 hosts and current web players no longer share an engine version. Physics
  (`core.wasm`) and the public API are unchanged.
- Validate more host-side wire input and service responses with typed schemas.

## 0.3.0 — 2026-09-25

- Use Ball2D stadium and recording formats throughout the SDK.
- Include the current shared room runtime and physics engine (room protocol 5).
- Bundle fourteen default stadiums: Classic, Easy, Small, Big, Rounded, Big Easy,
  Big Rounded, Huge, Asphalt, Asphalt Arena, Courtyard, Meadow, Street Five and
  Training Green. Hockey variants are retired.
- Add `onPlayerInput(player, prevInput)` and the `player.input` key bitmask.
- Remove the surface (wet grass / ground wear) room API.
- Remove retired compatibility assets and historical release claims.
- Validate service responses with typed schemas (Valibot, MIT; license included).
- Engine fix: kicks no longer move spectators in custom stadiums that give players
  the kick collision group, which could break snapshot restore.
