import type { DiscPropertyPatch } from './disc.js';
import type { TeamStyles } from './team.js';
import type { MatchState } from './match-state.js';
import type { CommentaryPolicyPatch } from './commentary.js';
import type { StadiumSurface } from './stadium-surface.js';
export type ReplayCommand = {
    tick: number;
    kind: 'input' | 'team' | 'start' | 'stop' | 'pause' | 'scoreLimit' | 'timeLimit' | 'kickRate' | 'join' | 'disc';
    /**
     * Present only when `kind` is `'disc'`.
     * @default none
     */
    properties?: DiscPropertyPatch;
    slot: number;
    value: number;
};
interface Checkpoint {
    tick: number;
    state: MatchState;
    hash: string;
}
export interface Replay {
    magic: 'B2DR';
    version: 1;
    engine: string;
    stadium: string;
    initial: MatchState;
    commands: ReplayCommand[];
    checkpoints: Checkpoint[];
    roster: {
        tick: number;
        slot: number;
        name: string | null;
        avatar?: string | null;
    }[];
    /**
     * Recorded only when team styles changed during the match.
     * @default none
     */
    styles?: {
        tick: number;
        teams: TeamStyles;
    }[];
    /**
     * Recorded only when the field-position order changed during the match.
     * @default none
     */
    orders?: {
        tick: number;
        slots: number[];
    }[];
    /**
     * The room commentary policy the host gave its listeners, from each tick on, so a replay
     * chooses the lines its live match chose. Recorded by SDK hosts.
     * @default none
     */
    commentary?: {
        tick: number;
        policy: CommentaryPolicyPatch;
    }[];
    /**
     * The surface the room drew the stadium on, from each tick on; `null` returns to the
     * stadium's own default surface. Recorded only when the host chose a surface.
     * @default none — the stadium's default surface throughout
     */
    surfaces?: {
        tick: number;
        surface: StadiumSurface | null;
    }[];
    end: number;
    finalHash: string;
}
export {};
