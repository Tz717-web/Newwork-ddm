export interface INpmPackage {
    package: string;
    version: string;
}
/**
 * 外部依赖描述
 *
 * @export
 * @interface IExternalDependency
 */
export interface IExternalDependency extends INpmPackage, IDependency {
}
export declare enum InternalDependencyType {
    PAGE = "pages",
    BLOCK = "components",
    COMPONENT = "components",
    UTILS = "utils"
}
export declare enum DependencyType {
    External = "External",
    Internal = "Internal"
}
export interface IInternalDependency extends IDependency {
    type: InternalDependencyType;
    moduleName: string;
}
export interface IDependency {
    destructuring: boolean;
    exportName: string;
    subName?: string;
    main?: string;
    dependencyType?: DependencyType;
    componentName?: string;
}
