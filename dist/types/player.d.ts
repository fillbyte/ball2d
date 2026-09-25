import type { DiscProperties } from './disc.js';
export interface HostPlayer {
    id: number;
    peerId: string;
    name: string;
    team: 0 | 1 | 2;
    admin: boolean;
    /** Room chat is suppressed while true; absent on older hosts. */
    muted?: boolean;
    avatar?: string | null;
    position: {
        x: number;
        y: number;
    } | null;
    /** Current authoritative key bitmask: up 1, down 2, left 4, right 8, kick 16. */
    input: number;
}
export interface HostScores {
    red: number;
    blue: number;
    time: number;
    scoreLimit: number;
    timeLimit: number;
}
export type HostDiscProperties = DiscProperties;
