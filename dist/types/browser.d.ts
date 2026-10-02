import type { RoomConfig } from './config.js';
import type { CreateRoomOptions } from './creation.js';
import type { Room } from './room.js';
import type { Replay } from './replay.js';
import type { StadiumInfo, StadiumValidation } from './stadium.js';
export type { RoomConfig, CreateRoomOptions, Room, Replay, StadiumInfo, StadiumValidation };
export type { StadiumSurface, SurfaceFamily, SurfaceInfo, } from './stadium-surface.js';
import type { SurfaceInfo } from './stadium-surface.js';
/**
 * Every surface variant this SDK can set, grouped by family (grass, asphalt, felt) in
 * picker order. Pass an `id` to `room.setSurface()` or `RoomConfig.surface`.
 */
export declare function listSurfaces(): readonly SurfaceInfo[];
/**
 * Bundled layouts in picker order, without room creation, fetching or an API key.
 * Metadata uses full game-unit dimensions. Pass an `id` or canonical `name` to
 * `room.setDefaultStadium()`; `teamSize` is a suggestion, not an enforced capacity.
 */
export declare function listStadiums(): readonly StadiumInfo[];
export type { HostPlayer, HostScores, HostDiscProperties } from './player.js';
/** Room creation was rejected by the signaling service. */
export declare class RoomAdmissionError extends Error {
    readonly status: number;
    readonly retryAfterSeconds: number | null;
    constructor(message: string, status: number, retryAfterSeconds?: number | null);
}
export declare function createRoom(config?: RoomConfig, options?: CreateRoomOptions): Promise<Room>;
export declare function readReplay(blob: Blob): Promise<Replay>;
/**
 * Parse JSON5 stadium source without allocating a room. Rejects malformed geometry or
 * out-of-range values and reports ignored fields. A valid report does not assess playability.
 */
export declare function validateStadium(source: string): StadiumValidation;
export type { AtmospherePolicy, AtmospherePack, AtmosphereCue, CommentaryCue, CommentaryWordTiming, MatchFact, CommentaryPolicy, CommentaryPolicyPatch, CommentaryPlayerFact, CommentaryPlayerFactInput, CommentaryConfiguration, CommentaryObservation, CommentaryGoalGeometry, } from './commentary.js';
export type { MatchIntelligencePolicy, MatchIntelligencePolicyPatch, MatchIntelligenceRole, MatchIntelligenceRoleInput, MatchIntelligenceRoleAssignment, MatchIntelligenceEvent, MatchIntelligenceEventKind, MatchIntelligenceSnapshot, MatchIntelligenceTeamTotals, MatchShotQuality, } from './match-intelligence.js';
export type { MatchStatsCounters, MatchStatsCoverage, MatchStatsHeatmap, MatchStatsHeatmapTransform, MatchStatsPlayerSnapshot, MatchStatsSnapshot, MatchStatsSpatial, MatchStatsTeamSnapshot, MatchStatsTimelineEntry, MatchStatsXgShot, MatchStatsXgSummary, } from './match-stats.js';
export type { MatchXgFeatures, MatchXgVector, MatchXgDomain, MatchXgModel, MatchXgUnavailableReason, MatchXgEstimate, MatchXgTrust, } from './match-xg.js';
export type { MatchXgCollectionPolicy, MatchXgRuntimeConfig, MatchXgRuntimeReason, MatchXgRuntimeStatus, MatchKickEstimateEvent, } from './match-xg-runtime.js';
