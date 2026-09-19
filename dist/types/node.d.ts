import type { RoomConfig } from './config.js';
import type { Room } from './room.js';
import type { CreateRoomOptions } from './creation.js';
export { readReplay, validateStadium } from './browser.js';
export type { Replay, StadiumValidation, CreateRoomOptions, HostPlayer, HostScores, HostDiscProperties, } from './browser.js';
export interface NodeRoomConfig extends RoomConfig {
    /** Ball2D signaling service. Defaults to https://ball2d.com. */
    serviceOrigin?: string;
    /** Required account-owned API key. Keep it on your server, never in browser code. */
    apiKey: string;
}
export type NodeRoom = Room & {
    readonly closed: Promise<void>;
};
export declare function createRoom(config: NodeRoomConfig, creation?: CreateRoomOptions): Promise<NodeRoom>;
