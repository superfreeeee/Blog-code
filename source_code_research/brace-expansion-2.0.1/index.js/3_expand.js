/**
 * @param {string} str
 * @param {boolean} [isTop]
 */
function expand(str, isTop) {
  /** @type {string[]} */
  const expansions = [];

  // 检查是否存在顶层花括号
  const m = balanced('{', '}', str);

  // 1. 不存在顶层花括号 => 直接返回原字符串
  if (!m) return [str];

  // no need to expand pre, since it is guaranteed to be free of brace-sets
  const pre = m.pre;
  const post = m.post.length ? expand(m.post, false) : ['']; // 括号后内容递归展开

  if (/\$$/.test(m.pre)) {
    // 2 ${} 的组合不展开 body
    for (let k = 0; k < post.length; k++) {
      const expansion = pre + '{' + m.body + '}' + post[k];
      expansions.push(expansion);
    }
  } else {
    // 3. 展开 {} 的内容
    const isNumericSequence = /^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(m.body); // x..y or x..y..z
    const isAlphaSequence = /^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(m.body); // a..b or a..b..c
    const isSequence = isNumericSequence || isAlphaSequence; // 以上两种形式
    const isOptions = m.body.indexOf(',') >= 0; // 是否存在 ,
    if (!isSequence && !isOptions) {
      // 不是 seq 也不是 option => 就一个内容

      // {a},b}
      if (m.post.match(/,.*\}/)) {
        // 3.1兼容 {a},b} 的写法（老实说我觉得不该兼容hh）
        // 忽略 当前后括号，回填 escClose 并递归调用
        str = m.pre + '{' + m.body + escClose + m.post;
        return expand(str);
      }

      // 3.2 无需兼容的情况就是返回当前字符串 {} 内容直接保留
      return [str];
    }

    // 以下必为 seq 或 option 其中一个
    // 4. 拆分 .. 或是 ,
    let n;
    if (isSequence) {
      // seq 拆分 {a..b..c}
      n = m.body.split(/\.\./);
    } else {
      // options 拆分 {a,b,c}
      n = parseCommaParts(m.body);
      if (n.length === 1) {
        // x{{a,b}}y ==> x{a}y x{b}y
        // 兼容上面这种的嵌套 => 重新展开 n[0]，然后回填 {}
        n = expand(n[0], false).map(embrace);
        if (n.length === 1) {
          return post.map(function (p) {
            return m.pre + n[0] + p;
          });
        }
      }
    }

    // at this point, n is the parts, and we know it's not a comma set
    // with a single entry.
    // 5. 根据序列参数展开序列
    let N;

    if (isSequence) {
      // 5.1 a..b..c 形式的展开
      const x = numeric(n[0]);
      const y = numeric(n[1]);
      const width = Math.max(n[0].length, n[1].length); // 保留数字宽度
      let incr = n.length == 3 ? Math.abs(numeric(n[2])) : 1; // 是否存在 step 参数
      let test = lte;
      const reverse = y < x; // 倒序
      if (reverse) {
        incr *= -1;
        test = gte;
      }
      const pad = n.some(isPadded); // 需不需要前导 0

      N = [];
      // 从 x -> y，incr 递增步长、test 结束测试
      for (let i = x; test(i, y); i += incr) {
        let c;
        if (isAlphaSequence) {
          // 2.2.3.1 字母序列
          c = String.fromCharCode(i);
          if (c === '\\') c = '';
        } else {
          // 2.2.3.2 数字序列
          c = String(i);
          if (pad) {
            const need = width - c.length;
            // 补 0
            if (need > 0) {
              const z = new Array(need + 1).join('0');
              if (i < 0) c = '-' + z + c.slice(1);
              else c = z + c;
            }
          }
        }
        N.push(c);
      }
    } else {
      // 5.2 a,b,c 形式的展开
      N = [];

      for (let j = 0; j < n.length; j++) {
        N.push.apply(N, expand(n[j], false));
      }
    }

    // 6. N 为 body 展开后的字符串序列
    for (let j = 0; j < N.length; j++) {
      for (let k = 0; k < post.length; k++) {
        const expansion = pre + N[j] + post[k];
        // 顶层 && 非字母序列 && 字符串为空的时候不用填入
        if (!isTop || isSequence || expansion) expansions.push(expansion);
      }
    }
  }

  return expansions;
}
