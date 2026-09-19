/** Supported public disc properties; no internal solver offsets or validation tables. */
export type DiscProperty = 'x' | 'y' | 'xspeed' | 'yspeed' | 'xgravity' | 'ygravity' | 'radius' | 'bCoeff' | 'invMass' | 'damping' | 'color' | 'cMask' | 'cGroup';
export type DiscProperties = Record<DiscProperty, number>;
export type DiscPropertyPatch = Partial<Record<DiscProperty, number | null>>;
