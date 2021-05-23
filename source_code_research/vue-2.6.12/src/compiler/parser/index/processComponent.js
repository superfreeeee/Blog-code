/* 处理组件类型属性 */
function processComponent (el) {
  let binding
  // 处理 is 属性
  if ((binding = getBindingAttr(el, 'is'))) {
    el.component = binding
  }
  // 处理 inline-template 属性
  if (getAndRemoveAttr(el, 'inline-template') != null) {
    el.inlineTemplate = true
  }
}