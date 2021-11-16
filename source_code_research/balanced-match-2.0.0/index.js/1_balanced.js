/**
 * @param {string | RegExp} a
 * @param {string | RegExp} b
 * @param {string} str
 */
function balanced(a, b, str) {
  // 适配 regexp 输入
  if (a instanceof RegExp) a = maybeMatch(a, str);
  if (b instanceof RegExp) b = maybeMatch(b, str);

  // 寻找范围
  const r = range(a, b, str);

  // 计算前后结果
  return (
    r && {
      start: r[0],
      end: r[1],
      pre: str.slice(0, r[0]),
      body: str.slice(r[0] + a.length, r[1]),
      post: str.slice(r[1] + b.length),
    }
  );
}
