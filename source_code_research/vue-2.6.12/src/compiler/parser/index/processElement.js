/* 处理元素节点 */
export function processElement (
  element: ASTElement,
  options: CompilerOptions
) {
  processKey(element)  // key 属性

  // plain 标志
  element.plain = (
    !element.key &&
    !element.scopedSlots &&
    !element.attrsList.length
  )

  processRef(element)  // ref 属性
  processSlotContent(element)  // 处理带 v-slot 属性标签
  processSlotOutlet(element)  // 处理 <slot> 标签
  processComponent(element)  // 处理组件类型属性

  // 调用预处理 transforms
  for (let i = 0; i < transforms.length; i++) {
    element = transforms[i](element, options) || element
  }
  
  processAttrs(element)
  return element
}