import type { MatchXgTrust } from './match-xg.js';
export interface CreateRoomOptions {
    /** Cancels startup only. Close the returned room explicitly after it opens. */
    signal?: AbortSignal;
    /** Host-operator reviewed descriptor allowlist, captured at startup. Never supplied by guests. */
    matchXgTrust?: MatchXgTrust;
}
