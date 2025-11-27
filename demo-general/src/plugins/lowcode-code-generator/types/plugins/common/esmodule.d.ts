import { BuilderComponentPluginFactory, IDependency } from '../../types';
export interface PluginConfig {
    fileType?: string;
    useAliasName?: boolean;
    filter?: (deps: IDependency[]) => IDependency[];
}
declare const pluginFactory: BuilderComponentPluginFactory<PluginConfig>;
export default pluginFactory;
