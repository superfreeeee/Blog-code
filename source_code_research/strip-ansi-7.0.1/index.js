import ansiRegex from 'ansi-regex';

/**
 * 从字符串中移除逃脱序列
 * @param {*} string
 * @returns
 */
export default function stripAnsi(string) {
  if (typeof string !== 'string') {
    throw new TypeError(`Expected a \`string\`, got \`${typeof string}\``);
  }

  // ========== 参数校验 ==========

  return string.replace(ansiRegex(), '');
}
