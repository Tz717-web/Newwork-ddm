import { IProjectBuilder, IProjectBuilderOptions } from '../types';
export type IceJsProjectBuilderOptions = IProjectBuilderOptions;
export default function createIceJsProjectBuilder(options?: IceJsProjectBuilderOptions): IProjectBuilder;
export declare const plugins: {
    containerClass: import("../types").BuilderComponentPluginFactory<unknown>;
    containerInjectContext: import("../types").BuilderComponentPluginFactory<import("../plugins/component/react/containerInjectContext").PluginConfig>;
    containerInjectUtils: import("../types").BuilderComponentPluginFactory<import("../plugins/component/react/containerInjectUtils").PluginConfig>;
    containerInjectDataSourceEngine: import("../types").BuilderComponentPluginFactory<import("../plugins/component/react/containerInjectDataSourceEngine").PluginConfig>;
    containerInjectI18n: import("../types").BuilderComponentPluginFactory<import("../plugins/component/react/containerInjectI18n").PluginConfig>;
    containerInjectConstants: import("../types").BuilderComponentPluginFactory<import("../plugins/component/react/containerInjectConstants").PluginConfig>;
    containerInitState: import("../types").BuilderComponentPluginFactory<import("../plugins/component/react/containerInitState").PluginConfig>;
    containerLifeCycle: import("../types").BuilderComponentPluginFactory<import("../plugins/component/react/containerLifeCycle").PluginConfig>;
    containerMethod: import("../types").BuilderComponentPluginFactory<import("../plugins/component/react/containerMethod").PluginConfig>;
    jsx: import("../types").BuilderComponentPluginFactory<import("../plugins/component/react/jsx").PluginConfig>;
    commonDeps: import("../types").BuilderComponentPluginFactory<unknown>;
    /** @deprecated Please use commonDeps */
    reactCommonDeps: import("../types").BuilderComponentPluginFactory<unknown>;
};
