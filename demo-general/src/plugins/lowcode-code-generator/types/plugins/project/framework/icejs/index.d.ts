declare const _default: {
    template: import("../../../..").IProjectTemplate;
    plugins: {
        entry: import("../../../..").BuilderComponentPluginFactory<unknown>;
        entryHtml: import("../../../..").BuilderComponentPluginFactory<unknown>;
        globalStyle: import("../../../..").BuilderComponentPluginFactory<unknown>;
        packageJSON: import("../../../..").BuilderComponentPluginFactory<import("./plugins/packageJSON").IceJsPackageJsonPluginConfig>;
        router: import("../../../..").BuilderComponentPluginFactory<unknown>;
    };
};
export default _default;
