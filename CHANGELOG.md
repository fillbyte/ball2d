# Changelog

## Unpublished 0.2.3 candidate update

- Quantize new `setTeamColors` command angles to the reference's 256 turn units
  before byte wrapping; leave historical replay palettes unchanged. Cases include
  1° → 0°, -30° → 330.46875° and 359.9° → 358.59375°.
- The refreshed installed archive passed a local native-host/browser-peer check:
  initial and updated palettes reached the guest, rendered on the pitch, and
  survived replay decoding. All 806 application tests passed in the private
  implementation. This is bounded source/peer evidence, not complete HaxBall parity.

Current runtime source: `6181d11a033cbdc6a4a000c4c741ae6f22e4d012`.
Native SHA-256: `27a03f79bb5d589d9090476268d6a4c659dd5715edcaf8692e8f84d870568d5c`.
The production acceptance below used the previous candidate bytes; it is retained
with its original scope and does not claim a new production run of this refresh.

Production acceptance on Node 24.19/macOS arm64: a freshly packed and installed
candidate used a generated real account's API-issued key to open a room. A second
room was denied with the exact active-room quota message and `(429)`. A real
browser guest joined, moved authoritatively, and produced a replay with seven
commands including nonzero input. Revoking the key closed the native host and
returned the guest to the directory with `API key revoked`; readmission was denied.
Native shutdown settled; the generated session/account and temporary consumer were
removed. The unchanged native SHA-256 is listed below. This covers production
admission and one same-machine peer, not email delivery, WAN, devices or npm
publication. Registry latest remains 0.2.2; this candidate remains unpublished.

- Drain every native peer before shutdown settles, including when another peer fails to close. Preserve earlier cleanup failures even when their rejection value is empty.
- When startup and cleanup both fail, reject with an `AggregateError` whose `cause` is the original startup failure and whose `errors` retain both failures.
- Five focused tests cover injected failures and a data-channel exchange between two real native peers on one machine. This does not establish WAN or physical-device coverage.

Ordinary player departures and connection recovery no longer invoke `onError`.
Actual transport failures and terminal room decisions still report errors.

- Deliver persisted ban reasons and handle terminal signaling messages before teardown. A one-second grace period preserves the service reason when P2P teardown arrives first. Later admission remains generically denied.

Latest candidate acceptance on Node 24.19/macOS: a clean installed archive passed
public types, startup cancellation and credential rejection checks. An actual IAB
guest joined the native host, produced right input with leftward movement under
negative acceleration, and recorded five commands preserving the custom stadium
and signed collision group. Fixture-key revocation closed the host and returned
the guest to the directory; native cleanup settled. Runtime SHA256:
`c328f882f60da7ce6a9cb83805cb4483f9b9e4fbfdaa8ab0e4a607dafcf1c362`.
This is local fixture-account evidence, not production, quota, WAN, Steam or full
physics compatibility. npm publication remains pending.

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
