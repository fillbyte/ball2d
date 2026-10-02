export interface BallTouch {
    slot: number;
    team: 1 | 2;
}
export interface MatchState {
    /**
     * Host-simulated touch; null when no player has touched this kickoff.
     * @default none — absent before the state format tracked touches
     */
    lastTouch?: BallTouch | null;
    /**
     * Frozen at the goal line, including the player's team for own goals.
     * @default none — present only once a goal has been scored this kickoff
     */
    goalTouch?: BallTouch | null;
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
