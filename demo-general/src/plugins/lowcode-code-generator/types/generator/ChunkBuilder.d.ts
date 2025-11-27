import { BuilderComponentPlugin, IChunkBuilder, ICodeChunk, ICodeStruct } from '../types';
export declare const groupChunks: (chunks: ICodeChunk[]) => ICodeChunk[][];
/**
 * 代码片段构建器
 *
 * @export
 * @class ChunkBuilder
 * @template T
 */
export declare class ChunkBuilder implements IChunkBuilder {
    private plugins;
    constructor(plugins?: BuilderComponentPlugin[]);
    run(ir: unknown, initialStructure?: ICodeStruct): Promise<{
        chunks: ICodeChunk[][];
    }>;
    getPlugins(): BuilderComponentPlugin[];
    addPlugin(plugin: BuilderComponentPlugin): void;
}
export default ChunkBuilder;
