import { IScope } from '../../../types';
export declare function transformJsExpr(expr: string, scope: IScope, { dontWrapEval, dontTransformThis2ContextAtRootScope }?: {
    dontWrapEval?: boolean | undefined;
    dontTransformThis2ContextAtRootScope?: boolean | undefined;
}): string;
