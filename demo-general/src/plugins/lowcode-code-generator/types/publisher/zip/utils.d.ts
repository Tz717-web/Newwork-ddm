import { ResultDir } from '@alilc/lowcode-types';
import type { ZipBuffer } from './index';
export declare const isNodeProcess: () => boolean;
export declare const writeZipToDisk: (zipFolderPath: string, content: ZipBuffer, zipName: string) => void;
export declare const generateProjectZip: (project: ResultDir) => Promise<ZipBuffer>;
