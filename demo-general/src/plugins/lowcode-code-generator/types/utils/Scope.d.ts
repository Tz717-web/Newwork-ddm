import { IScope } from '../types/core';
import { IScopeBindings } from './ScopeBindings';
export declare class Scope implements IScope {
    readonly parent: IScope | null;
    /**
     * 创建根部 Scope，根据需要被上溯的作用域链决定是否开启新的
     */
    static createRootScope(): IScope;
    bindings?: IScopeBindings;
    constructor(parent?: IScope | null);
    createSubScope(ownIdentifiers: string[]): IScope;
}
