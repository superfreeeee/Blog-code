/* 处理 <slot> 标签 */
function processSlotOutlet (el) {
  if (el.tag === 'slot') {
    el.slotName = getBindingAttr(el, 'name')
    // key on <slot> warning ...
  }
}