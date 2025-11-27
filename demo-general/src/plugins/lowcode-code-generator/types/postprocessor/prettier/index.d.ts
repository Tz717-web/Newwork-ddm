import prettier from 'prettier';
import { PostProcessorFactory } from '../../types';
export interface ProcessorConfig {
    customFileTypeParser: Record<string, string>;
    plugins?: prettier.Plugin[];
}
declare const factory: PostProcessorFactory<ProcessorConfig>;
export default factory;
