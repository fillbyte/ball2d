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
    /** @default none — omitted when the host has not assigned a role */
    readonly role?: MatchIntelligenceRole;
}
/** The trajectory features of the kick's xG estimate (`MatchXgFeatures`): the same
 * shadow-engine forward simulation feeds both, so this is never re-derived, only the
 * shape handed across. */
export interface MatchIntelligenceShotTrajectory {
    readonly timeToGoalLineSeconds: number;
    /** 1 when the unimpeded (player-collision-free) simulated ball crosses the resolved
     * goal mouth within the horizon; 0 otherwise. Real WASM wall/post/goal physics apply.
     * Typed as `number`, matching the runtime primitive's own type exactly. */
    readonly crossesGoalMouth: number;
    readonly defendersReachingLaneCount: number;
    /** Clamped [0, horizon]. Positive when the ball's idealized arrival beats every
     * defender's idealized best-case pursuit arrival by this margin. */
    readonly ballLeadSeconds: number;
    /** Clamped [0, horizon]. Positive when a defender's idealized pursuit could reach the
     * ball's path before the ball's own idealized arrival, by this margin. A large value
     * (a defender already essentially at the ball) means the kick never had a clear lane,
     * not that a later touch happened to intercept a genuine attempt. */
    readonly defenderLeadSeconds: number;
    readonly keeperCoverageRatio: number;
}
export interface MatchIntelligenceContact {
    /** Unique within the stream; repeated delivery does not create another action. */
    readonly id: string;
    readonly tick: number;
    readonly kind: 'kick' | 'player' | 'wall' | 'post';
    /** @default none — present only for a `'player'` contact */
    readonly player?: CommentaryPlayerIdentity;
    /** @default none — present only for a contact on a goal frame */
    readonly goalId?: string;
    /** Kick contacts only. Absent when the adapter could not run the shadow simulation for
     * this kick (unsupported geometry, disabled trajectory analysis); callers fall back to
     * the simpler kinematic goal-mouth projection rather than failing closed on every kick.
     * @default none — present only for a `'kick'` contact with trajectory analysis available */
    readonly trajectory?: MatchIntelligenceShotTrajectory;
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
    /** A kick trajectory-gated as a directed shot needs defenderLeadSeconds below this many
     * ms: a defender already able to reach the ball well before its idealized arrival (a body
     * immediately in front, e.g. a kick-off into an adjacent opponent) is a blocked-at-source
     * turnover, never an announced shot. Only applies when trajectory analysis is available. */
    readonly blockedAtSourceLeadMs: number;
    readonly saveAreaGoalWidths: number;
    /** How close to the defending side's own goal (goal widths from the line) a kick must be,
     * with the ball sent away and the opponent previously in or contesting control, to count
     * as a shot-independent clearance rather than an ordinary kick. Unrelated to any shot. */
    readonly clearanceAreaGoalWidths: number;
    /** How close to the line a *stopped shot* must be confirmed (inside the goal-mouth
     * projection) to earn the dramatic "cleared off the line" clearance.line reaction rather
     * than a plain block. Unrelated to clearanceAreaGoalWidths, a different detection path. */
    readonly clearanceOffLineGoalWidths: number;
    /** A new controller must hold established control for at least this long, beyond the
     * base controlHoldMs already required to establish it, before a turnover is announced:
     * hysteresis against a rapid pinball bounce reading as a real change of possession. */
    readonly turnoverConfirmMs: number;
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
 | 'control-ended' | 'pass-completed' | 'pass-failed' | 'pass-chain' | 'assist-confirmed' | 'turnover' | 'directed-shot' | 'block' | 'goalkeeper-save'
/** Two disjoint sources share this kind, distinguished by evidence, never both at once
 * for the same touch: (1) a stopped shot confirmed at/near the goal line (evidence
 * carries 'prior-directed-shot' and 'goal-line-clearance' - any other stopped shot is
 * 'block' instead), speaking as clearance.line; (2) a shot-independent defensive touch
 * near the defender's own goal that sends the ball away (evidence carries
 * 'defending-own-goal-area' etc., never 'prior-directed-shot'), speaking as the generic
 * clearance family. Commentary dispatches on 'prior-directed-shot'. */
 | 'clearance'
/** A kick had a defender already decisively in its lane at release, per the real
 * trajectory (idealized pursuit lead well past the ball's own arrival): never a
 * directed shot, but distinct from silence so commentary can still react to it. */
 | 'blocked-at-source'
/** Confirmed non-own-goal scorer's running tally this match. Deferred like assist-confirmed:
 * never announced before the primary goal reaction has itself been presented. */
 | 'scorer-tally' | 'attack-progress' | 'counterattack' | 'sustained-pressure' | 'tactical-summary';
export interface MatchIntelligenceEvent {
    readonly eventId: string;
    readonly streamId: string;
    readonly epoch: number;
    readonly tick: number;
    readonly kind: MatchIntelligenceEventKind;
    readonly team: CommentaryTeam;
    /** @default none — present only when the event credits a player */
    readonly player?: CommentaryPlayerIdentity;
    /** @default none — present only for events naming a second player, such as an assist or a turnover */
    readonly otherPlayer?: CommentaryPlayerIdentity;
    /** @default none — present only for a contact on a goal frame */
    readonly goalId?: string;
    /** @default none — present only when the event continues a tracked attack */
    readonly attackId?: string;
    readonly context: CommentaryMatchContext;
    readonly confidence: 'supported' | 'authoritative';
    readonly evidence: readonly string[];
    /** Bounded descriptive values, never arbitrary prose or a probability. */
    readonly metrics: Readonly<Record<string, number>>;
    /** @default none — present only for a shot-related event */
    readonly shotQuality?: MatchShotQuality;
}
export interface MatchIntelligenceTeamTotals {
    readonly controlledMs: number;
    readonly completedPasses: number;
    readonly failedPasses: number;
    readonly turnoversWon: number;
    readonly directedShots: number;
    readonly blocks: number;
    readonly clearances: number;
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
