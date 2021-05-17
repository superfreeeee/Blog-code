/* 建立 key: index 的映射 */

function createKeyToOldIdx (children, beginIdx, endIdx) {
  let i, key
  const map = {}
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key
    if (isDef(key)) map[key] = i
  }
  // map 后续可用于快速查找相同 key 的节点进行比较
  return map
}