import { BuilderComponentPluginFactory } from '../../../../../types';
export type IceJs3PackageJsonPluginConfig = {
    /**
     * 数据源配置
     */
    datasourceConfig?: {
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
    };
    /** 包名 */
    packageName?: string;
    /** 版本 */
    packageVersion?: string;
};
declare const pluginFactory: BuilderComponentPluginFactory<IceJs3PackageJsonPluginConfig>;
export default pluginFactory;
