// @flow

import type { Options } from '../options';
import type { File /*::, JSXOpeningElement */ } from '../types';
import type { PluginList } from '../plugin-utils';
import { getOptions } from '../options';
import StatementParser from './statement';
import ScopeHandler from '../util/scope';

export type PluginsMap = Map<string, { [string]: any }>;

/**
 * 语法解析器
 */
export default class Parser extends StatementParser {
  // Forward-declaration so typescript plugin can override jsx plugin
  /*::
  +jsxParseOpeningElementAfterName: (
    node: JSXOpeningElement,
  ) => JSXOpeningElement;
  */

  /**
   * 构造函数
   *   初始化：options、plugins、filename
   *   初始化调用：initializeScopes
   *
   * @param {*} options
   * @param {*} input
   */
  // ? Read
  constructor(options: ?Options, input: string) {
    options = getOptions(options);
    super(options, input);

    this.options = options;
    this.initializeScopes();
    this.plugins = pluginsMap(this.options.plugins);
    this.filename = options.sourceFilename;
  }

  // This can be overwritten, for example, by the TypeScript plugin.
  // ? Read
  getScopeHandler(): Class<ScopeHandler<*>> {
    return ScopeHandler;
  }

  parse(): File {
    this.enterInitialScopes(); // 开启全局作用域
    const file = this.startNode(); // File 节点
    const program = this.startNode(); // Program 节点
    this.nextToken();
    file.errors = null;
    this.parseTopLevel(file, program);
    file.errors = this.state.errors;
    return file;
  }
}

/**
 * 插件选项转 map 格式
 *   name => options
 *
 * @param {*} plugins
 * @returns
 */
// ? Read
function pluginsMap(plugins: PluginList): PluginsMap {
  const pluginMap: PluginsMap = new Map();
  for (const plugin of plugins) {
    const [name, options] = Array.isArray(plugin) ? plugin : [plugin, {}];
    if (!pluginMap.has(name)) pluginMap.set(name, options || {});
  }
  return pluginMap;
}
