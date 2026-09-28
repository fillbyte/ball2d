import type { RoomConfig } from './config.js';
import type { CreateRoomOptions } from './creation.js';
import type { Room } from './room.js';
import type { Replay } from './replay.js';
import type { StadiumValidation } from './stadium.js';
export type { RoomConfig, CreateRoomOptions, Room, Replay, StadiumValidation };
export type { HostPlayer, HostScores, HostDiscProperties } from './player.js';
/** Room creation was rejected by the signaling service. */
export declare class RoomAdmissionError extends Error {
    readonly status: number;
    readonly retryAfterSeconds: number | null;
    constructor(message: string, status: number, retryAfterSeconds?: number | null);
}
export declare function createRoom(config?: RoomConfig, options?: CreateRoomOptions): Promise<Room>;
export declare function readReplay(blob: Blob): Promise<Replay>;
export declare function validateStadium(source: string): StadiumValidation;
export type { AtmospherePolicy, AtmospherePack, AtmosphereCue, CommentaryCue, CommentaryWordTiming, MatchFact, CommentaryPolicy, CommentaryPolicyPatch, CommentaryPlayerFact, CommentaryPlayerFactInput, CommentaryConfiguration, CommentaryObservation, CommentaryGoalGeometry, } from './commentary.js';
export type { MatchIntelligencePolicy, MatchIntelligencePolicyPatch, MatchIntelligenceRole, MatchIntelligenceRoleInput, MatchIntelligenceRoleAssignment, MatchIntelligenceEvent, MatchIntelligenceEventKind, MatchIntelligenceSnapshot, MatchIntelligenceTeamTotals, MatchShotQuality, } from './match-intelligence.js';
export type { MatchXgFeatures, MatchXgVector, MatchXgDomain, MatchXgModel, MatchXgUnavailableReason, MatchXgEstimate, MatchXgTrust, } from './match-xg.js';
export type { MatchXgCollectionPolicy, MatchXgRuntimeConfig, MatchXgRuntimeReason, MatchXgRuntimeStatus, MatchKickEstimateEvent, } from './match-xg-runtime.js';
