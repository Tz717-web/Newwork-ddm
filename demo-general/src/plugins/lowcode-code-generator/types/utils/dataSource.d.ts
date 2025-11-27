import type { IProjectInfo } from '../types/intermediate';
export interface DataSourceDependenciesConfig {
    /** 数据源引擎的版本 */
    engineVersion?: string;
    /** 数据源引擎的包名 */
    enginePackage?: string;
    /** 数据源 handlers 的版本 */
    handlersVersion?: {
        [key: string]: string;
    };
    /** 数据源 handlers 的包名 */
    handlersPackages?: {
        [key: string]: string;
    };
}
export declare function buildDataSourceDependencies(ir: IProjectInfo, cfg?: DataSourceDependenciesConfig): Record<string, string>;
