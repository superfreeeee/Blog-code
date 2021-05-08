// 完整版本的 $mount 方法

// #lineno-9039
Vue.prototype.$mount = function (
  el,
  hydrating
) {
  el = el && inBrowser ? query(el) : undefined;
  return mountComponent(this, el, hydrating)
};

// #lineno-11877
var mount = Vue.prototype.$mount;
Vue.prototype.$mount = function (
  el,
  hydrating
) {
  el = el && query(el);

  // mount on <html> or <body> warning

  var options = this.$options;
  // resolve template/el and convert to render function
  if (!options.render) {
    var template = options.template;
    if (template) {
      /* 按 template 获取模版 */
      if (typeof template === 'string') {
        if (template.charAt(0) === '#') {
          template = idToTemplate(template);
          // template not found warning ...
        }
      } else if (template.nodeType) {
        template = template.innerHTML;
      } else {
        // unknown template option warning ...
        return this
      }
    } else if (el) {
      /* 按 el 获取模版 */
      template = getOuterHTML(el);
    }
    if (template) {
      // mark compile ...

      // 编译方法挂载
      var ref = compileToFunctions(template, {
        outputSourceRange: "development" !== 'production',
        shouldDecodeNewlines: shouldDecodeNewlines,
        shouldDecodeNewlinesForHref: shouldDecodeNewlinesForHref,
        delimiters: options.delimiters,
        comments: options.comments
      }, this);
      var render = ref.render;
      var staticRenderFns = ref.staticRenderFns;
      options.render = render;
      options.staticRenderFns = staticRenderFns;

      // mark compile end ...
    }
  }
  return mount.call(this, el, hydrating)
};
