import * as parser from '@babel/parser';
import * as t from '@babel/types';
import { IScope } from '../types';
export declare class ParseError extends Error {
    readonly expr: string | t.Expression;
    readonly detail: unknown;
    constructor(expr: string | t.Expression, detail: unknown);
}
export interface ParseExpressionGetGlobalVariablesOptions {
    filter?: (varName: string) => boolean;
}
export declare function parseExpressionGetKeywords(expr: string | null | undefined): string[];
export declare function parseExpressionGetGlobalVariables(expr: string | null | undefined, { filter }?: ParseExpressionGetGlobalVariablesOptions): string[];
export declare function parseExpressionConvertThis2Context(expr: string | t.Expression, contextName?: string, localVariables?: string[]): string;
export declare function parseExpression(expr: string): parser.ParseResult<t.Expression>;
export declare function transformExpressionLocalRef(expr: string, scope: IScope): string;
