/** Presentation facts are independent of physics, account state, and sound assets. */
export type CommentaryLocale = 'tr' | 'en';
export type CommentaryTeam = 1 | 2;
export type CommentaryDose = 'off' | 'minimal' | 'balanced' | 'rich';
export type CommentaryIntentKind = 'kickoff' | 'restart' | 'goal.neutral' | 'goal.first' | 'goal.equalizer' | 'goal.lead' | 'goal.late-winner' | 'goal.consolation' | 'goal.own-goal' | 'post' | 'near-miss' | 'pressure' | 'pass' | 'pass-chain' | 'turnover' | 'assist' | 'save' | 'shot' | 'block' | 'counterattack' | 'attack-progress' | 'sustained-pressure' | 'tactical-summary' | 'match-end.win' | 'match-end.draw' | 'match-stop' | 'pause' | 'resume' | 'context.fact';
export interface CommentaryPlayerIdentity {
    /** Room/connection generation qualified; never reuse for a new occupant of a slot. */
    readonly sessionId: string;
    readonly playerId: number;
    readonly team: CommentaryTeam;
    readonly name?: string;
}
export interface CommentaryMatchContext {
    readonly phase: 'lobby' | 'playing' | 'goal' | 'finished';
    readonly paused?: boolean;
    /** Simulation seconds, not wall-clock time and not ticks. Zero limit means unlimited. */
    readonly elapsed: number;
    readonly timeLimit: number;
    readonly scoreLimit: number;
    readonly score: {
        readonly red: number;
        readonly blue: number;
    };
}
export interface MatchFact {
    readonly eventId: string;
    /** Explicitly reset/baseline the consumer when joining a new stream. */
    readonly streamId: string;
    readonly sequence: number;
    readonly tick: number;
    readonly epoch: number;
    readonly kind: 'kickoff' | 'restart' | 'goal' | 'pause' | 'resume' | 'end' | 'stop';
    readonly context: CommentaryMatchContext;
    readonly goal?: {
        readonly team: CommentaryTeam;
        readonly scorer: CommentaryPlayerIdentity | null;
        readonly ownGoal: boolean;
    };
    readonly endReason?: 'time-limit' | 'score-limit' | 'draw' | 'script';
}
/** Optional human-supplied alignment; binding validation is not artistic or rights approval. */
export interface CommentaryWordTiming {
    readonly schemaVersion: 1;
    readonly audioSha256: string;
    readonly textSha256: string;
    readonly durationMs: number;
    readonly words: readonly {
        /** Exact UTF-16 offsets of each complete whitespace-delimited token. */
        readonly startChar: number;
        readonly endChar: number;
        readonly startMs: number;
        readonly endMs: number;
    }[];
    readonly annotation: {
        readonly source: string;
        readonly reviewer: string;
        readonly reference: string;
    };
}
export interface CommentaryCue {
    readonly id: string;
    readonly locale: CommentaryLocale;
    readonly role: 'play-by-play' | 'analyst';
    readonly family: CommentaryIntentKind;
    /** Same idea/opening across different recordings: anti-repeat follows meaning. */
    readonly semanticKey: string;
    readonly openingKey: string;
    readonly text: string;
    readonly intensity: readonly [number, number];
    readonly durationMs: number;
    readonly onsetMs: number;
    readonly interruptibleAtMs: readonly number[];
    readonly cooldownMs: number;
    readonly audio: {
        readonly url: string;
        readonly sha256: string;
    } | null;
    readonly wordTiming?: CommentaryWordTiming;
    readonly provenance: {
        readonly source: string;
        readonly license: string;
        readonly status: 'draft' | 'approved';
    };
    readonly fallbackId?: string;
    /** No arbitrary runtime interpolation; a recorded full sentence must name its fact. */
    readonly contextFactKey?: string;
    readonly contextFactValue?: string | number;
}
export interface CommentaryFamilyPolicy {
    readonly enabled?: boolean;
    readonly cooldownMs?: number;
    readonly priority?: number;
    readonly ttlMs?: number;
}
export interface CommentaryPolicy {
    readonly locale: CommentaryLocale;
    readonly dose: CommentaryDose;
    readonly reactionIntensity: number;
    readonly maxDurationMs: number;
    readonly minGapMs: number;
    readonly semanticCooldownMs: number;
    readonly historySize: number;
    readonly traceSize: number;
    readonly seed: number;
    readonly families: Readonly<Partial<Record<CommentaryIntentKind, CommentaryFamilyPolicy>>>;
    readonly contextFactsEnabled: boolean;
    /** Host presentation ceilings. Omitted channels allow delivery; local consent still applies. */
    readonly channels?: {
        readonly audio?: boolean;
        readonly caption?: boolean;
        readonly chat?: boolean;
    };
}
/** An optional pre-fetched annotation; this is never a gameplay authority or a fetch command. */
export interface CommentaryPlayerFact {
    readonly id: string;
    readonly player: CommentaryPlayerIdentity;
    /** Stable key identifies a fully authored/recorded compatible cue. */
    readonly key: string;
    readonly value: string | number;
    readonly source: string;
    /** Provider trust is granted by the host integration, never by a client's payload. */
    readonly trusted: boolean;
    readonly issuedAtMs: number;
    readonly expiresAtMs: number;
}
export interface CommentaryPlan {
    readonly id: string;
    readonly eventId: string;
    readonly streamId: string;
    readonly epoch: number;
    readonly family: CommentaryIntentKind;
    readonly cueId: string;
    readonly text: string;
    readonly locale: CommentaryLocale;
    readonly role: CommentaryCue['role'];
    readonly intensity: number;
    readonly priority: number;
    readonly createdAtMs: number;
    readonly expiresAtMs: number;
    readonly durationMs: number;
    readonly wordTiming?: CommentaryWordTiming;
    readonly canInterrupt: boolean;
    readonly interruptibleAtMs: readonly number[];
    readonly context: CommentaryMatchContext;
    readonly confidence: 'authoritative' | 'supported';
    readonly explanation: readonly string[];
    readonly playerFact?: CommentaryPlayerFact;
    /** Correlation never invents a result; it prevents retelling the same observed attack. */
    readonly attackId?: string;
}
export interface CommentarySelectionAudit {
    readonly catalog: number;
    readonly eligible: number;
    readonly ready: number;
    readonly considered: number;
    readonly outsideWindow: number;
    readonly fallback: boolean;
    readonly rejected: Readonly<Partial<Record<'language' | 'duration' | 'intensity' | 'context-fact' | 'not-ready' | 'cooldown', number>>>;
    /** At most eight considered candidates; counts above describe the rest. */
    readonly candidates: readonly {
        readonly cueId: string;
        readonly score: number;
        readonly repetitionPenalty: number;
        readonly tieBreaker: number;
        readonly cooling: boolean;
    }[];
}
export interface CommentaryTrace {
    readonly atMs: number;
    readonly eventId: string;
    readonly action: 'reject' | 'silence' | 'plan' | 'played' | 'previewed' | 'displayed' | 'cancel' | 'defer';
    readonly reason: string;
    readonly cueId?: string;
    readonly family?: CommentaryIntentKind;
    readonly fact?: {
        readonly kind: string;
        readonly tick: number;
        readonly epoch: number;
        readonly context: CommentaryMatchContext;
    };
    readonly evidence?: readonly string[];
    readonly selection?: CommentarySelectionAudit;
}
export interface CommentaryBaseline {
    readonly streamId: string;
    readonly sequence: number;
    readonly epoch: number;
}
export type CommentaryPolicyPatch = Partial<CommentaryPolicy>;
export type CommentaryPlayerFactInput = Omit<CommentaryPlayerFact, 'player' | 'trusted'>;
export interface CommentaryGoalGeometry {
    readonly id: string;
    readonly p0: readonly [number, number];
    readonly p1: readonly [number, number];
    readonly defendingTeam: CommentaryTeam;
    /** A known playable point on the field side. Off-centre/rotated stadiums need no origin assumption. */
    readonly pitchPoint: readonly [number, number];
}
export interface CommentaryAnalysisFrame {
    readonly streamId: string;
    readonly epoch: number;
    readonly tick: number;
    readonly context: CommentaryMatchContext;
    readonly ball: {
        readonly x: number;
        readonly y: number;
        /** Units/second in world coordinates. The adapter converts native per-tick velocity. */
        readonly vx: number;
        readonly vy: number;
        readonly radius: number;
    };
    readonly goals: readonly CommentaryGoalGeometry[];
    readonly contact?: {
        readonly kind: 'kick' | 'post' | 'player' | 'wall' | 'net';
        readonly player?: CommentaryPlayerIdentity;
        readonly goalId?: string;
    };
}
export interface CommentaryObservation {
    readonly eventId: string;
    readonly streamId: string;
    readonly epoch: number;
    readonly tick: number;
    readonly kind: 'directed-shot' | 'post' | 'near-miss' | 'pressure' | 'block';
    readonly context: CommentaryMatchContext;
    readonly confidence: 'supported';
    readonly evidence: readonly string[];
    readonly attackingTeam: CommentaryTeam;
    readonly intensity: number;
    readonly player?: CommentaryPlayerIdentity;
    readonly attackId?: string;
}
export interface CommentaryConfiguration {
    readonly policy: CommentaryPolicy;
    readonly playerFacts: readonly CommentaryPlayerFact[];
    /** Configuration transport converts expiry durations to the receiver's clock domain. */
    readonly hostNowMs: number;
    /** Omitted means unchanged; null restores the built-in catalog. */
    readonly catalog?: readonly CommentaryCue[] | null;
    readonly atmosphere: AtmospherePolicy;
    /** Omitted means unchanged; null restores the built-in atmosphere assets. */
    readonly atmospherePack?: AtmospherePack | null;
}
export interface AtmospherePolicy {
    readonly enabled: boolean;
    readonly bedIntensity: number;
    readonly reactionIntensity: number;
    readonly chantIntensity: number;
    readonly chantCooldownMs: number;
    /** Neutral is the default; the room must explicitly declare a supporter preference. */
    readonly preferredTeam: 'neutral' | CommentaryTeam;
}
export interface AtmosphereCue {
    readonly id: string;
    readonly kind: 'bed' | 'tension' | 'goal' | 'disappointment' | 'chant' | 'post' | 'near-miss' | 'release';
    readonly team: 'neutral' | CommentaryTeam;
    readonly intensity: readonly [number, number];
    /** Complete decoded recording duration, from 100 to 60,000 milliseconds. */
    readonly durationMs: number;
    /** Bed/tension/chant only; at least 100 ms, wholly inside the recording. */
    readonly loop: {
        readonly startMs: number;
        readonly endMs: number;
    } | null;
    readonly audio: {
        readonly url: string;
        readonly sha256: string;
    };
    readonly provenance: CommentaryCue['provenance'];
}
export interface AtmospherePack {
    readonly id: string;
    readonly version: string;
    readonly cues: readonly AtmosphereCue[];
}
