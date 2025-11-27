import { BuilderComponentPluginFactory } from '../../../types';
export interface PluginConfig {
    fileType?: string;
    implementType: 'inConstructor' | 'insMember' | 'hooks';
}
declare const pluginFactory: BuilderComponentPluginFactory<PluginConfig>;
export default pluginFactory;
