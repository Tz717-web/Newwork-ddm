import { IPublicTypeNodeSchema } from '@alilc/lowcode-types';
import { IScope, CodePiece, NodeGenerator, NodeGeneratorConfig, NodePlugin } from '../types';
export declare function isPureString(v: string): boolean;
/**
 * JSX 生成逻辑插件。在 React 代码模式下生成 loop 相关的逻辑代码
 * @type NodePlugin Extended
 *
 * @export
 * @param {IPublicTypeNodeSchema} nodeItem 当前 UI 节点
 * @returns {CodePiece[]} 实现功能的相关代码片段
 */
export declare function generateReactLoopCtrl(nodeItem: IPublicTypeNodeSchema, scope: IScope, config?: NodeGeneratorConfig, next?: NodePlugin): CodePiece[];
/**
 * JSX 生成逻辑插件。在 React 代码模式下生成 condition 相关的逻辑代码
 * @type NodePlugin
 *
 * @export
 * @param {IPublicTypeNodeSchema} nodeItem 当前 UI 节点
 * @returns {CodePiece[]} 实现功能的相关代码片段
 */
export declare function generateConditionReactCtrl(nodeItem: IPublicTypeNodeSchema, scope: IScope, config?: NodeGeneratorConfig, next?: NodePlugin): CodePiece[];
/**
 * JSX 生成逻辑插件。在 React 代码模式下，如果 Node 生成结果是一个表达式，则对其进行 { Expression } 包装
 * @type NodePlugin
 *
 * @export
 * @param {IPublicTypeNodeSchema} nodeItem 当前 UI 节点
 * @returns {CodePiece[]} 实现功能的相关代码片段
 */
export declare function generateReactExprInJS(nodeItem: IPublicTypeNodeSchema, scope: IScope, config?: NodeGeneratorConfig, next?: NodePlugin): CodePiece[];
export declare function createNodeGenerator(cfg?: NodeGeneratorConfig): NodeGenerator<string>;
export declare function createReactNodeGenerator(cfg?: NodeGeneratorConfig): NodeGenerator<string>;
