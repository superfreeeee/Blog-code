/**
 * @return {number}
 */
/* str => number */
function numeric(str) {
  return parseInt(str, 10) == str
    ? parseInt(str, 10) // 数字
    : str.charCodeAt(0); // 字母
}
