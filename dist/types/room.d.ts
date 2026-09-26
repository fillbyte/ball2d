import type { HostPlayer, HostScores, HostDiscProperties } from './player.js';
import type { DiscPropertyPatch } from './disc.js';
import type { MatchState } from './match-state.js';
import type { AnnouncementStyle } from './announcement.js';
import type { RoomHooks } from './room-hooks.js';
/** Public room contract: runtime classes and transport types are deliberately absent. */
export interface Room extends RoomHooks {
    readonly roomId: string;
    readonly roomLink: string;
    readonly roomName: string;
    readonly signal: AbortSignal;
    readonly lastRecording: Blob | null;
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
    setDefaultStadium(name: string): Promise<void>;
    setCustomStadium(source: string): Promise<void>;
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
