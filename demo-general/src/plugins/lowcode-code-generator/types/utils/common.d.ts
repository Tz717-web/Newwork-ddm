import type { IPublicTypeJSFunction } from '@alilc/lowcode-types';
import { IDependency, IExternalDependency, IInternalDependency } from '../types';
export declare function camel2dash(input: string): string;
/**
 * 转为驼峰
 */
export declare function camelize(str: string): string;
export declare function generateID(): string;
export declare function upperCaseFirst(inputValue: string): string;
export declare function uniqueArray<T>(arr: T[], by: (i: T) => string): T[];
export declare function getStaticExprValue<T>(expr: string): T;
export declare function isJSExpressionFn(data: any): data is IPublicTypeJSFunction;
export declare function isInternalDependency(dependency: IDependency): dependency is IInternalDependency;
export declare function isExternalDependency(dependency: IDependency): dependency is IExternalDependency;
