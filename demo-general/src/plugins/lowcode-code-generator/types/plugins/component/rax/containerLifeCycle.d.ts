import { BuilderComponentPluginFactory } from '../../../types';
export interface PluginConfig {
    fileType: string;
    exportNameMapping: Record<string, string>;
    normalizeNameMapping: Record<string, string>;
}
declare const pluginFactory: BuilderComponentPluginFactory<PluginConfig>;
export default pluginFactory;
