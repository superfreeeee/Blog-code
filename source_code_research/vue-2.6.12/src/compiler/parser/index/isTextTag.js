/* 检查是否为纯文本节点 */
function isTextTag (el): boolean {
  return el.tag === 'script' || el.tag === 'style'
}