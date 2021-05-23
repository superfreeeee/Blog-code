/* 处理 v-for 属性 */
export function processFor (el: ASTElement) {
  let exp
  if ((exp = getAndRemoveAttr(el, 'v-for'))) {
    // 解析 v-for 属性表达式
    const res = parseFor(exp)
    if (res) {
      extend(el, res)
    } else if (process.env.NODE_ENV !== 'production') {
      // invalid v-for expression warning ...
    }
  }
}
