// @flow

// The token context is used to track whether the apostrophe "`"
// starts or ends a string template

/**
 * Token 上下文
 */
// ? Read
export class TokContext {
  constructor(token: string, preserveSpace?: boolean) {
    this.token = token;
    this.preserveSpace = !!preserveSpace;
  }

  token: string;
  preserveSpace: boolean; // 模版字符串 ` 为 true
}

/**
 * TokContext 实例
 */
// ? Read
export const types: {
  [key: string]: TokContext,
} = {
  brace: new TokContext('{'), // 作用域 {
  template: new TokContext('`', true), // 模版字符串 `
};
