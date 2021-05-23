/* 处理 v-if、v-else-if、v-else 属性 */
function processIf (el) {
  // 提取 v-if 表达式
  const exp = getAndRemoveAttr(el, 'v-if')
  if (exp) {
    el.if = exp
    // 将表达式加入节点的条件编译列表(ifConditions)
    addIfCondition(el, {
      exp: exp,
      block: el
    })
  } else {
    // 提取 v-else 表达式
    if (getAndRemoveAttr(el, 'v-else') != null) {
      el.else = true
    }
    // 提取 v-else-if 表达式
    const elseif = getAndRemoveAttr(el, 'v-else-if')
    if (elseif) {
      el.elseif = elseif
    }
  }
}
