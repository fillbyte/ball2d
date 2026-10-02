import type { CommentaryPlayerIdentity, CommentaryTeam } from './commentary.js';
/** Event/time-derived totals: available identically on a host and a guest. */
export interface MatchStatsCounters {
    readonly goals: number;
    readonly ownGoals: number;
    readonly directedShots: number;
    readonly blocks: number;
    readonly saves: number;
    readonly completedPasses: number;
    readonly failedPasses: number;
    readonly turnoversWon: number;
    readonly turnoversLost: number;
    readonly assists: number;
    /** Ms this identity was the positively observed controller; 0 for a spell that never resolved. */
    readonly controlledMs: number;
    /** Possession spells started (`control-established`); a proxy for "touches", not a contact
     * sensor. Event-derived, so identical on a host and a guest. */
    readonly touches: number;
}
/** Bounded grid over arena units. Cell `[row * cols + col]`; out-of-domain samples are separate. */
export interface MatchStatsHeatmapTransform {
    readonly cols: number;
    readonly rows: number;
    /** Arena half-extents (`engine.stadium.width/height`); the grid spans `[-halfWidth, halfWidth]`. */
    readonly halfWidth: number;
    readonly halfHeight: number;
}
export interface MatchStatsHeatmap {
    readonly transform: MatchStatsHeatmapTransform;
    /** Milliseconds observed in each cell, row-major, length `cols * rows`. */
    readonly cellMs: readonly number[];
    /** Samples that fell outside the grid; counted, never clamped onto an edge cell. */
    readonly outOfDomainSamples: number;
}
/** Positional measurements: only ever populated from authoritative host-side positions. */
export interface MatchStatsSpatial {
    readonly distanceUnits: number;
    readonly heatmap: MatchStatsHeatmap;
}
export interface MatchStatsPlayerSnapshot {
    readonly identity: CommentaryPlayerIdentity;
    /** Last-seen display name; not identity. */
    readonly name: string;
    readonly team: CommentaryTeam;
    readonly counters: MatchStatsCounters;
    /** `null` when this identity has no authoritative spatial samples (a guest, or not yet seen). */
    readonly spatial: MatchStatsSpatial | null;
}
export interface MatchStatsTeamSnapshot {
    readonly counters: Omit<MatchStatsCounters, 'ownGoals' | 'turnoversLost'>;
    readonly spatial: MatchStatsSpatial | null;
}
export interface MatchStatsCoverage {
    /** Simulation tick stats have been observed since (a stream start or the last reset/seek). */
    readonly fromTick: number | null;
    /** True for a guest projection: its `MatchFact`/`MatchIntelligenceEvent` transport is
     * bounded and can drop or arrive late after a reconnect or a join mid-match, so the view
     * should say the table may be incomplete. Always false for the host's own projection. */
    readonly possiblyIncomplete: boolean;
    /** Positional measurements (distance, heatmaps): authoritative host-derived samples, either
     * read directly (the host's own view) or delivered through the bounded spatial summary
     * channel (a guest). Never a guest's own predicted physics. */
    readonly spatialAvailable: boolean;
    /** True while a replay seek's from-scratch rebuild is still catching up to the current tick;
     * the snapshot is the last completed rebuild, not yet the target tick's exact totals. */
    readonly rebuilding: boolean;
}
/** One goal or shot, in match-clock order, for the timeline view. Bounded; event-derived, so
 * identical on a host and a guest. */
export interface MatchStatsTimelineEntry {
    readonly kind: 'goal' | 'own-goal' | 'shot';
    readonly tick: number;
    /** Match-clock milliseconds (`context.elapsed * 1000`), not wall-clock time. */
    readonly elapsedMs: number;
    readonly team: CommentaryTeam;
    readonly player: CommentaryPlayerIdentity | null;
}
/** One kick's expected-goals estimate. The host computes this from its own authoritative
 * state (never predicted physics) and broadcasts the result over a bounded host->guest
 * channel; a guest only ever displays it, never computes its own. */
export interface MatchStatsXgShot {
    readonly eventId: string;
    readonly tick: number;
    readonly elapsedMs: number;
    readonly team: CommentaryTeam;
    readonly player: CommentaryPlayerIdentity;
    readonly goalId: string;
    readonly xG: number | null;
    readonly status: 'reviewed-model' | 'uncalibrated';
    readonly reason: string;
    readonly modelId: string | null;
}
export interface MatchStatsXgSummary {
    /** True once at least one `reviewed-model` estimate has been observed this stream. A stats
     * view MUST gate any xG display on this, not on `shots.length`. */
    readonly available: boolean;
    readonly modelId: string | null;
    readonly teams: {
        readonly [team in CommentaryTeam]: number | null;
    };
    /** Every reviewed or rejected kick estimate seen, in order; bounded. */
    readonly shots: readonly MatchStatsXgShot[];
}
export interface MatchStatsSnapshot {
    readonly streamId: string | null;
    readonly epoch: number | null;
    readonly tick: number | null;
    /** Playing time observed (paused/lobby/goal intervals excluded), from event/fact contexts. */
    readonly observedMs: number;
    /** `observedMs` minus both teams' `controlledMs`, floored at zero. Denominator: `observedMs`. */
    readonly contestedOrUnknownMs: number;
    readonly teams: {
        readonly [team in CommentaryTeam]: MatchStatsTeamSnapshot;
    };
    /** Every identity seen this stream, most recently active first; bounded. */
    readonly players: readonly MatchStatsPlayerSnapshot[];
    readonly timeline: readonly MatchStatsTimelineEntry[];
    readonly xg: MatchStatsXgSummary;
    readonly coverage: MatchStatsCoverage;
}
