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
}
export type MatchXgVector = readonly [
    distance: number,
    angle: number,
    speed: number,
    defenders: number
];
/** Supplied from the authoritative match configuration, never from the candidate model alone. */
export interface MatchXgDomain {
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
    /** Separate integration-owned allowlist. Never accept this list from the candidate descriptor. */
    readonly trustedModels?: readonly MatchXgModel[];
}
