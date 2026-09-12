export interface MatchState {
    tick: number;
    elapsed: number;
    red: number;
    blue: number;
    phase: 'lobby' | 'playing' | 'goal' | 'finished';
    paused: boolean;
    resumeTicks: number;
    countdown: number;
    kickoff: 1 | 2;
    kickoffActive: boolean;
    scoreLimit: number;
    timeLimit: number;
    kickRate: number;
    discs: number[];
    colors: number[];
}
