import type { MatchXgRuntimeConfig, MatchXgRuntimeStatus } from './match-xg-runtime.js';
import type { HostPlayer, HostScores, HostDiscProperties } from './player.js';
import type { DiscPropertyPatch } from './disc.js';
import type { MatchState } from './match-state.js';
import type { AnnouncementStyle } from './announcement.js';
import type { RoomHooks } from './room-hooks.js';
import type { AtmospherePack, AtmospherePolicy, CommentaryCue, CommentaryGoalGeometry, CommentaryPlayerFact, CommentaryPlayerFactInput, CommentaryPolicy, CommentaryPolicyPatch } from './commentary.js';
import type { MatchIntelligencePolicy, MatchIntelligencePolicyPatch, MatchIntelligenceRoleAssignment, MatchIntelligenceRoleInput, MatchIntelligenceSnapshot } from './match-intelligence.js';
import type { MatchStatsSnapshot } from './match-stats.js';
import type { StadiumSurface } from './stadium-surface.js';
/** Public room contract: runtime classes and transport types are deliberately absent. */
export interface Room extends RoomHooks {
    readonly roomId: string;
    readonly roomLink: string;
    readonly roomName: string;
    readonly signal: AbortSignal;
    readonly lastRecording: Blob | null;
    /** Host-local opt-in; preparation performs hashes outside the simulation loop. null disables. */
    setMatchXgConfig(config: MatchXgRuntimeConfig | null): Promise<void>;
    getMatchXgStatus(): MatchXgRuntimeStatus;
    setCommentaryPolicy(patch: CommentaryPolicyPatch): Promise<void>;
    getCommentaryPolicy(): CommentaryPolicy;
    setMatchIntelligencePolicy(patch: MatchIntelligencePolicyPatch): Promise<void>;
    getMatchIntelligencePolicy(): MatchIntelligencePolicy;
    /** Replaces all explicit role assignments; [] clears them. Only current field players qualify. */
    setMatchIntelligenceRoles(roles: readonly MatchIntelligenceRoleInput[]): Promise<void>;
    getMatchIntelligenceRoles(): readonly MatchIntelligenceRoleAssignment[];
    /** In-memory observations for this match, never persistent player statistics. */
    getMatchIntelligenceSnapshot(): MatchIntelligenceSnapshot;
    /** In-memory per-team/per-player counters, heatmaps, distance, coverage and timeline for the
     * current stream; never persisted. Derives from the same `onMatchFact`/`onMatchObservation`/
     * `onMatchIntelligenceEvent`/`onMatchKickEstimate` hooks rather than a dedicated push event —
     * call this to read the current snapshot after any of those fire, or on your own cadence. */
    getMatchStatsSnapshot(): MatchStatsSnapshot;
    setPlayerCommentaryContext(id: number, facts: readonly CommentaryPlayerFactInput[] | null): Promise<void>;
    getPlayerCommentaryContext(id: number): CommentaryPlayerFact[];
    setCommentaryGeometry(goals: readonly CommentaryGoalGeometry[] | null): Promise<void>;
    getCommentaryGeometry(): readonly CommentaryGoalGeometry[];
    setCommentaryCatalog(cues: readonly CommentaryCue[] | null): Promise<void>;
    getCommentaryCatalog(): readonly CommentaryCue[] | null;
    setAtmospherePolicy(patch: Partial<AtmospherePolicy>): Promise<void>;
    getAtmospherePolicy(): AtmospherePolicy;
    setAtmospherePack(pack: AtmospherePack | null): Promise<void>;
    getAtmospherePack(): AtmospherePack | null;
    getPlayerList(): HostPlayer[];
    getPlayer(id: number): HostPlayer | null;
    setTeamColors(team: number, angle: number, textColor: number, colors: number[]): Promise<void>;
    reorderPlayers(playerIdList: number[], moveToTop: boolean): Promise<void>;
    setPlayerAvatar(id: number, avatar: string | null): Promise<void>;
    setPlayerTeam(id: number, team: 0 | 1 | 2): Promise<void>;
    setPlayerAdmin(id: number, admin: boolean): Promise<void>;
    /** Mute room chat for this player until unmuted or they leave. */
    setPlayerMuted(id: number, muted: boolean): Promise<void>;
    setTeamsLock(locked: boolean): Promise<void>;
    kickPlayer(id: number, reason?: string, ban?: boolean): Promise<void>;
    clearBan(id: number): Promise<void>;
    clearBans(): Promise<void>;
    sendChat(text: string, targetId?: number | null): Promise<void>;
    /** Literal text, up to 1,000 characters. RGB color 0x000000–0xffffff;
     * null target broadcasts. Sound 0/1/2 is subject to recipient preferences. */
    sendAnnouncement(text: string, targetId?: number | null, color?: number | null, style?: AnnouncementStyle | null, sound?: number | null): Promise<void>;
    startGame(): Promise<void>;
    stopGame(): Promise<void>;
    pauseGame(paused: boolean): Promise<void>;
    setKickRateLimit(min?: number, rate?: number, burst?: number): Promise<void>;
    setPassword(password: string | null): Promise<void>;
    readonly requireVerification: boolean | null;
    setRequireVerification(required: boolean): Promise<void>;
    setScoreLimit(limit: number): Promise<void>;
    setTimeLimit(minutes: number): Promise<void>;
    /**
     * Load a bundled layout by case-sensitive canonical name or ID from `listStadiums()`.
     * Only applies between matches; during play it resolves without changing the stadium.
     * Loading finishes a recording and resets the score, preserving match limits and surface choice.
     */
    setDefaultStadium(name: string): Promise<void>;
    /**
     * Load JSON5 stadium source between matches, using the same checks as `validateStadium()`.
     * During play it resolves without validating or applying the source. Await `stopGame()` first.
     * Pitch appearance and dimensions remain independent from walls, goals and player physics.
     */
    setCustomStadium(source: string): Promise<void>;
    /**
     * Draw the stadium on another surface for every player, live, without restarting the
     * match; `null` returns to the stadium's own default. Presentation only, and recorded.
     */
    setSurface(surface: StadiumSurface | null): Promise<void>;
    /** The host's surface choice, or `null` while the stadium's own default surface shows. */
    getSurface(): StadiumSurface | null;
    getScores(): HostScores | null;
    getBallPosition(): {
        x: number;
        y: number;
    } | null;
    readonly CollisionFlags: Readonly<Record<string, number>>;
    getDiscCount(): number;
    getDiscProperties(discIndex: number): HostDiscProperties | null;
    setDiscProperties(discIndex: number, properties: DiscPropertyPatch): Promise<void>;
    setPlayerDiscProperties(playerId: number, properties: DiscPropertyPatch): Promise<void>;
    getPlayerDiscProperties(playerId: number): HostDiscProperties | null;
    getState(): MatchState;
    startRecording(): void;
    stopRecording(): Blob | null;
    close(): void;
}
