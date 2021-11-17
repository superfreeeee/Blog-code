Minimatch.prototype.braceExpand = braceExpand;

/* 花括号扩展(brace-expansion 特性) */
function braceExpand(pattern, options) {
  // 作者你实在是有点懒啊，参数好好的传一下可以吗
  if (!options) {
    if (this instanceof Minimatch) {
      options = this.options;
    } else {
      options = {};
    }
  }

  pattern = typeof pattern === 'undefined' ? this.pattern : pattern;

  if (typeof pattern === 'undefined') {
    throw new TypeError('undefined pattern');
  }

  // ========== 从 Minimatch 实例上抽取参数 ==========

  // options.nobrace: 压制 brace-expansion 特性
  if (options.nobrace || !pattern.match(/\{.*\}/)) {
    // shortcut. no need to expand.
    return [pattern];
  }

  return expand(pattern);
}
