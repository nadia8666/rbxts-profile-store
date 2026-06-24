type VersionQuery = DataStoreVersionPages

export type Profile<InputKey, Template, SourceStore> = {
    Data: Template
    readonly LastSavedData: Template

    readonly FirstSessionTime: number
    readonly SessionLoadCount: number
    readonly Session: { PlaceId: number, JobId: string } | undefined

    RobloxMetaData: { [Index: string]: unknown, [Index: number]: unknown }
    readonly UserIds: [number]

    KeyInfo: DataStoreKeyInfo

    readonly OnSave: RBXScriptSignal
    readonly OnLastSave: RBXScriptSignal
    readonly OnSessionEnd: RBXScriptSignal
    readonly OnAfterSave: RBXScriptSignal
    readonly ProfileStore: SourceStore
    readonly Key: InputKey

    IsActive(): boolean
    Reconcile(): void
    EndSession(): void
    AddUserId(UID: number): void
    RemoveUserId(UID: number): void
    MessageHandler(Execute: (Message: { [Index: string]: unknown, [Index: number]: unknown }, Processed: () => void) => void): void
    Save(): void
    SetAsync(): void
}

declare class Store<Name, Template> {
    readonly Name: Name
    readonly Mock: Store<Name, Template>

    StartSessionAsync(Key: string, Parameters?: { Cancel?: () => boolean, Steal?: boolean }): Profile<typeof Key, Template, this> | undefined
    MessageAsync(Key: string, Message: { [Index: string]: unknown, [Index: number]: unknown }): boolean
    GetAsync(Key: string, Version?: number): Profile<typeof Key, Template, this> | undefined
    VersionQuery(Key: string, SortDirection?: Enum.SortDirection, MinDate?: DateTime | number, MaxDate?: DateTime | number): VersionQuery
    RemoveAsync(Key: string): boolean
}

declare type StoreConstructor = {
    readonly IsClosing: boolean
    readonly IsCriticalState: boolean
    readonly OnError: RBXScriptSignal
    readonly OnOverwrite: RBXScriptSignal
    readonly OnCriticalToggle: RBXScriptSignal
    readonly DataStoreState: "NotReady" | "NoInternet" | "NoAccess" | "Access"

    SetConstant: (name: "AUTO_SAVE_PERIOD" | "LOAD_REPEAT_PERIOD" | "FIRST_LOAD_REPEAT" | "SESSION_STEAL" | "ASSUME_DEAD" | "START_SESSION_TIMEOUT" | "CRITICAL_STATE_ERROR_COUNT" | "CRITICAL_STATE_ERROR_EXPIRE" | "CRITICAL_STATE_EXPIRE" | "MAX_MESSAGE_QUEUE", value: number) => void
    new <Template>(StoreName: string, Template?: Template): Store<typeof StoreName, Template>
}

export declare const ProfileStore: StoreConstructor;