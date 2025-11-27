/**
 * 去掉 JS 表达式的 "{...}" 的封装, 如:
 *  {<xxx />} => <xxx />
 */
export declare function unwrapJsExprQuoteInJsx(jsxExpr: string): string;
