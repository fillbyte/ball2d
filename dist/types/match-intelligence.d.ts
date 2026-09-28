import type { CommentaryAnalysisFrame, CommentaryMatchContext, CommentaryPlayerIdentity, CommentaryTeam } from './commentary.js';
/** Roles are explicit host assignments. Being the player nearest a goal is not a role. */
export type MatchIntelligenceRole = 'goalkeeper' | 'outfield';
export interface MatchIntelligenceRoleAssignment {
    readonly player: CommentaryPlayerIdentity;
    readonly role: MatchIntelligenceRole;
}
export interface MatchIntelligenceRoleInput {
    readonly playerId: number;
    readonly role: MatchIntelligenceRole;
}
export interface MatchIntelligencePlayer {
    readonly identity: CommentaryPlayerIdentity;
    readonly x: number;
    readonly y: number;
    /** World units per simulation second, as for the ball. */
    readonly vx: number;
    readonly vy: number;
    readonly radius: number;
    readonly role?: MatchIntelligenceRole;
}
export interface MatchIntelligenceContact {
    /** Unique within the stream; repeated delivery does not create another action. */
    readonly id: string;
    readonly tick: number;
    readonly kind: 'kick' | 'player' | 'wall' | 'post';
    readonly player?: CommentaryPlayerIdentity;
    readonly goalId?: string;
}
export interface MatchIntelligenceFrame extends Omit<CommentaryAnalysisFrame, 'contact'> {
    /** Authoritative active roster, at most 32. Overflow/invalid input produces unknown. */
    readonly players: readonly MatchIntelligencePlayer[];
    /** Physical contacts for this sampled interval, at most 32, oldest first. */
    readonly contacts: readonly MatchIntelligenceContact[];
    /** False when the adapter cannot prove complete contact coverage since its last frame.
     * Control geometry may still be observed; pass/assist/shot continuity becomes unknown. */
    readonly contactsComplete: boolean;
}
export interface MatchIntelligencePolicy {
    readonly enabled: boolean;
    readonly maxGapMs: number;
    readonly controlHoldMs: number;
    /** Extra distance beyond player radius + ball radius, in ball radii. */
    readonly controlExtraRadii: number;
    readonly controlRelativeSpeedRadii: number;
    readonly passWindowMs: number;
    readonly passMinTravelRadii: number;
    readonly chainWindowMs: number;
    readonly assistWindowMs: number;
    readonly shotWindowMs: number;
    readonly shotMinSpeedRadii: number;
    readonly shotHorizonMs: number;
    readonly saveAreaGoalWidths: number;
    readonly progressGoalWidths: number;
    readonly counterWindowMs: number;
    readonly pressureHoldMs: number;
    readonly pressureAreaGoalWidths: number;
    readonly summaryWindowMs: number;
}
export type MatchIntelligencePolicyPatch = Partial<MatchIntelligencePolicy>;
/** Descriptive features only. None of these values is calibrated xG or a goal probability. */
export interface MatchShotQuality {
    readonly distanceGoalWidths: number;
    readonly openingAngleRadians: number;
    readonly speedBallRadiiPerSecond: number;
    readonly defendersInLane: number;
}
export type MatchIntelligenceEventKind = 'control-established'
/** Silent authority barrier for a departed/reassigned field identity. Does not assert
 * a kick, lost possession or an opponent takeover; only retires matching live control. */
 | 'player-retired'
/** Silent, positively observed controller kick/release. Carries player + attackId;
 * distance/speed evidence must exceed the measured control boundary. No opponent takeover. */
 | 'control-ended' | 'pass-completed' | 'pass-failed' | 'pass-chain' | 'assist-confirmed' | 'turnover' | 'directed-shot' | 'block' | 'goalkeeper-save' | 'attack-progress' | 'counterattack' | 'sustained-pressure' | 'tactical-summary';
export interface MatchIntelligenceEvent {
    readonly eventId: string;
    readonly streamId: string;
    readonly epoch: number;
    readonly tick: number;
    readonly kind: MatchIntelligenceEventKind;
    readonly team: CommentaryTeam;
    readonly player?: CommentaryPlayerIdentity;
    readonly otherPlayer?: CommentaryPlayerIdentity;
    readonly goalId?: string;
    readonly attackId?: string;
    readonly context: CommentaryMatchContext;
    readonly confidence: 'supported' | 'authoritative';
    readonly evidence: readonly string[];
    /** Bounded descriptive values, never arbitrary prose or a probability. */
    readonly metrics: Readonly<Record<string, number>>;
    readonly shotQuality?: MatchShotQuality;
}
export interface MatchIntelligenceTeamTotals {
    readonly controlledMs: number;
    readonly completedPasses: number;
    readonly failedPasses: number;
    readonly turnoversWon: number;
    readonly directedShots: number;
    readonly blocks: number;
    readonly saves: number;
    readonly confirmedAssists: number;
}
export interface MatchIntelligenceSnapshot {
    readonly streamId: string | null;
    readonly epoch: number | null;
    readonly tick: number | null;
    readonly status: 'uninitialized' | 'tracking' | 'paused' | 'unknown' | 'disabled';
    readonly unknownReasons: readonly string[];
    /** Observed control only; free/contested balls remain unassigned. */
    readonly controller: CommentaryPlayerIdentity | null;
    readonly passChain: {
        readonly team: CommentaryTeam | null;
        readonly completed: number;
    };
    readonly attack: {
        readonly id: string;
        readonly team: CommentaryTeam;
        readonly goalId: string;
    } | null;
    readonly observedMs: number;
    readonly uncontrolledMs: number;
    readonly teams: {
        readonly red: MatchIntelligenceTeamTotals;
        readonly blue: MatchIntelligenceTeamTotals;
    };
    readonly emittedEvents: number;
    readonly droppedEvents: number;
}
