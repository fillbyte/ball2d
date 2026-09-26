import type { HostPlayer, HostScores } from './player.js';
/**
 * Application callbacks a host room invokes. All are optional and run with the room
 * as `this`; they observe the room and may call its commands.
 */
export interface RoomHooks {
    onRecordingComplete?: (blob: Blob, reason: string) => void;
    onRoomLink?: (url: string) => void;
    onPlayerJoin?: (p: HostPlayer) => void;
    onPlayerTeamChange?: (p: HostPlayer, byPlayer: HostPlayer | null) => void;
    onPlayerMuteChange?: (p: HostPlayer, byPlayer: HostPlayer | null) => void;
    onPlayerAdminChange?: (p: HostPlayer, byPlayer: HostPlayer | null) => void;
    onGameStart?: (byPlayer: HostPlayer | null) => void;
    onGameStop?: (byPlayer: HostPlayer | null) => void;
    onTeamVictory?: (scores: HostScores) => void;
    /** Legacy Ball2D callback; prefer onTeamVictory. */
    onGameVictory?: (scores: HostScores) => void;
    onGamePauseChange?: (paused: boolean) => void;
    onGamePause?: (byPlayer: HostPlayer | null) => void;
    onGameUnpause?: (byPlayer: HostPlayer | null) => void;
    onPlayerLeave?: (p: HostPlayer) => void;
    onPlayerKicked?: (p: HostPlayer, reason: string, ban: boolean, byPlayer: HostPlayer | null) => void;
    onPlayerActivity?: (p: HostPlayer) => void;
    /** Runs only when a peer changes its accepted key state; prevInput is the previous authoritative bitmask. */
    onPlayerInput?: (p: HostPlayer, prevInput: number) => void;
    onPlayerChat?: (p: HostPlayer, text: string) => boolean | void;
    /** Host-visible direct chat; return false to suppress delivery to both participants. */
    onPlayerDirectChat?: (p: HostPlayer, recipient: HostPlayer, text: string) => boolean | void;
    onPlayerBallKick?: (p: HostPlayer) => void;
    onTeamGoal?: (team: 1 | 2) => void;
    onPositionsReset?: () => void;
    onStadiumChange?: (name: string, byPlayer: HostPlayer | null) => void;
    onTeamsLockChange?: (locked: boolean, byPlayer: HostPlayer | null) => void;
    onKickRateLimitSet?: (min: number, rate: number, burst: number, byPlayer: HostPlayer | null) => void;
    onGameTick?: () => void;
    onError?: (message: string) => void;
}
