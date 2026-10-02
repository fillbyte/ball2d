/** Upper bound (seconds) for the forward trajectory/intercept simulation. A shot whose
 * unimpeded ball path or fastest relevant defender has not resolved by this horizon is
 * reported at the horizon value itself; it is not evidence of an eventual outcome. */
export declare const MATCH_XG_TRAJECTORY_HORIZON_SECONDS = 3;
/** Ordered feature names for the current `shot-trajectory-v1` revision. Order is the
 * runtime/offline vector order; a revision change must publish a new ordered name list,
 * never reorder or resize this one in place. */
export declare const MATCH_XG_FEATURE_NAMES: readonly ["distanceGoalWidths", "openingAngleRadians", "speedBallRadiiPerSecond", "defendersInLane", "timeToGoalLineSeconds", "crossesGoalMouth", "defendersReachingLaneCount", "ballLeadSeconds", "defenderLeadSeconds", "keeperCoverageRatio"];
export type MatchXgFeatureName = (typeof MATCH_XG_FEATURE_NAMES)[number];
/** Inclusive per-feature upper bound; every feature is non-negative by construction
 * (signed margins are split into two non-negative lead features instead). */
export declare const MATCH_XG_FEATURE_MAXIMUMS: Readonly<Record<MatchXgFeatureName, number>>;
/** Feature names whose runtime/offline value must be a non-negative integer. */
export declare const MATCH_XG_INTEGER_FEATURE_NAMES: ReadonlySet<MatchXgFeatureName>;
/** Feature units are bound by MatchXgDomain; end-step observations are not frozen kick inputs. */
export interface MatchXgFeatures {
    /** Perpendicular playable-side distance to the goal line / mouth width. */
    readonly distanceGoalWidths: number;
    /** Smaller absolute angle between rays from the ball to the two posts, in [0, pi]. */
    readonly openingAngleRadians: number;
    /** Ball speed at domain.featureStage / current ball radius. Pre-kick is incoming speed;
     * post-kick is immediately after the impulse, before clamp, gravity, damping or collisions.
     * These are distinct feature definitions, never interchangeable. */
    readonly speedBallRadiiPerSecond: number;
    /** Opponents intersecting the ball-to-goal-center corridor; not a block probability. */
    readonly defendersInLane: number;
    /** Forward-simulated unimpeded ball time to reach the extended goal line, including
     * post/wall bounces; MATCH_XG_TRAJECTORY_HORIZON_SECONDS when it never arrives. */
    readonly timeToGoalLineSeconds: number;
    /** 1 when the unimpeded path's first goal-line crossing lands inside the goal mouth. */
    readonly crossesGoalMouth: number;
    /** Opponents (kinematically, from position/velocity/acceleration/max speed) able to
     * reach the ball's path at or before the ball, within reach radius. */
    readonly defendersReachingLaneCount: number;
    /** max(0, bestDefenderArrival - ballArrival): how far the ball beats the best-placed
     * defender to its own path, in seconds. Zero when a defender arrives at least as soon. */
    readonly ballLeadSeconds: number;
    /** max(0, ballArrival - bestDefenderArrival): how far the best-placed defender beats
     * the ball, in seconds. Zero when the ball arrives at least as soon. */
    readonly defenderLeadSeconds: number;
    /** Goalkeeper's (or, absent a role assignment, the nearest defender's) reachable lateral
     * coverage of the goal mouth at the ball's arrival, as a fraction of the mouth width. */
    readonly keeperCoverageRatio: number;
}
/** Length equals MATCH_XG_FEATURE_NAMES.length; validated at runtime, not by the TS type,
 * so a feature revision can resize this without a new generic parameter here. */
export type MatchXgVector = readonly number[];
/** Supplied from the authoritative match configuration, never from the candidate model alone. */
export interface MatchXgDomain {
    /** A physics-behavior-only fingerprint (ENGINE_PHYSICS_ID: the WASM's own
     * conformance_hash(), narrower than the runtime's full ENGINE_VERSION build id), so an
     * additive, non-physics engine change never invalidates an otherwise-still-valid model. */
    readonly engineId: string;
    /** SHA-256 of the integration's canonical stadium physics/goal geometry. */
    readonly geometrySha256: string;
    /** SHA-256 of the exact eligibility, attribution and analysis policy used to collect samples. */
    readonly policySha256: string;
    readonly featuresRevision: string;
    readonly featureStage: 'pre-kick' | 'post-kick' | 'end-step';
    /** Game action populations, not a claim that a kick was an intentional football shot. */
    readonly population: 'all-kicks-v1' | 'goalward-release-v1' | 'legacy-end-step-on-target-v1';
    readonly shotDefinitionRevision: string;
    /** Prediction target: a goal attributable to this shot within this simulation-time horizon. */
    readonly outcomeHorizonMs: number;
}
/** Offline descriptor only. No bundled/trained model or telemetry is implied by this contract. */
export interface MatchXgModel {
    readonly schemaVersion: 1;
    readonly id: string;
    readonly purpose: 'production' | 'technical-fixture';
    readonly kind: 'logistic';
    readonly domain: MatchXgDomain;
    /** logit = intercept + sum(weights[i] * (feature[i] - means[i]) / scales[i]). */
    readonly intercept: number;
    readonly weights: MatchXgVector;
    readonly means: MatchXgVector;
    readonly scales: MatchXgVector;
    /** Explicit evaluated support. Outside this box inference returns null, never extrapolates. */
    readonly minimums: MatchXgVector;
    readonly maximums: MatchXgVector;
    /** Structural metric ranges are not an acceptance threshold; offline review owns calibration quality. */
    readonly evaluation: {
        readonly trainingDatasetSha256: string;
        readonly evaluationDatasetSha256: string;
        readonly evaluationReportSha256: string;
        readonly splitUnit: 'match';
        readonly heldOutSamples: number;
        readonly heldOutGoals: number;
        readonly brier: number;
        readonly logLoss: number;
        readonly ece: number;
        readonly eceBins: number;
    };
    /** References to reviewed evidence, not self-authenticating approval or scientific proof. */
    readonly provenance: {
        readonly provider: string;
        readonly source: string;
        readonly license: string;
        readonly reviewedBy: string;
        readonly reviewReference: string;
    };
}
export type MatchXgUnavailableReason = 'missing-model' | 'invalid-domain' | 'invalid-descriptor' | 'domain-mismatch' | 'technical-fixture' | 'untrusted-model' | 'invalid-features' | 'outside-model-support';
export type MatchXgEstimate = {
    readonly xG: null;
    readonly status: 'uncalibrated';
    readonly reason: MatchXgUnavailableReason;
    readonly modelId?: string;
} | {
    readonly xG: number;
    /** Explicit integration approval; validation/inference do not prove scientific calibration. */
    readonly status: 'reviewed-model';
    readonly reason: 'trusted-offline-model';
    readonly modelId: string;
};
export interface MatchXgTrust {
    /**
     * Separate integration-owned allowlist. Never accept this list from the candidate descriptor.
     * @default none — omitted trusts no reviewed offline model
     */
    readonly trustedModels?: readonly MatchXgModel[];
}
