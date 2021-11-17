module.exports = function wrappy(fn, cb) {
  if (fn && cb) return wrappy(fn)(cb);

  Object.assign(wrapper, fn);

  return wrapper;

  function wrapper(cb, ...args) {
    const ret = fn.apply(this, [cb, ...args]);
    if (typeof cb === 'function' && ret !== cb) {
      Object.assign(ret, cb);
    }
    return ret;
  }
};
