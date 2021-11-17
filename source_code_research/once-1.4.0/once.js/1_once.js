// called 标志是否调用过
// value 记录结果值
function once(fn) {
  var f = function () {
    if (f.called) return f.value;
    f.called = true;
    return (f.value = fn.apply(this, arguments));
  };
  f.called = false;
  return f;
}
