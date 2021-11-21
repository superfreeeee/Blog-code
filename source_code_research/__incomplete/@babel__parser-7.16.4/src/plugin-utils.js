// @flow

import type Parser from './parser';

export type Plugin = string | [string, Object];

export type PluginList = $ReadOnlyArray<Plugin>;

export type MixinPlugin = (superClass: Class<Parser>) => Class<Parser>;

/**
 * 检查是否存在指定名称插件
 *
 * @param {*} plugins
 * @param {*} name
 * @returns
 */
// ? Read
export function hasPlugin(plugins: PluginList, name: string): boolean {
  return plugins.some((plugin) => {
    if (Array.isArray(plugin)) {
      // [name, options]
      return plugin[0] === name;
    } else {
      // name
      return plugin === name;
    }
  });
}

/**
 * 获取插件配置项
 *
 * @param {*} plugins
 * @param {*} name
 * @param {*} option
 * @returns
 */
// ? Read
export function getPluginOption(
  plugins: PluginList,
  name: string,
  option: string
) {
  // 查找插件
  const plugin = plugins.find((plugin) => {
    if (Array.isArray(plugin)) {
      return plugin[0] === name;
    } else {
      return plugin === name;
    }
  });

  // [name, options] 形式下返回 options[option] 指定配置项
  if (plugin && Array.isArray(plugin)) {
    return plugin[1][option];
  }

  // 否则返回 null 为无配置
  return null;
}

const PIPELINE_PROPOSALS = ['minimal', 'fsharp', 'hack', 'smart'];
const TOPIC_TOKENS = ['^', '%', '#'];
const RECORD_AND_TUPLE_SYNTAX_TYPES = ['hash', 'bar'];

/**
 * 验证传入插件
 *
 * @param {*} plugins
 */
// ? Read
export function validatePlugins(plugins: PluginList) {
  // 1. decorators 插件
  if (hasPlugin(plugins, 'decorators')) {
    if (hasPlugin(plugins, 'decorators-legacy')) {
      // decorators 与 decorators-legacy 不能同时使用
      throw new Error(
        'Cannot use the decorators and decorators-legacy plugin together'
      );
    }

    const decoratorsBeforeExport = getPluginOption(
      plugins,
      'decorators',
      'decoratorsBeforeExport'
    );
    if (decoratorsBeforeExport == null) {
      throw new Error(
        "The 'decorators' plugin requires a 'decoratorsBeforeExport' option," +
          ' whose value must be a boolean. If you are migrating from' +
          ' Babylon/Babel 6 or want to use the old decorators proposal, you' +
          " should use the 'decorators-legacy' plugin instead of 'decorators'."
      );
    } else if (typeof decoratorsBeforeExport !== 'boolean') {
      throw new Error("'decoratorsBeforeExport' must be a boolean.");
    }
  }

  // 2. flow & typescript 插件
  if (hasPlugin(plugins, 'flow') && hasPlugin(plugins, 'typescript')) {
    // 不能同时使用两种类型检查工具
    throw new Error('Cannot combine flow and typescript plugins.');
  }

  // 3. placeholders & v8intrinsic 插件 ？？？作用？？？
  if (hasPlugin(plugins, 'placeholders') && hasPlugin(plugins, 'v8intrinsic')) {
    throw new Error('Cannot combine placeholders and v8intrinsic plugins.');
  }

  // 4. pipelineOperator 插件 ？？？
  if (hasPlugin(plugins, 'pipelineOperator')) {
    // proposal 配置项
    const proposal = getPluginOption(plugins, 'pipelineOperator', 'proposal');

    // 存在不合法配置项
    if (!PIPELINE_PROPOSALS.includes(proposal)) {
      const proposalList = PIPELINE_PROPOSALS.map((p) => `"${p}"`).join(', ');
      throw new Error(
        `"pipelineOperator" requires "proposal" option whose value must be one of: ${proposalList}.`
      );
    }

    const tupleSyntaxIsHash =
      hasPlugin(plugins, 'recordAndTuple') &&
      getPluginOption(plugins, 'recordAndTuple', 'syntaxType') === 'hash';

    if (proposal === 'hack') {
      if (hasPlugin(plugins, 'placeholders')) {
        throw new Error(
          'Cannot combine placeholders plugin and Hack-style pipes.'
        );
      }

      if (hasPlugin(plugins, 'v8intrinsic')) {
        throw new Error(
          'Cannot combine v8intrinsic plugin and Hack-style pipes.'
        );
      }

      const topicToken = getPluginOption(
        plugins,
        'pipelineOperator',
        'topicToken'
      );

      if (!TOPIC_TOKENS.includes(topicToken)) {
        const tokenList = TOPIC_TOKENS.map((t) => `"${t}"`).join(', ');

        throw new Error(
          `"pipelineOperator" in "proposal": "hack" mode also requires a "topicToken" option whose value must be one of: ${tokenList}.`
        );
      }

      if (topicToken === '#' && tupleSyntaxIsHash) {
        throw new Error(
          'Plugin conflict between `["pipelineOperator", { proposal: "hack", topicToken: "#" }]` and `["recordAndtuple", { syntaxType: "hash"}]`.'
        );
      }
    } else if (proposal === 'smart' && tupleSyntaxIsHash) {
      throw new Error(
        'Plugin conflict between `["pipelineOperator", { proposal: "smart" }]` and `["recordAndtuple", { syntaxType: "hash"}]`.'
      );
    }
  }

  // 5. moduleAttributes 插件 ？？？
  if (hasPlugin(plugins, 'moduleAttributes')) {
    if (process.env.BABEL_8_BREAKING) {
      throw new Error(
        '`moduleAttributes` has been removed in Babel 8, please use `importAssertions` parser plugin, or `@babel/plugin-syntax-import-assertions`.'
      );
    } else {
      if (hasPlugin(plugins, 'importAssertions')) {
        throw new Error(
          'Cannot combine importAssertions and moduleAttributes plugins.'
        );
      }
      const moduleAttributesVerionPluginOption = getPluginOption(
        plugins,
        'moduleAttributes',
        'version'
      );
      if (moduleAttributesVerionPluginOption !== 'may-2020') {
        throw new Error(
          "The 'moduleAttributes' plugin requires a 'version' option," +
            ' representing the last proposal update. Currently, the' +
            " only supported value is 'may-2020'."
        );
      }
    }
  }

  // 6. recordAndTuple 插件 ？？？
  if (
    hasPlugin(plugins, 'recordAndTuple') &&
    !RECORD_AND_TUPLE_SYNTAX_TYPES.includes(
      getPluginOption(plugins, 'recordAndTuple', 'syntaxType')
    )
  ) {
    throw new Error(
      "'recordAndTuple' requires 'syntaxType' option whose value should be one of: " +
        RECORD_AND_TUPLE_SYNTAX_TYPES.map((p) => `'${p}'`).join(', ')
    );
  }

  // 7. asyncDoExpressions & doExpressions 插件 ？？？
  if (
    hasPlugin(plugins, 'asyncDoExpressions') &&
    !hasPlugin(plugins, 'doExpressions')
  ) {
    const error = new Error(
      "'asyncDoExpressions' requires 'doExpressions', please add 'doExpressions' to parser plugins."
    );
    // $FlowIgnore
    error.missingPlugins = 'doExpressions'; // so @babel/core can provide better error message
    throw error;
  }
}

// These plugins are defined using a mixin which extends the parser class.

import estree from './plugins/estree';
import flow from './plugins/flow';
import jsx from './plugins/jsx';
import typescript from './plugins/typescript';
import placeholders from './plugins/placeholders';
import v8intrinsic from './plugins/v8intrinsic';

// NOTE: order is important. estree must come first; placeholders must come last.
export const mixinPlugins: { [name: string]: MixinPlugin } = {
  estree,
  jsx,
  flow,
  typescript,
  v8intrinsic,
  placeholders,
};

export const mixinPluginNames: $ReadOnlyArray<string> =
  Object.keys(mixinPlugins);
