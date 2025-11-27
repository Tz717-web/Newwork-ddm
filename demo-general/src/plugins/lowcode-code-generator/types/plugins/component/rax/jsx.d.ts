import { BuilderComponentPluginFactory } from '../../../types';
export interface PluginConfig {
    fileType: string;
    /** 是否要忽略小程序 */
    ignoreMiniApp?: boolean;
}
declare const pluginFactory: BuilderComponentPluginFactory<PluginConfig>;
export default pluginFactory;
