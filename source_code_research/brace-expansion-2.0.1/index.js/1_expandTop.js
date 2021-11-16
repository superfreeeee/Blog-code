/**
 * @param {string} str
 */
/* 主入口 */
function expandTop(str) {
  if (!str) return [];

  // I don't know why Bash 4.3 does this, but it does.
  // Anything starting with {} will have the first two bytes preserved
  // but *only* at the top level, so {},a}b will not expand to anything,
  // but a{},b}c will be expanded to [a}c,abc].
  // One could argue that this is a bug in Bash, but since the goal of
  // this module is to match Bash's rules, we escape a leading {}

  // 忽略了 {} 作为起始字符
  if (str.slice(0, 2) === '{}') {
    str = '\\{\\}' + str.slice(2);
  }

  return expand(escapeBraces(str), true).map(unescapeBraces);
}
