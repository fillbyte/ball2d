# Ball2D SDK

Host a Ball2D football room on your own server and control it through a typed
JavaScript API. The host runs the simulation; players connect directly over
WebRTC. Ball2D provides authorization, room discovery and signaling.

**Development candidate: 0.2.2.** This checkout contains a new engine/runtime
for coordinated web deployment. It remains private pending acceptance; npm latest
is still 0.2.1. Do not use this candidate with an older web engine.

**Release: 0.2.1.** The matching production service supports API-key-authorized
Node.js hosting, account quotas and key revocation. The installed 0.2.1 package passed authenticated production acceptance with a
real browser player, including mute/unmute, quota rejection and key revocation.

Repository maintainers: [local setup](https://github.com/fillbyte/ball2d/blob/main/docs/DEVELOPMENT.md) · [release procedure](https://github.com/fillbyte/ball2d/blob/main/docs/RELEASING.md) · [changelog](https://github.com/fillbyte/ball2d/blob/main/CHANGELOG.md).

## Node.js quick start

Use Node.js 24 or newer. The verified native runtime is Node.js 24.19.0 on macOS
arm64; other systems need independent acceptance. Native transport is experimental.

```sh
npm install ball2d@0.2.1
```

Create an API key through your Ball2D account.
Supply it as `BALL2D_API_KEY` through your server's secret manager or environment;
never commit it or include it in a browser bundle.

```js
import { createRoom } from 'ball2d/node';

const apiKey = process.env.BALL2D_API_KEY;
if (!apiKey) throw new Error('Set BALL2D_API_KEY');

const room = await createRoom({
  apiKey,
  roomName: 'Evening football',
  noPlayer: true,
  maxPlayers: 16,
  public: true,
});

room.onError = (error) => console.error('Room error:', error.message);
room.onPlayerJoin = (player) => room.setPlayerTeam(player.id, 1);
await room.setDefaultStadium('Classic');
await room.setScoreLimit(3);
await room.startGame();
console.log(room.roomLink);

async function shutdown() {
  room.close();
  await room.closed;
}
process.once('SIGINT', () => void shutdown().catch(console.error));
process.once('SIGTERM', () => void shutdown().catch(console.error));
```

`serviceOrigin` defaults to `https://ball2d.com`. A custom origin must serve a
matching Ball2D deployment, authorization API and engine/protocol. The native
package includes its compiled runtime, WebAssembly engine, transport and stadiums;
it needs no browser process, postinstall patch or sibling source checkout.

## Authorization and limits

The native `apiKey` is required. Missing or malformed credentials fail before
engine and transport allocation. There is no anonymous fallback. The key is sent
only to the configured service in Authorization headers, never in peer messages
or room URLs. Cross-origin redirects cannot forward it.

| Policy                        | Initial limit                           |
| ----------------------------- | --------------------------------------- |
| Active API keys per account   | 2                                       |
| Active rooms per key          | 1                                       |
| Active rooms per account      | 2                                       |
| New room attempts per key     | 3 per rolling minute                    |
| New room attempts per account | 5 per rolling minute                    |
| Startup reservation           | 30 seconds                              |
| Active lease                  | Up to 90 seconds, bounded by key expiry |
| Lease renewal                 | Every 30 seconds                        |

Capacity is enforced by the service, not by a local process counter. Repeated
idempotent admissions do not consume another room; failed capacity attempts count
against admission rate limits. Admission and renewal recheck key expiry and
revocation. The official runtime closes on terminal rejection or lease expiry;
network failures receive bounded retries. Account revocation is not an instant
remote kill guarantee. Obey `Retry-After` and avoid tight retry loops.

Anonymous browser play is a separate service policy. API keys govern official
native admission; they cannot make downloaded executable code confidential or
prevent modified participants from running an unconnected private simulation.

## Room API

The public types are included in `dist/types`. The `ball2d/node` entry exports
`createRoom`, `validateStadium`, `readReplay` and the native/public room types.
TypeScript projects can use `module: "NodeNext"`, `lib: ["ES2022"]` and Node types;
native declarations do not require DOM/WebRTC globals or `skipLibCheck`.

- **Players and lobby:** inspect players, assign teams/admins, lock teams, kick/ban,
  manage admission, send chat and announcements, and configure the room.
- **Matches:** start/stop, pause/resume, score/time limits, kick-rate limits and
  `await room.setSurfaceEnabled(true)` for wet grass and ground wear. Pass `false`
  to restore dry ground. Stop the match before changing the surface; loading a
  stadium resets it. Surface changes are retained in replays.
- **Physics and stadiums:** load custom stadium text, select ten bundled defaults,
  query and modify supported player/disc properties, and use `CollisionFlags`.
- **Events:** player join/leave/chat, team/admin changes, ball kicks, goals,
  match ticks, position resets, victory, stadium changes and recording completion.
- **Replay:** record and decode Ball2D recordings with their embedded stadium and
  matching engine identity.

State-changing commands return Promises and run in call order. Await a command
before reading the resulting state. Getters and recording start/stop are
synchronous. Inputs and returned public data are copied; mutable engine and
transport internals are not exposed through the API. Up to 256 commands may wait;
overflow rejects without dropping accepted commands.

Callbacks receive the room facade as `this`. Callback failures are reported to
`onError`; that handler's own failures are contained. Chat filtering must return
`false` synchronously to suppress a message. Player IDs are stable public IDs,
not physics slots; departed player IDs are not reused within a room.

Room creation resolves only after signaling confirms host authority. An optional
second argument `{ signal }` cancels startup. Startup has a 15-second overall
deadline; after creation, call `close()` to stop the room. `signal` aborts when
closure begins and `closed` settles after native cleanup. `close()` is idempotent,
cancels pending commands and finalizes an active recording once. It does not
confirm that every remote player has received a shutdown message.

## Signaling recovery

Browser and native runtimes request resumable signaling by default. If the
signaling connection briefly drops, the same admitted host or player can recover
within the service membership lifetime while retaining healthy direct peer
connections. Custom services must support the matching signaling protocol.

This does not automatically transfer ownership to another player when the host
leaves, guarantee uninterrupted delivery, or provide a relay for incompatible
networks. Native recovery remains subject to the API key and room lease; it does
not bypass revocation or quota enforcement.

## Stadiums and replays

```js
import { validateStadium, readReplay } from 'ball2d/node';

const report = validateStadium('{name:"Training", canBeStored:false}');
console.log(report.name, report.warnings);

room.startRecording();
// Play, then stop recording:
const recording = room.stopRecording();
if (recording) {
  const replay = await readReplay(recording);
  console.log(replay);
}
```

Validation is synchronous and does not allocate a room. Passing validation means
the stadium can be parsed, not that all gameplay outcomes have been certified.
Bundled defaults are Classic, Easy, Small, Big, Rounded, Hockey, Big Easy,
Big Rounded, Big Hockey and Huge. They are Ball2D-authored procedural designs;
provenance and hashes are included. Custom stadiums and embedded-stadium replays
remain supported. Geometry and physics can differ from earlier SDK assets.
Recordings are binary containers: use `readReplay`, not JSON parsing.

## Browser integration

`import { createRoom } from 'ball2d'` is the browser entry for an origin serving
matching Ball2D APIs, WASM and stadium assets. It is not a remote-origin native
host or an untrusted plugin sandbox. It follows the browser admission policy;
never put a native API key into its bundle. Importing either entry does not create
a room or register a window global. Browser and native hosts share public room
commands while retaining their distinct startup and cleanup contracts.

## Distribution, license and support

This public repository contains reviewed executable artifacts, public declarations
and integration documentation. The game and infrastructure source remain in a
separate private repository. Source maps, internal declarations and platform
credentials are excluded. Distributed JavaScript and WASM can still be inspected
and modified; the package is not a reverse-engineering prevention mechanism.

The proprietary [SDK license](LICENSE) permits integrations with the official
Ball2D service, including commercial use. Public visibility does not make the
runtime open source. Third-party components retain their licenses in `dist/licenses`.

Run `npm run check` in this repository to verify pinned runtime hashes, the
package boundary and native missing-key behavior. `npm pack --dry-run --ignore-scripts`
shows the publish contents. GitHub Actions is permanently disabled.

Report reproducible defects through [issues](https://github.com/fillbyte/ball2d/issues).
Remove secrets, personal data and private room links. Use
[private vulnerability reporting](https://github.com/fillbyte/ball2d/security/advisories/new)
for sensitive findings. See [contribution guidance](https://github.com/fillbyte/ball2d/blob/main/CONTRIBUTING.md).

Production acceptance on 12 September 2026 verified a confirmed-email account
creating an API key, Node.js room creation, wet-ground simulation with a Chrome
player, a second room rejected by the key quota, and active-key revocation closing
the official host and rejecting new admission. Local verification also includes
installed-package hosting, gameplay, replay and cleanup. This evidence does not
establish broad WAN/NAT reachability,
Linux compatibility, sustained capacity or an uptime guarantee. Direct WebRTC
requires peer reachability; no TURN relay is provided.

## Player mute

`await room.setPlayerMuted(id, true)` suppresses a player's room chat; pass `false`
to restore it. `player.muted` exposes the current state.
`onPlayerMuteChange(player, byPlayer)` reports the actor (null for SDK commands).
Muted messages do not reach `onPlayerChat`. Remote admins may mute other players
but cannot mute the room owner. Mute ends when a player leaves; use a ban to
prevent rejoining. Losing the room host closes the room without transferring it.
