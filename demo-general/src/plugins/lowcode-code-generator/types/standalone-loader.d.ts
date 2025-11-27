import type { IPublicTypeProjectSchema, ResultDir } from '@alilc/lowcode-types';
import type { FlattenFile } from './types/file';
export declare const DEFAULT_WORKER_JS: string;
export declare const DEFAULT_TIMEOUT_IN_MS: number;
export declare function init({ workerJsUrl, }?: {
    workerJsUrl?: string;
}): Promise<void>;
export type Result = ResultDir | FlattenFile[];
export declare function generateCode(options: {
    solution: 'icejs' | 'rax';
    schema: IPublicTypeProjectSchema;
    flattenResult?: boolean;
    workerJsUrl?: string;
    timeoutInMs?: number;
}): Promise<Result>;
