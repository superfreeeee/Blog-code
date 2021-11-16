/**
 * @param {RegExp} reg
 * @param {string} str
 */
function maybeMatch(reg, str) {
  // match[0] 为第一个匹配的字符串
  const m = str.match(reg);
  return m ? m[0] : null;
}
