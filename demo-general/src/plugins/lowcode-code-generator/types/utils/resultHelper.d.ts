import { ResultFile, ResultDir } from '@alilc/lowcode-types';
import { FlattenFile } from '../types/file';
export declare function createResultFile(name: string, ext?: string, content?: string): ResultFile;
export declare function createResultDir(name: string): ResultDir;
export declare function addDirectory(target: ResultDir, dir: ResultDir): void;
export declare function addFile(target: ResultDir, file: ResultFile): void;
export declare function flattenResult(dir: ResultDir, cwd?: string): FlattenFile[];
export type GlobOptions = {
    /** 是否查找 ".xxx" 文件, 默认: 否 */
    dot?: boolean;
};
/**
 * 查找文件
 * @param result 出码结果
 * @param fileGlobExpr 文件名匹配表达式
 * @param resultDirPath 出码结果的路径（默认是 '.'）
 * @returns 匹配的第一个文件或 null （找不到）
 */
export declare function findFile(result: ResultDir, fileGlobExpr: string, options?: GlobOptions, resultDirPath?: string): ResultFile | null;
/**
 * 使用 glob 语法查找多个文件
 * @param result 出码结果
 * @param fileGlobExpr 文件名匹配表达式
 * @param resultDirPath 出码结果的路径（默认是 '.'）
 * @returns 找到的文件列表的迭代器 [ [文件路径, 文件信息], ... ]
 */
export declare function globFiles(result: ResultDir, fileGlobExpr: string, options?: GlobOptions, resultDirPath?: string): IterableIterator<[string, ResultFile]>;
/**
 * 遍历所有的文件
 */
export declare function scanFiles(result: ResultDir, resultDirPath?: string, maxDepth?: number): IterableIterator<[string, ResultFile]>;
export declare function getFileNameWithExt(file: ResultFile): string;
export declare function scanDirs(result: ResultDir, resultDirPath?: string, maxDepth?: number): IterableIterator<[string, ResultDir]>;
export declare function globDirs(result: ResultDir, dirGlobExpr: string, options?: GlobOptions, resultDirPath?: string): IterableIterator<[string, ResultDir]>;
export declare function findDir(result: ResultDir, dirGlobExpr: string, options?: GlobOptions, resultDirPath?: string): ResultDir | null;
/**
 * 从结果中移除一些文件
 * @param result 出码结果目录
 * @param filePathGlobExpr 要移除的文件路径（glob 表达式）
 * @param globOptions glob 参数
 * @returns 移除了多少文件
 */
export declare function removeFilesFromResult(result: ResultDir, filePathGlobExpr: string, globOptions?: GlobOptions): number;
/**
 * 从结果中移除一些目录
 * @param result 出码结果目录
 * @param dirPathGlobExpr 要移除的目录路径（glob 表达式）
 * @param globOptions glob 参数
 * @returns 移除了多少文件
 */
export declare function removeDirsFromResult(result: ResultDir, dirPathGlobExpr: string, globOptions?: GlobOptions): number;
