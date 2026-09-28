import type { CommentaryPlayerIdentity } from './commentary.js';
import type { MatchXgDomain, MatchXgEstimate, MatchXgFeatures, MatchXgModel, MatchXgUnavailableReason } from './match-xg.js';
/** Must match the independently reviewed offline collection population and feature stage. */
export interface MatchXgCollectionPolicy {
    readonly featureStage: 'pre-kick' | 'post-kick';
    readonly population: 'all-kicks-v1' | 'goalward-release-v1';
    /** Integer simulation milliseconds, 100 through 60,000. */
    readonly outcomeHorizonMs: number;
}
/** Host-local configuration. null disables inference; no model or approval is bundled. */
export interface MatchXgRuntimeConfig {
    readonly model: MatchXgModel;
    readonly policy: MatchXgCollectionPolicy;
}
export type MatchXgRuntimeReason = MatchXgUnavailableReason | 'disabled' | 'preparing' | 'ready' | 'closed' | 'physics-edit' | 'unsupported-geometry' | 'domain-change' | 'capture-discontinuity';
export interface MatchXgRuntimeStatus {
    readonly state: 'disabled' | 'preparing' | 'ready' | 'unavailable' | 'invalidated';
    readonly reason: MatchXgRuntimeReason;
    readonly domain: MatchXgDomain | null;
    readonly modelId: string | null;
    /** Approval is the host operator's explicit assertion, not platform certification. */
    readonly trustScope: 'host-configuration';
}
/** Frozen kick-time input and estimate. Host-local only; never a confirmed goal or spoken probability. */
export interface MatchKickEstimateEvent {
    readonly eventId: string;
    readonly streamId: string;
    readonly epoch: number;
    readonly tick: number;
    readonly order: number;
    readonly player: CommentaryPlayerIdentity;
    readonly goalId: string;
    readonly features: MatchXgFeatures;
    readonly estimate: MatchXgEstimate;
    readonly domain: MatchXgDomain;
    readonly trustScope: 'host-configuration';
}
