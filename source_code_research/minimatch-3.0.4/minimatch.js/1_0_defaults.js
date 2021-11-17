/* 默认配置 defaults */
minimatch.defaults = function (def) {
  if (!def || !Object.keys(def).length) return minimatch;

  var orig = minimatch;

  var m = function minimatch(p, pattern, options) {
    return orig.minimatch(p, pattern, ext(def, options));
  };

  m.Minimatch = function Minimatch(pattern, options) {
    return new orig.Minimatch(pattern, ext(def, options));
  };

  return m;
};
