import { IScope } from '../types';
/**
 * 是否是广义上的 JSFunction
 * @param value
 * @returns
 */
export declare function isBroadJSFunction(value: unknown): boolean;
export declare function generateExpression(value: any, scope: IScope): string;
export declare function generateFunction(value: any, config?: {
    name?: string;
    isMember?: boolean;
    isBlock?: boolean;
    isArrow?: boolean;
    isBindExpr?: boolean;
}): string;
