import type { DiscPropertyPatch } from './disc.js';
import type { TeamStyles } from './team.js';
import type { MatchState } from './match-state.js';
export type ReplayCommand = {
    tick: number;
    kind: 'input' | 'team' | 'start' | 'stop' | 'pause' | 'scoreLimit' | 'timeLimit' | 'kickRate' | 'join' | 'disc' | 'surface';
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
    styles?: {
        tick: number;
        teams: TeamStyles;
    }[];
    orders?: {
        tick: number;
        slots: number[];
    }[];
    end: number;
    finalHash: string;
}
export {};
