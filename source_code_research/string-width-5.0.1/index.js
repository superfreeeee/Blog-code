import stripAnsi from 'strip-ansi';
import isFullwidthCodePoint from 'is-fullwidth-code-point';
import emojiRegex from 'emoji-regex';

/**
 * 计算字符串宽度
 * @param {*} string
 * @returns
 */
// ? Read
export default function stringWidth(string) {
  if (typeof string !== 'string' || string.length === 0) {
    return 0;
  }

  // 删除逃脱序列
  string = stripAnsi(string);

  if (string.length === 0) {
    return 0;
  }

  // 删除表情符号
  string = string.replace(emojiRegex(), '  ');

  let width = 0;

  for (let index = 0; index < string.length; index++) {
    const codePoint = string.codePointAt(index);

    // 忽略控制字符、合并字符
    // Ignore control characters
    if (codePoint <= 0x1f || (codePoint >= 0x7f && codePoint <= 0x9f)) {
      continue;
    }

    // Ignore combining characters
    if (codePoint >= 0x300 && codePoint <= 0x36f) {
      continue;
    }

    // Surrogates
    if (codePoint > 0xffff) {
      index++; // 双字节跳过一个 char
    }

    // 累计字符串长度
    width += isFullwidthCodePoint(codePoint) ? 2 : 1;
  }

  return width;
}
