import type { StadiumSurface } from './stadium-surface.js';
export interface StadiumValidation {
    readonly name: string;
    /** The surface the stadium shows unless the room chooses another; `none` draws no pitch. */
    readonly surface: StadiumSurface | 'none';
    readonly canBeStored: boolean;
    readonly warnings: readonly string[];
}
/** A bundled stadium returned by `listStadiums()`, without loading a room or an asset. */
export interface StadiumInfo {
    /** Stable layout ID accepted by `room.setDefaultStadium()`. */
    readonly id: string;
    /** Canonical stadium name accepted by `room.setDefaultStadium()` and emitted by stadium events. */
    readonly name: string;
    /** English picker label, which makes the size tier explicit for rounded layouts. */
    readonly displayName: string;
    /** Size tier in ascending catalogue order. */
    readonly tier: 'small' | 'classic' | 'big' | 'huge';
    /** Corner shape; square means square corners, not equal pitch sides. */
    readonly shape: 'square' | 'rounded';
    /** Full painted pitch dimensions in game units; stadium source stores half of these values. */
    readonly pitch: {
        readonly width: number;
        readonly height: number;
    };
    /** Full camera arena dimensions in game units; stadium source stores half of these values. */
    readonly arena: {
        readonly width: number;
        readonly height: number;
    };
    /** Full goal opening in game units. */
    readonly goalWidth: number;
    /** Pitch corner radius in game units, zero for square corners. */
    readonly cornerRadius: number;
    /** Suggested player count per team, not an enforced room capacity or matchmaking rule. */
    readonly teamSize: {
        readonly min: number;
        readonly max: number;
    };
}
