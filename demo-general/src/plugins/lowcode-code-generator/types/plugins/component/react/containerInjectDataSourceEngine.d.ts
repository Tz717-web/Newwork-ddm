import { BuilderComponentPluginFactory } from '../../../types';
export interface PluginConfig {
    fileType?: string;
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
}
declare const pluginFactory: BuilderComponentPluginFactory<PluginConfig>;
export default pluginFactory;
