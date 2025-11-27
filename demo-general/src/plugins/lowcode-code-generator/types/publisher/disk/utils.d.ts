/// <reference types="node" />
import * as systemFs from 'fs';
import { ResultDir } from '@alilc/lowcode-types';
export interface IFileSystem {
    existsSync: typeof systemFs.existsSync;
    mkdir: typeof systemFs.mkdir;
    writeFile: typeof systemFs.writeFile;
}
export declare const writeFolder: (folder: ResultDir, currentPath: string, createProjectFolder?: boolean, fs?: IFileSystem) => Promise<void>;
