import { BuilderComponentPluginFactory } from '../../../types';
export interface PluginConfig {
    fileType?: string;
    /** prefer using class property to define utils */
    preferClassProperty?: boolean;
}
declare const pluginFactory: BuilderComponentPluginFactory<PluginConfig>;
export default pluginFactory;
