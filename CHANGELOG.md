# Changelog

## 1.0.0-next.0 — 2026-09-29

The v1 pre-release, pending review. Ball2D is not public yet, so this resets the
pre-launch version scheme to 1 instead of carrying forward earlier 0.x iteration
numbers.

- Uses engine identity `2e6cea39a72fef7f7558` and room protocol 1. Hosts must use
  the same engine identity as the players joining their room.
- Hosts send a bounded, about 1 Hz match-statistics summary (heatmap cells and
  distance) that current web guests show; older guests ignore it.
- Adds optional host-local commentary, match intelligence and shot-quality
  contracts, configuration methods and observation hooks. These observations do
  not change the authoritative match result.
- Interrupted commentary fades in instead of overlapping, kickoff lines load
  first, and match intelligence exposes the frame a host observed to local
  consumers.
- Validates host-side wire input and service responses with typed schemas
  (Valibot, MIT; license included).
- Room callbacks are declared once as `RoomHooks` (`dist/types/room-hooks.d.ts`),
  which `Room` extends.
- Uses Ball2D stadium and recording formats throughout the SDK. Bundles fourteen
  default stadiums: Classic, Easy, Small, Big, Rounded, Big Easy, Big Rounded,
  Huge, Asphalt, Asphalt Arena, Courtyard, Meadow, Street Five and Training
  Green. Hockey variants are retired.
- Adds `onPlayerInput(player, prevInput)` and the `player.input` key bitmask.
  Removes the surface (wet grass / ground wear) room API.
- Keeps native API-key admission and direct peer gameplay. This candidate needs
  deployed-service and device/network acceptance before promotion to `latest`.
