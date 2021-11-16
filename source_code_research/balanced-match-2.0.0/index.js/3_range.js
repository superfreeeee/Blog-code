/**
 * @param {string} a
 * @param {string} b
 * @param {string} str
 */
function range(a, b, str) {
  let begs, beg, left, right, result;
  let ai = str.indexOf(a);
  let bi = str.indexOf(b, ai + 1);
  let i = ai;

  // 至少存在一对结果
  if (ai >= 0 && bi > 0) {
    // 是否相等
    if (a === b) {
      return [ai, bi];
    }
    begs = [];
    left = str.length;

    while (i >= 0 && !result) {
      // 搜集所有匹配 a 的下标
      if (i === ai) {
        begs.push(i);
        ai = str.indexOf(a, i + 1);
      } else if (begs.length === 1) {
        // 只剩下一个 begs 时输出结果
        result = [begs.pop(), bi];
      } else {
        beg = begs.pop();
        if (beg < left) {
          // 每弹出一个 a，记录最后一对结果下标
          left = beg;
          right = bi;
        }

        bi = str.indexOf(b, i + 1);
      }

      i = ai < bi && ai >= 0 ? ai : bi;
    }

    // 对于 begs 没用完的情况（a 出现次数 > b）
    if (begs.length) {
      result = [left, right];
    }
  }

  return result;
}
