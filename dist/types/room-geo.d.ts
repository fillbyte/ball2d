/** Public discovery location; never a routing or authorization claim. */
export interface RoomGeo {
    /** Two-letter country code, such as `DE`. Case-insensitive. */
    code: string;
    /** @range −90 to 90 */
    lat: number;
    /** @range −180 to 180 */
    lon: number;
}
