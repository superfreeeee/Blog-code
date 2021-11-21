// @flow
/* eslint sort-keys: "error" */
import { getLineInfo, type Position } from '../util/location';
import CommentsParser from './comments';
import { type ErrorCode, ErrorCodes } from './error-codes';

// This function is used to raise exceptions on parse errors. It
// takes an offset integer (into the current `input`) to indicate
// the location of the error, attaches the position to the end
// of the error message, and then raises a `SyntaxError` with that
// message.

type ErrorContext = {
  pos: number,
  loc: Position,
  missingPlugin?: Array<string>,
  code?: string,
  reasonCode?: String,
};
export type ParsingError = SyntaxError & ErrorContext;

/**
 * 异常信息模版
 */
// ? Read
export type ErrorTemplate = {
  code: ErrorCode,
  template: string,
  reasonCode: string,
};

/**
 * 异常模版对象
 *   key => ErrorTemplate
 */
// ? Read
export type ErrorTemplates = {
  [key: string]: ErrorTemplate,
};

type SyntaxPlugin = 'flow' | 'typescript' | 'jsx' | typeof undefined;

/**
 * 保留异常原因 Code
 * 
 * @param {*} reasonCode 
 * @param {*} syntaxPlugin 
 * @returns 
 */
// ? Read
function keepReasonCodeCompat(reasonCode: string, syntaxPlugin: SyntaxPlugin) {
  if (!process.env.BABEL_8_BREAKING) {
    // For consistency in TypeScript and Flow error codes
    if (syntaxPlugin === 'flow' && reasonCode === 'PatternIsOptional') {
      return 'OptionalBindingPattern';
    }
  }
  return reasonCode;
}

/**
 * 创建报错信息模版 ErrorTemplates
 *
 * @param {*} messages
 * @param {*} code
 * @param {*} syntaxPlugin
 * @returns
 */
// ? Read
export function makeErrorTemplates(
  messages: {
    [key: string]: string,
  },
  code: ErrorCode,
  syntaxPlugin?: SyntaxPlugin
): ErrorTemplates {
  const templates: ErrorTemplates = {};
  Object.keys(messages).forEach((reasonCode) => {
    templates[reasonCode] = Object.freeze({
      code,
      reasonCode: keepReasonCodeCompat(reasonCode, syntaxPlugin),
      template: messages[reasonCode],
    });
  });
  return Object.freeze(templates);
}

export { ErrorCodes };
export {
  ErrorMessages as Errors,
  SourceTypeModuleErrorMessages as SourceTypeModuleErrors,
} from './error-message';

// ? Read
// raise 函数签名
export type raiseFunction = (number, ErrorTemplate, ...any) => void;

export default class ParserError extends CommentsParser {
  // Forward-declaration: defined in tokenizer/index.js
  /*::
  +isLookahead: boolean;
  */

  /**
   * 获取异常位置 location
   *
   * @param {*} pos
   * @returns
   */
  // ? Read
  getLocationForPosition(pos: number): Position {
    /**
     * 异常位置获取顺序 pos === ?
     * => return ?Loc
     *   this.state.start
     *   this.state.lastTokStart
     *   this.state.end
     *   this.state.lastTokEnd
     *
     * 返回 xxxLoc
     */
    let loc;
    if (pos === this.state.start) loc = this.state.startLoc;
    else if (pos === this.state.lastTokStart) loc = this.state.lastTokStartLoc;
    else if (pos === this.state.end) loc = this.state.endLoc;
    else if (pos === this.state.lastTokEnd) loc = this.state.lastTokEndLoc;
    else loc = getLineInfo(this.input, pos);

    return loc;
  }

  /**
   * 抛出异常
   *
   * @param {*} pos
   * @param {*} param1
   * @param  {...any} params
   * @returns
   */
  // ? Read
  raise(
    pos: number,
    { code, reasonCode, template }: ErrorTemplate,
    ...params: any
  ): Error | empty {
    // 包装 raiseWithData 方法
    return this.raiseWithData(pos, { code, reasonCode }, template, ...params);
  }

  /**
   * Raise a parsing error on given position pos. If errorRecovery is true,
   * it will first search current errors and overwrite the error thrown on the exact
   * position before with the new error message. If errorRecovery is false, it
   * fallbacks to `raise`.
   *
   * @param {number} pos
   * @param {string} errorTemplate
   * @param {...any} params
   * @returns {(Error | empty)}
   * @memberof ParserError
   */
  // ? Read
  raiseOverwrite(
    pos: number,
    { code, template }: ErrorTemplate,
    ...params: any
  ): Error | empty {
    const loc = this.getLocationForPosition(pos);
    const message =
      template.replace(/%(\d+)/g, (_, i: number) => params[i]) +
      ` (${loc.line}:${loc.column})`;
    if (this.options.errorRecovery) {
      const errors = this.state.errors;
      for (let i = errors.length - 1; i >= 0; i--) {
        const error = errors[i];
        if (error.pos === pos) {
          // 当前位置报错 => 返回对象
          return Object.assign(error, { message });
        } else if (error.pos < pos) {
          // 如果 pos 更早表示没有记录 => 回到默认 _raise
          break;
        }
      }
    }
    return this._raise({ code, loc, pos }, message);
  }

  /**
   * 获取详细信息
   *
   * @param {*} pos
   * @param {*} data
   * @param {*} errorTemplate
   * @param  {...any} params
   * @returns
   */
  // ? Read
  raiseWithData(
    pos: number,
    data?: {
      missingPlugin?: Array<string>,
      code?: string,
    },
    errorTemplate: string,
    ...params: any
  ): Error | empty {
    const loc = this.getLocationForPosition(pos);
    const message =
      errorTemplate.replace(/%(\d+)/g, (_, i: number) => params[i]) +
      ` (${loc.line}:${loc.column})`;
    return this._raise(Object.assign(({ loc, pos }: Object), data), message);
  }

  /**
   * 最终抛错方法
   *   errorRecovery 配置项决定是否保留错误 or 直接抛出异常
   *
   * @param {*} errorContext
   * @param {*} message
   * @returns
   */
  // ? Read
  _raise(errorContext: ErrorContext, message: string): Error | empty {
    // $FlowIgnore
    const err: SyntaxError & ErrorContext = new SyntaxError(message);
    Object.assign(err, errorContext);
    if (this.options.errorRecovery) {
      // 继续向前看
      if (!this.isLookahead) this.state.errors.push(err);
      return err;
    } else {
      // 直接抛出异常
      throw err;
    }
  }
}
