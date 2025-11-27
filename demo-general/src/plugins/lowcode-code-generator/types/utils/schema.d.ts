import { IPublicTypeJSExpression, IPublicTypeNodeSchema, IPublicTypeContainerSchema, IPublicTypeNpmInfo } from '@alilc/lowcode-types';
export declare function isContainerSchema(x: any): x is IPublicTypeContainerSchema;
export declare function isNpmInfo(x: any): x is IPublicTypeNpmInfo;
/**
 * 遍历并处理所有的子节点
 * @param children
 * @param handlers
 * @param options
 * @returns
 */
export declare function handleSubNodes<T>(children: IPublicTypeNodeSchema['children'], handlers: {
    string?: (i: string) => T;
    expression?: (i: IPublicTypeJSExpression) => T;
    node?: (i: IPublicTypeNodeSchema) => T;
}, options?: {
    rerun?: boolean;
    maxDepth?: number;
}): T[];
export declare function isValidContainerType(schema: IPublicTypeNodeSchema): boolean;
export declare const enum ContainerType {
    Page = "Page",
    Component = "Component",
    Block = "Block"
}
