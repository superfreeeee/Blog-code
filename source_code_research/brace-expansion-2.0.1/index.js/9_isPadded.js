/**
 * @param {string} el
 */
/* 有没有前导 0 */
function isPadded(el) {
  return /^-?0\d/.test(el);
}
