import type { RoomGeo } from './room-geo.js';
export interface RoomConfig {
    noPlayer?: boolean;
    playerName?: string;
    roomName?: string;
    maxPlayers?: number;
    password?: string;
    public?: boolean;
    stadium?: string;
    /** Override the room's advertised location; does not select a game server. */
    geo?: RoomGeo;
}
