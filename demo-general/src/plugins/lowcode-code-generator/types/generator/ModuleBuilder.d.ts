import { BuilderComponentPlugin, IContextData, IModuleBuilder, PostProcessor } from '../types';
export declare function createModuleBuilder(options?: {
    plugins: BuilderComponentPlugin[];
    postProcessors: PostProcessor[];
    mainFileName?: string;
    contextData?: IContextData;
}): IModuleBuilder;
