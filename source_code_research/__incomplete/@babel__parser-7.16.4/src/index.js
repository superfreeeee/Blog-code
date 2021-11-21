// @flow

import { type Options } from './options';
import {
  hasPlugin,
  validatePlugins,
  mixinPluginNames,
  mixinPlugins,
  type PluginList,
} from './plugin-utils';
import Parser from './parser';

import { getExportedToken, tt as internalTokenTypes } from './tokenizer/types';
import './tokenizer/context';

import type { Expression, File } from './types';

/**
 * @babel/parser 主入口 & 默认导出函数
 *
 * @param {*} input
 * @param {*} options
 * @returns
 */
// ? Read
export function parse(input: string, options?: Options): File {
  if (options?.sourceType === 'unambiguous') {
    /**
     * 1. 未知源码类型 => 进行推导 & 猜测
     */
    options = {
      ...options,
    };
    try {
      options.sourceType = 'module';
      const parser = getParser(options, input);
      const ast = parser.parse();

      if (parser.sawUnambiguousESM) {
        return ast;
      }

      if (parser.ambiguousScriptDifferentAst) {
        // Top level await introduces code which can be both a valid script and
        // a valid module, but which produces different ASTs:
        //    await
        //    0
        // can be parsed either as an AwaitExpression, or as two ExpressionStatements.
        try {
          options.sourceType = 'script';
          return getParser(options, input).parse();
        } catch {}
      } else {
        // This is both a valid module and a valid script, but
        // we parse it as a script by default
        ast.program.sourceType = 'script';
      }

      return ast;
    } catch (moduleError) {
      try {
        options.sourceType = 'script';
        return getParser(options, input).parse();
      } catch {}

      throw moduleError;
    }
  } else {
    /**
     * 已知类型 => 简单匹配
     */
    return getParser(options, input).parse();
  }
}

export function parseExpression(input: string, options?: Options): Expression {
  const parser = getParser(options, input);
  if (parser.options.strictMode) {
    parser.state.strict = true;
  }
  return parser.getExpression();
}

function generateExportedTokenTypes(internalTokenTypes) {
  const tokenTypes = {};
  for (const typeName of Object.keys(internalTokenTypes)) {
    tokenTypes[typeName] = getExportedToken(internalTokenTypes[typeName]);
  }
  return tokenTypes;
}

export const tokTypes = generateExportedTokenTypes(internalTokenTypes);

/**
 * 获取解析器
 *
 * @param {*} options
 * @param {*} input
 * @returns
 */
// ? Read
function getParser(options: ?Options, input: string): Parser {
  let cls = Parser;
  if (options?.plugins) {
    validatePlugins(options.plugins);
    cls = getParserClass(options.plugins);
  }

  return new cls(options, input);
}

/** Get a Parser class with plugins applied. */
/**
 * 获取解析器类型 + 插件注入
 *
 * @param {*} pluginsFromOptions
 * @returns
 */

// ? Read
const parserClassCache: { [key: string]: Class<Parser> } = {};
function getParserClass(pluginsFromOptions: PluginList): Class<Parser> {
  // 有限内置插件集合
  const pluginList = mixinPluginNames.filter((name) =>
    hasPlugin(pluginsFromOptions, name)
  );

  // 使用 p1/p2/p3/... 作为缓存 key
  const key = pluginList.join('/');
  let cls = parserClassCache[key];

  // 包装插件
  if (!cls) {
    cls = Parser;
    for (const plugin of pluginList) {
      cls = mixinPlugins[plugin](cls);
    }
    parserClassCache[key] = cls;
  }
  return cls;
}
