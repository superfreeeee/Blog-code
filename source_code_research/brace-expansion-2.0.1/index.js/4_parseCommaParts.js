/**
 * Basically just str.split(","), but handling cases
 * where we have nested braced sections, which should be
 * treated as individual members, like {a,{b,c},d}
 * @param {string} str
 */
/* 匹配 {a,b,c} */
function parseCommaParts(str) {
  // 1. 空串
  if (!str) return [''];

  const parts = [];
  const m = balanced('{', '}', str);

  // 2. 不存在顶层 {} => 直接按 , 拆分
  if (!m) return str.split(',');

  // 存在嵌套 {}
  // ex: a,{b,c},d
  // => pre = a,
  //    body = b,c
  //    post = ,d
  const { pre, body, post } = m;
  const p = pre.split(',');

  // body 表示嵌套块
  // 3. 递归拆解 post => 将 post 第一块与 body 项(p 的最后一块)合并
  p[p.length - 1] += '{' + body + '}';
  const postParts = parseCommaParts(post); // 展开后的 post 块
  if (post.length) {
    p[p.length - 1] += postParts.shift(); // post 的第一块于 body 块合并
    p.push.apply(p, postParts); // post 块合并到 p 数组当中
  }

  parts.push.apply(parts, p);

  return parts;
}
