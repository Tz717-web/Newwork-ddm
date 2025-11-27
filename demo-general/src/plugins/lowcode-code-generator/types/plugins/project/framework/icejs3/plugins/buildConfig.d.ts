import { BuilderComponentPluginFactory } from '../../../../../types';
export interface BuildConfigPluginConfig {
    /** 包名 */
    themePackage?: string;
}
declare const pluginFactory: BuilderComponentPluginFactory<BuildConfigPluginConfig>;
export default pluginFactory;
