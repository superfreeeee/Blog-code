// Returns a wrapper function that returns a wrapped callback
// The wrapper function should do some stuff, and return a
// presumably different callback function.
// This makes sure that own properties are retained, so that
// decorations and such are not lost along the way.
module.exports = wrappy;
function wrappy(fn, cb) {
  // 一次传入两个参数
  if (fn && cb) return wrappy(fn)(cb);

  if (typeof fn !== 'function') {
    throw new TypeError('need wrapper function');
  }

  // 复制所有属性到包装函数里面
  Object.keys(fn).forEach(function (k) {
    wrapper[k] = fn[k];
  });

  return wrapper;

  function wrapper() {
    // 调用 fn，传入 cb 当参数（在 arguments 数组当中）
    var ret = fn.apply(this, arguments);
    var cb = arguments[arguments.length - 1];
    if (typeof ret === 'function' && ret !== cb) {
      Object.keys(cb).forEach(function (k) {
        ret[k] = cb[k];
      });
    }
    return ret;
  }
}
