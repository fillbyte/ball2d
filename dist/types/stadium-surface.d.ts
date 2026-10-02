/** The surface families; every surface variant belongs to one. */
export type SurfaceFamily = 'grass' | 'asphalt' | 'felt';
/**
 * The ground a stadium is drawn on, as a `family/variant` id such as
 * `grass/classic-stripes`, `asphalt/street-worn` or `felt/joga-bonito`. Presentation
 * only: physics never reads it, so any layout plays identically on every surface.
 * The variants are listed by `listSurfaces()` and on the docs' stadiums page.
 */
export type StadiumSurface = `${SurfaceFamily}/${string}`;
/** One surface variant, as the SDK's `listSurfaces()` describes it. */
export interface SurfaceInfo {
    readonly id: StadiumSurface;
    readonly family: SurfaceFamily;
    /** English name. */
    readonly name: string;
    /** Search and filter words, such as `classic`, `night`, `street` or `retro`. */
    readonly tags: readonly string[];
    /** Whether this is the variant its family's plain name (`grass`, `asphalt`, `felt`) shows. */
    readonly isDefault: boolean;
}
