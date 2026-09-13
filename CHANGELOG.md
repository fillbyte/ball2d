# Changelog

## Unpublished 0.2.3 candidate update

- Deliver persisted ban reasons and handle terminal signaling messages before teardown. Later admission remains generically denied.

## 0.2.3 — candidate

- Preserve bounded admission error details and HTTP status for quota and request conflicts; cancel stalled error reads with room startup.

- Preserve completed tick goal and kick observations when callbacks restart or change the match.
- Publish bounded authoritative kick events so current web clients can play sampled match audio. Native hosts do not load audio resources.
- Refresh runtime URL ownership from the reviewed implementation.

Candidate verification on Node 24.19/macOS: 30 runtime files and 12 public
declarations passed the distribution audit; the installed archive opened a room,
rejected a second room with its specific quota message and 429, closed after fixture-key revocation and rejected
readmission. A real browser joined the installed Node host. Short automated key
pulses did not produce movement, so keyboard/replay acceptance was cancelled and
is not claimed. These are loopback fixture-key checks, not fresh production-account
or WAN acceptance. Publication remains pending npm authentication and final gates.

## 0.2.2 — 2026-09-13

- Use the versioned `/api/v1` service contract.
- Update the compiled engine/runtime with signed stadium physics and explicit
  runtime invariants; public declaration signatures remain unchanged.
- Preserve the matching archived replay runtime for existing recordings on the web.

Package structure and local installed-host checks passed on Node 24.19/macOS:
Chrome guest input under negative acceleration, replay stadium preservation,
signed collision group and key-revocation closure. The final runtime refresh
adds only the unused account-notification endpoint constant. Production API
acceptance passed with account-issued keys, Node admission, exact per-key quota
rejection, revocation closure and rejected readmission. This used a temporary
administrator-confirmed account; it does not reverify email delivery or WAN play.

## 0.2.1 — 2026-09-12

- Add `setPlayerMuted`, `onPlayerMuteChange`, and synchronized player mute state.
- Reject muted chat before callbacks and broadcasts; protect the room owner.
- Recheck room/player lifetime after chat callbacks before broadcasting.

Installed Node.js 24.19.0/macOS arm64 acceptance passed against both isolated
and production services: account-issued key, real browser join, mute/unmute and
chat callbacks, second-room quota rejection, key revocation and rejected
readmission. The temporary administrator-confirmed test account and key were
removed afterward; this was not a new email-delivery acceptance run.

## 0.2.0 — 2026-09-12

- Native hosting uses API-key admission with renewable service leases and quotas.
- Browser and native hosts request resumable signaling by default; recovery keeps
  the existing host identity and does not transfer host ownership.
- Queued `setSurfaceEnabled(boolean)` controls stopped-match wet grass; checkpoints
  and replays preserve terrain state.
- Browser and Node entrypoints expose reviewed public TypeScript declarations.
- The distribution includes matching WASM, authored stadiums and required notices.
- Repository setup, contribution forms, package validation and release documentation
  are maintained independently of private implementation source.

Production acceptance verified account-issued API keys, Node.js room creation,
a real Chrome player in a running terrain match, per-key room quota rejection,
and key revocation closing the host and rejecting new admission. See README.md
for supported runtime evidence and network limitations.
