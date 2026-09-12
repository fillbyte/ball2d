export interface CreateRoomOptions {
    /** Cancels startup only. Close the returned room explicitly after it opens. */
    signal?: AbortSignal;
}
