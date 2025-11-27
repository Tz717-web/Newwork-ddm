import { BaseGenerator, IScope } from '../types/core';
export declare function executeFunctionStack<I, T, C>(input: I, scope: IScope, funcs: BaseGenerator<I, T, C> | Array<BaseGenerator<I, T, C>>, baseFunc: BaseGenerator<I, T, C>, config?: C): T;
