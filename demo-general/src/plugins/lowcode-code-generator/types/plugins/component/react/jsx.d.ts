import { BuilderComponentPluginFactory } from '../../../types';
export interface PluginConfig {
    fileType?: string;
    nodeTypeMapping?: Record<string, string>;
}
declare const pluginFactory: BuilderComponentPluginFactory<PluginConfig>;
export default pluginFactory;
