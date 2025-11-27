declare const _default: {
    template: import("../../../..").IProjectTemplate;
    plugins: {
        appConfig: import("../../../..").BuilderComponentPluginFactory<import("./plugins/appConfig").AppConfigPluginConfig>;
        buildConfig: import("../../../..").BuilderComponentPluginFactory<import("./plugins/buildConfig").BuildConfigPluginConfig>;
        globalStyle: import("../../../..").BuilderComponentPluginFactory<unknown>;
        packageJSON: import("../../../..").BuilderComponentPluginFactory<import("./plugins/packageJSON").IceJs3PackageJsonPluginConfig>;
        layout: import("../../../..").BuilderComponentPluginFactory<unknown>;
    };
};
export default _default;
