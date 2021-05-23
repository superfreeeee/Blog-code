/* 处理条件编译(ifConditions 列表) */
function processIfConditions (el, parent) {
  // 获取前驱节点
  const prev = findPrevElement(parent.children)
  if (prev && prev.if) {
    // 如果前驱是 v-if 则将其加入 ifConditions 列表
    addIfCondition(prev, {
      exp: el.elseif,
      block: el
    })
  } else if (process.env.NODE_ENV !== 'production') {
    // v-if、v-else-if、v-else corresponding error warning ...
  }
}