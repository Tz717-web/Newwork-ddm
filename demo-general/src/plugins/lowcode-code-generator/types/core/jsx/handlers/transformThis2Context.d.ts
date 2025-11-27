import { Expression } from '@babel/types';
import { IScope } from '../../../types';
/**
 * 将所有的 this.xxx 替换为 __$$context.xxx
 * @param expr
 */
export declare function transformThis2Context(expr: string | Expression, scope: IScope, { ignoreRootScope }?: {
    ignoreRootScope?: boolean | undefined;
}): string;
