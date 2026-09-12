import type { DiscProperties } from './disc.js';
export interface HostPlayer {
    id: number;
    peerId: string;
    name: string;
    team: 0 | 1 | 2;
    admin: boolean;
    avatar?: string | null;
    position: {
        x: number;
        y: number;
    } | null;
}
export interface HostScores {
    red: number;
    blue: number;
    time: number;
    scoreLimit: number;
    timeLimit: number;
}
export type HostDiscProperties = DiscProperties;
