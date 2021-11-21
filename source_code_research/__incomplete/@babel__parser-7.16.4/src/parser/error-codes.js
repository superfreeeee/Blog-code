// @flow

// ? 异常类型枚举
export const ErrorCodes = Object.freeze({
  SyntaxError: 'BABEL_PARSER_SYNTAX_ERROR',
  SourceTypeModuleError: 'BABEL_PARSER_SOURCETYPE_MODULE_REQUIRED',
});

// ? 异常类型
export type ErrorCode = $Values<typeof ErrorCodes>;
