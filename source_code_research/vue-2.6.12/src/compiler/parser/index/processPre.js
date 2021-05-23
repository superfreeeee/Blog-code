/* 检查 v-pre 属性并添加标记 */
function processPre (el) {
  if (getAndRemoveAttr(el, 'v-pre') != null) {
    el.pre = true
  }
}
