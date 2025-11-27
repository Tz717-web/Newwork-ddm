/**
 * 执行出码 CLI 命令
 * @param args 入参数组
 * @param options 选项
 * @returns {Promise<number>} 错误码
 */
export declare function run(args: string[], options: {
    solution: string;
    input?: string;
    output?: string;
    quiet?: boolean;
    verbose?: boolean;
    solutionOptions?: string;
}): Promise<number>;
