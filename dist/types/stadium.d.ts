export interface StadiumValidation {
    readonly name: string;
    readonly canBeStored: boolean;
    readonly warnings: readonly string[];
}
