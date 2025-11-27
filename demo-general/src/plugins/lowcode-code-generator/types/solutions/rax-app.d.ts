import { IProjectBuilder, IProjectBuilderOptions } from '../types';
import { RaxFrameworkOptions } from '../plugins/project/framework/rax/types/RaxFrameworkOptions';
export interface RaxProjectBuilderOptions extends IProjectBuilderOptions, RaxFrameworkOptions {
}
export default function createRaxProjectBuilder(options?: RaxProjectBuilderOptions): IProjectBuilder;
export declare const plugins: {
    containerClass: import("../types").BuilderComponentPluginFactory<unknown>;
    containerLifeCycles: import("../types").BuilderComponentPluginFactory<import("../plugins/component/rax/containerLifeCycle").PluginConfig>;
    containerMethods: import("../types").BuilderComponentPluginFactory<import("../plugins/component/rax/containerMethods").PluginConfig>;
    containerInitState: import("../types").BuilderComponentPluginFactory<import("../plugins/component/rax/containerInitState").PluginConfig>;
    containerInjectContext: import("../types").BuilderComponentPluginFactory<import("../plugins/component/rax/containerInjectContext").PluginConfig>;
    containerInjectDataSourceEngine: import("../types").BuilderComponentPluginFactory<import("../plugins/component/rax/containerInjectDataSourceEngine").PluginConfig>;
    containerInjectUtils: import("../types").BuilderComponentPluginFactory<import("../plugins/component/rax/containerInjectUtils").PluginConfig>;
    jsx: import("../types").BuilderComponentPluginFactory<import("../plugins/component/rax/jsx").PluginConfig>;
    commonDeps: import("../types").BuilderComponentPluginFactory<unknown>;
    raxApp: {
        template: import("../types").IProjectTemplate;
        plugins: {
            appConfig: import("../types").BuilderComponentPluginFactory<RaxFrameworkOptions>;
            buildConfig: import("../types").BuilderComponentPluginFactory<RaxFrameworkOptions>;
            entry: import("../types").BuilderComponentPluginFactory<RaxFrameworkOptions>;
            entryDocument: import("../types").BuilderComponentPluginFactory<RaxFrameworkOptions>;
            globalStyle: import("../types").BuilderComponentPluginFactory<import("../plugins/project/framework/rax/plugins/globalStyle").GlobalStylePluginConfig>;
            packageJSON: import("../types").BuilderComponentPluginFactory<RaxFrameworkOptions>;
        };
    };
};
