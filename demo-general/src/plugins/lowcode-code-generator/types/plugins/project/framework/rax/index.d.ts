declare const _default: {
    template: import("../../../..").IProjectTemplate;
    plugins: {
        appConfig: import("../../../..").BuilderComponentPluginFactory<import("./types/RaxFrameworkOptions").RaxFrameworkOptions>;
        buildConfig: import("../../../..").BuilderComponentPluginFactory<import("./types/RaxFrameworkOptions").RaxFrameworkOptions>;
        entry: import("../../../..").BuilderComponentPluginFactory<import("./types/RaxFrameworkOptions").RaxFrameworkOptions>;
        entryDocument: import("../../../..").BuilderComponentPluginFactory<import("./types/RaxFrameworkOptions").RaxFrameworkOptions>;
        globalStyle: import("../../../..").BuilderComponentPluginFactory<import("./plugins/globalStyle").GlobalStylePluginConfig>;
        packageJSON: import("../../../..").BuilderComponentPluginFactory<import("./types/RaxFrameworkOptions").RaxFrameworkOptions>;
    };
};
export default _default;
