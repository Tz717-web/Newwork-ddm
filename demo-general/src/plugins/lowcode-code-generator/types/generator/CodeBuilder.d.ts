import { ICodeBuilder, ICodeChunk } from '../types';
export declare class CodeBuilder implements ICodeBuilder {
    private chunkDefinitions;
    private generators;
    constructor(chunkDefinitions?: ICodeChunk[]);
    /**
     * Links all chunks together based on their requirements. Returns an array
     * of ordered chunk names which need to be compiled and glued together.
     */
    link(chunkDefinitions?: ICodeChunk[]): string;
    generateByType(type: string, content: unknown): string;
    private cleanupInvalidChunks;
}
export default CodeBuilder;
