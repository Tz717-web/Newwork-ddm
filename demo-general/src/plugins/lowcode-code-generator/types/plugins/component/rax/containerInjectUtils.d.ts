import { BuilderComponentPluginFactory } from '../../../types';
export interface PluginConfig {
    fileType: string;
}
declare const pluginFactory: BuilderComponentPluginFactory<PluginConfig>;
export default pluginFactory;
