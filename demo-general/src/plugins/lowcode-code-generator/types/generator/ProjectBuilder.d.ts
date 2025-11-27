import { ResultDir, IPublicTypeProjectSchema } from '@alilc/lowcode-types';
import { IProjectBuilder, IProjectPlugins, IProjectTemplate, ISchemaParser, PostProcessor } from '../types';
import { ProjectPreProcessor, ProjectPostProcessor, IContextData } from '../types/core';
export interface ProjectBuilderInitOptions {
    /** 项目模板 */
    template: IProjectTemplate;
    /** 项目插件 */
    plugins: IProjectPlugins;
    /** 模块后置处理器 */
    postProcessors: PostProcessor[];
    /** Schema 解析器 */
    schemaParser?: ISchemaParser;
    /** 项目级别的前置处理器 */
    projectPreProcessors?: ProjectPreProcessor[];
    /** 项目级别的后置处理器 */
    projectPostProcessors?: ProjectPostProcessor[];
    /** 是否处于严格模式 */
    inStrictMode?: boolean;
    /** 一些额外的上下文数据 */
    extraContextData?: Record<string, unknown>;
    /**
     * Hook which is used to customize original options, we can reorder/add/remove plugins/processors
     * of the existing solution.
     */
    customizeBuilderOptions?(originalOptions: ProjectBuilderInitOptions): ProjectBuilderInitOptions;
}
export declare class ProjectBuilder implements IProjectBuilder {
    /** 项目模板 */
    private template;
    /** 项目插件 */
    private plugins;
    /** 模块后置处理器 */
    private postProcessors;
    /** Schema 解析器 */
    private schemaParser;
    /** 项目级别的前置处理器 */
    private projectPreProcessors;
    /** 项目级别的后置处理器 */
    private projectPostProcessors;
    /** 是否处于严格模式 */
    readonly inStrictMode: boolean;
    /** 一些额外的上下文数据 */
    readonly extraContextData: IContextData;
    constructor(builderOptions: ProjectBuilderInitOptions);
    generateProject(originalSchema: IPublicTypeProjectSchema | string): Promise<ResultDir>;
    private createModuleBuilders;
    private generateExtraSlots;
}
export declare function createProjectBuilder(initOptions: ProjectBuilderInitOptions): IProjectBuilder;
