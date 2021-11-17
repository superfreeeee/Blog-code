/* 与 Minimatch.makeRe 等价（创建新的 Minimatch 状态隔离） */
minimatch.makeRe = function (pattern, options) {
  return new Minimatch(pattern, options || {}).makeRe();
};
