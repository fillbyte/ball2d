import type { RoomConfig } from './config.js';
import type { Room } from './room.js';
import type { CreateRoomOptions } from './creation.js';
export { readReplay, validateStadium, RoomAdmissionError } from './browser.js';
export type { Replay, StadiumValidation, CreateRoomOptions, HostPlayer, HostScores, HostDiscProperties, } from './browser.js';
export interface NodeRoomConfig extends RoomConfig {
    /** Ball2D signaling service. Defaults to HTTPS; HTTP permits loopback only. */
    serviceOrigin?: string;
    /** Required account-owned API key. Keep it on your server, never in browser code. */
    apiKey: string;
}
export type NodeRoom = Room & {
    readonly closed: Promise<void>;
};
export declare function createRoom(config: NodeRoomConfig, creation?: CreateRoomOptions): Promise<NodeRoom>;
export type { AtmospherePolicy, AtmospherePack, AtmosphereCue, CommentaryCue, CommentaryWordTiming, MatchFact, CommentaryPolicy, CommentaryPolicyPatch, CommentaryPlayerFact, CommentaryPlayerFactInput, CommentaryConfiguration, CommentaryObservation, CommentaryGoalGeometry, } from './commentary.js';
export type { MatchIntelligencePolicy, MatchIntelligencePolicyPatch, MatchIntelligenceRole, MatchIntelligenceRoleInput, MatchIntelligenceRoleAssignment, MatchIntelligenceEvent, MatchIntelligenceEventKind, MatchIntelligenceSnapshot, MatchIntelligenceTeamTotals, MatchShotQuality, } from './match-intelligence.js';
export type { MatchXgFeatures, MatchXgVector, MatchXgDomain, MatchXgModel, MatchXgUnavailableReason, MatchXgEstimate, MatchXgTrust, } from './match-xg.js';
export type { MatchXgCollectionPolicy, MatchXgRuntimeConfig, MatchXgRuntimeReason, MatchXgRuntimeStatus, MatchKickEstimateEvent, } from './match-xg-runtime.js';
