/**
 * 低代码引擎的出码模块，负责将编排产出的 Schema 转换成实际可执行的代码。
 * 注意：为了保持 API 的稳定性，这里所有导出的 API 均要显式命名方式导出
 *     （即用 export { xxx } from 'xx' 的方式，不要直接 export * from 'xxx')
 *      而且所有导出的 API 务必在 tests/public 中编写单元测试
 */
import { createProjectBuilder } from './generator/ProjectBuilder';
import { createModuleBuilder } from './generator/ModuleBuilder';
import createIceJsProjectBuilder from './solutions/icejs';
import createIceJs3ProjectBuilder from './solutions/icejs3';
import createRaxAppProjectBuilder from './solutions/rax-app';
import * as globalUtils from './utils';
import * as CONSTANTS from './const';
declare const _default: {
    createProjectBuilder: typeof createProjectBuilder;
    createModuleBuilder: typeof createModuleBuilder;
    solutions: {
        icejs: typeof createIceJsProjectBuilder;
        icejs3: typeof createIceJs3ProjectBuilder;
        rax: typeof createRaxAppProjectBuilder;
    };
    solutionParts: {
        icejs: {
            template: import("./types").IProjectTemplate;
            plugins: {
                entry: import("./types").BuilderComponentPluginFactory<unknown>;
                entryHtml: import("./types").BuilderComponentPluginFactory<unknown>;
                globalStyle: import("./types").BuilderComponentPluginFactory<unknown>;
                packageJSON: import("./types").BuilderComponentPluginFactory<import("./plugins/project/framework/icejs/plugins/packageJSON").IceJsPackageJsonPluginConfig>;
                router: import("./types").BuilderComponentPluginFactory<unknown>;
            };
        };
        icejs3: {
            template: import("./types").IProjectTemplate;
            plugins: {
                appConfig: import("./types").BuilderComponentPluginFactory<import("./plugins/project/framework/icejs3/plugins/appConfig").AppConfigPluginConfig>;
                buildConfig: import("./types").BuilderComponentPluginFactory<import("./plugins/project/framework/icejs3/plugins/buildConfig").BuildConfigPluginConfig>;
                globalStyle: import("./types").BuilderComponentPluginFactory<unknown>;
                packageJSON: import("./types").BuilderComponentPluginFactory<import("./plugins/project/framework/icejs3/plugins/packageJSON").IceJs3PackageJsonPluginConfig>;
                layout: import("./types").BuilderComponentPluginFactory<unknown>;
            };
        };
        rax: {
            template: import("./types").IProjectTemplate;
            plugins: {
                appConfig: import("./types").BuilderComponentPluginFactory<import("./plugins/project/framework/rax/types/RaxFrameworkOptions").RaxFrameworkOptions>;
                buildConfig: import("./types").BuilderComponentPluginFactory<import("./plugins/project/framework/rax/types/RaxFrameworkOptions").RaxFrameworkOptions>;
                entry: import("./types").BuilderComponentPluginFactory<import("./plugins/project/framework/rax/types/RaxFrameworkOptions").RaxFrameworkOptions>;
                entryDocument: import("./types").BuilderComponentPluginFactory<import("./plugins/project/framework/rax/types/RaxFrameworkOptions").RaxFrameworkOptions>;
                globalStyle: import("./types").BuilderComponentPluginFactory<import("./plugins/project/framework/rax/plugins/globalStyle").GlobalStylePluginConfig>;
                packageJSON: import("./types").BuilderComponentPluginFactory<import("./plugins/project/framework/rax/types/RaxFrameworkOptions").RaxFrameworkOptions>;
            };
        };
    };
    publishers: {
        disk: import("./types").PublisherFactory<import("./publisher/disk").IDiskFactoryParams, import("./publisher/disk").IDiskPublisher>;
        zip: import("./types").PublisherFactory<import("./publisher/zip").ZipFactoryParams, import("./publisher/zip").ZipPublisher>;
    };
    plugins: {
        common: {
            /**
             * 处理 ES Module
             * @deprecated please use esModule
             */
            esmodule: import("./types").BuilderComponentPluginFactory<import("./plugins/common/esmodule").PluginConfig>;
            esModule: import("./types").BuilderComponentPluginFactory<import("./plugins/common/esmodule").PluginConfig>;
            requireUtils: import("./types").BuilderComponentPluginFactory<unknown>;
            styleImport: import("./types").BuilderComponentPluginFactory<unknown>;
        };
        style: {
            css: import("./types").BuilderComponentPluginFactory<import("./plugins/component/style/css").PluginConfig>;
        };
        project: {
            constants: import("./types").BuilderComponentPluginFactory<unknown>;
            i18n: import("./types").BuilderComponentPluginFactory<unknown>;
            utils: import("./types").BuilderComponentPluginFactory<string>;
        };
        icejs: {
            containerClass: import("./types").BuilderComponentPluginFactory<unknown>;
            containerInjectContext: import("./types").BuilderComponentPluginFactory<import("./plugins/component/react/containerInjectContext").PluginConfig>;
            containerInjectUtils: import("./types").BuilderComponentPluginFactory<import("./plugins/component/react/containerInjectUtils").PluginConfig>;
            containerInjectDataSourceEngine: import("./types").BuilderComponentPluginFactory<import("./plugins/component/react/containerInjectDataSourceEngine").PluginConfig>;
            containerInjectI18n: import("./types").BuilderComponentPluginFactory<import("./plugins/component/react/containerInjectI18n").PluginConfig>;
            containerInjectConstants: import("./types").BuilderComponentPluginFactory<import("./plugins/component/react/containerInjectConstants").PluginConfig>;
            containerInitState: import("./types").BuilderComponentPluginFactory<import("./plugins/component/react/containerInitState").PluginConfig>;
            containerLifeCycle: import("./types").BuilderComponentPluginFactory<import("./plugins/component/react/containerLifeCycle").PluginConfig>;
            containerMethod: import("./types").BuilderComponentPluginFactory<import("./plugins/component/react/containerMethod").PluginConfig>;
            jsx: import("./types").BuilderComponentPluginFactory<import("./plugins/component/react/jsx").PluginConfig>;
            commonDeps: import("./types").BuilderComponentPluginFactory<unknown>;
            reactCommonDeps: import("./types").BuilderComponentPluginFactory<unknown>;
        };
        icejs3: {
            containerClass: import("./types").BuilderComponentPluginFactory<unknown>;
            containerInitState: import("./types").BuilderComponentPluginFactory<import("./plugins/component/react/containerInitState").PluginConfig>;
            containerInjectContext: import("./types").BuilderComponentPluginFactory<import("./plugins/component/react/containerInjectContext").PluginConfig>;
            containerInjectUtils: import("./types").BuilderComponentPluginFactory<import("./plugins/component/react/containerInjectUtils").PluginConfig>;
            containerInjectI18n: import("./types").BuilderComponentPluginFactory<import("./plugins/component/react/containerInjectI18n").PluginConfig>;
            containerInjectDataSourceEngine: import("./types").BuilderComponentPluginFactory<import("./plugins/component/react/containerInjectDataSourceEngine").PluginConfig>;
            containerLifeCycle: import("./types").BuilderComponentPluginFactory<import("./plugins/component/react/containerLifeCycle").PluginConfig>;
            containerMethod: import("./types").BuilderComponentPluginFactory<import("./plugins/component/react/containerMethod").PluginConfig>;
            jsx: import("./types").BuilderComponentPluginFactory<import("./plugins/component/react/jsx").PluginConfig>;
            commonDeps: import("./types").BuilderComponentPluginFactory<unknown>;
        };
        rax: {
            containerClass: import("./types").BuilderComponentPluginFactory<unknown>;
            containerLifeCycles: import("./types").BuilderComponentPluginFactory<import("./plugins/component/rax/containerLifeCycle").PluginConfig>;
            containerMethods: import("./types").BuilderComponentPluginFactory<import("./plugins/component/rax/containerMethods").PluginConfig>;
            containerInitState: import("./types").BuilderComponentPluginFactory<import("./plugins/component/rax/containerInitState").PluginConfig>;
            containerInjectContext: import("./types").BuilderComponentPluginFactory<import("./plugins/component/rax/containerInjectContext").PluginConfig>;
            containerInjectDataSourceEngine: import("./types").BuilderComponentPluginFactory<import("./plugins/component/rax/containerInjectDataSourceEngine").PluginConfig>;
            containerInjectUtils: import("./types").BuilderComponentPluginFactory<import("./plugins/component/rax/containerInjectUtils").PluginConfig>;
            jsx: import("./types").BuilderComponentPluginFactory<import("./plugins/component/rax/jsx").PluginConfig>;
            commonDeps: import("./types").BuilderComponentPluginFactory<unknown>;
            raxApp: {
                template: import("./types").IProjectTemplate;
                plugins: {
                    appConfig: import("./types").BuilderComponentPluginFactory<import("./plugins/project/framework/rax/types/RaxFrameworkOptions").RaxFrameworkOptions>;
                    buildConfig: import("./types").BuilderComponentPluginFactory<import("./plugins/project/framework/rax/types/RaxFrameworkOptions").RaxFrameworkOptions>;
                    entry: import("./types").BuilderComponentPluginFactory<import("./plugins/project/framework/rax/types/RaxFrameworkOptions").RaxFrameworkOptions>;
                    entryDocument: import("./types").BuilderComponentPluginFactory<import("./plugins/project/framework/rax/types/RaxFrameworkOptions").RaxFrameworkOptions>;
                    globalStyle: import("./types").BuilderComponentPluginFactory<import("./plugins/project/framework/rax/plugins/globalStyle").GlobalStylePluginConfig>;
                    packageJSON: import("./types").BuilderComponentPluginFactory<import("./plugins/project/framework/rax/types/RaxFrameworkOptions").RaxFrameworkOptions>;
                };
            };
        };
        /**
         * @deprecated please use icejs
         */
        react: {
            containerClass: import("./types").BuilderComponentPluginFactory<unknown>;
            containerInjectContext: import("./types").BuilderComponentPluginFactory<import("./plugins/component/react/containerInjectContext").PluginConfig>;
            containerInjectUtils: import("./types").BuilderComponentPluginFactory<import("./plugins/component/react/containerInjectUtils").PluginConfig>;
            containerInjectDataSourceEngine: import("./types").BuilderComponentPluginFactory<import("./plugins/component/react/containerInjectDataSourceEngine").PluginConfig>;
            containerInjectI18n: import("./types").BuilderComponentPluginFactory<import("./plugins/component/react/containerInjectI18n").PluginConfig>;
            containerInjectConstants: import("./types").BuilderComponentPluginFactory<import("./plugins/component/react/containerInjectConstants").PluginConfig>;
            containerInitState: import("./types").BuilderComponentPluginFactory<import("./plugins/component/react/containerInitState").PluginConfig>;
            containerLifeCycle: import("./types").BuilderComponentPluginFactory<import("./plugins/component/react/containerLifeCycle").PluginConfig>;
            containerMethod: import("./types").BuilderComponentPluginFactory<import("./plugins/component/react/containerMethod").PluginConfig>;
            jsx: import("./types").BuilderComponentPluginFactory<import("./plugins/component/react/jsx").PluginConfig>;
            commonDeps: import("./types").BuilderComponentPluginFactory<unknown>;
            reactCommonDeps: import("./types").BuilderComponentPluginFactory<unknown>;
        };
    };
    postprocessor: {
        prettier: import("./types").PostProcessorFactory<import("./postprocessor/prettier").ProcessorConfig>;
    };
    utils: typeof globalUtils;
    chunkNames: {
        COMMON_CHUNK_NAME: {
            ExternalDepsImport: string;
            InternalDepsImport: string;
            ImportAliasDefine: string;
            FileVarDefine: string;
            FileUtilDefine: string;
            FileMainContent: string;
            FileExport: string;
            StyleDepsImport: string;
            StyleCssContent: string;
            HtmlContent: string;
            CustomContent: string;
        };
        CLASS_DEFINE_CHUNK_NAME: {
            Start: string;
            ConstructorStart: string;
            ConstructorContent: string;
            ConstructorEnd: string;
            StaticVar: string;
            StaticMethod: string;
            InsVar: string;
            InsVarMethod: string;
            InsMethod: string;
            InsPrivateMethod: string;
            End: string;
        };
        REACT_CHUNK_NAME: {
            ClassRenderStart: string;
            ClassRenderPre: string;
            ClassRenderEnd: string;
            ClassRenderJSX: string;
            ClassDidMountStart: string;
            ClassDidMountEnd: string;
            ClassDidMountContent: string;
        };
    };
    defaultLinkAfter: {
        COMMON_DEFAULT_LINK_AFTER: {
            [x: string]: string[];
        };
    };
    constants: typeof CONSTANTS;
};
export default _default;
export * from './types';
export * from './const';
export * from './analyzer/componentAnalyzer';
export * from './parser/SchemaParser';
export * from './generator/ChunkBuilder';
export * from './generator/CodeBuilder';
export * from './generator/ModuleBuilder';
export * from './generator/ProjectBuilder';
