import type { RoomGeo } from './room-geo.js';
import type { StadiumSurface } from './stadium-surface.js';
export interface RoomConfig {
    /** @default false */
    noPlayer?: boolean;
    /** @default "Host" */
    playerName?: string;
    /** @default "Headless Room" */
    roomName?: string;
    /**
     * @default 12
     * @range 2–32, clamped
     */
    maxPlayers?: number;
    /** @default "" */
    password?: string;
    /** @default false */
    public?: boolean;
    /** @default none — the built-in default arena */
    stadium?: string;
    /**
     * The surface every player sees the stadium on. Presentation only; physics is unchanged.
     * @default none — each stadium's own default surface
     */
    surface?: StadiumSurface;
    /**
     * Override the room's advertised location; does not select a game server.
     * @default none — the service uses the location it sees
     */
    geo?: RoomGeo;
}
