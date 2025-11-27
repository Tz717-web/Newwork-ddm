import { BuilderComponentPluginFactory } from '../../../types';
import { RaxFrameworkOptions } from '../../project/framework/rax/types/RaxFrameworkOptions';
export interface PluginConfig extends RaxFrameworkOptions {
    fileType?: string;
    /**
     * 数据源的 handlers 的映射配置
     * @deprecated 请使用 datasourceConfig.handlersPackages 来配置
     */
    dataSourceHandlersPackageMap?: Record<string, string>;
}
declare const pluginFactory: BuilderComponentPluginFactory<PluginConfig>;
export default pluginFactory;
