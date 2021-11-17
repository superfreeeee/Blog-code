// called 标志是否调用过
// onceError 为报错信息
function onceStrict(fn) {
  var f = function () {
    if (f.called) throw new Error(f.onceError);
    f.called = true;
    // 啊这里还要 value 干嘛啦，偷懒诶
    return (f.value = fn.apply(this, arguments));
  };
  var name = fn.name || 'Function wrapped with `once`';
  f.onceError = name + " shouldn't be called more than once";
  f.called = false;
  return f;
}
