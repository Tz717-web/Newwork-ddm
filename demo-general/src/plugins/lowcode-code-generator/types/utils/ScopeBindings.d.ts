export interface IScopeBindings {
    readonly parent: IScopeBindings | null;
    hasBinding: (varName: string) => boolean;
    hasOwnBinding: (varName: string) => boolean;
    addBinding: (varName: string) => void;
    removeBinding: (varName: string) => void;
    getAllBindings: () => string[];
    getAllOwnedBindings: () => string[];
}
export declare class ScopeBindings implements IScopeBindings {
    readonly parent: IScopeBindings | null;
    private _bindings;
    constructor(p?: IScopeBindings | null);
    hasBinding(varName: string): boolean;
    hasOwnBinding(varName: string): boolean;
    addBinding(varName: string): void;
    removeBinding(varName: string): void;
    getAllBindings(): string[];
    getAllOwnedBindings(): string[];
}
