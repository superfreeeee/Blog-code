/* 处理 ref 属性 */
function processRef (el) {
  const ref = getBindingAttr(el, 'ref')
  if (ref) {
    el.ref = ref
    el.refInFor = checkInFor(el)  // 当前元素是否作为 v-for 列表渲染元素
  }
}