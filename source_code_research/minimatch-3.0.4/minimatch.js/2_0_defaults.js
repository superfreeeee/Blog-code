/* minimatch.defaults 代理 + 返回自身支持链式 */
Minimatch.defaults = function (def) {
  if (!def || !Object.keys(def).length) return Minimatch;
  return minimatch.defaults(def).Minimatch;
};
