
export function _createElement (
  context: Component,
  tag?: string | Class<Component> | Function | Object,
  data?: VNodeData,
  children?: any,
  normalizationType?: number
): VNode | Array<VNode> {
  // observed data object as vnode data warning ...

  // data.is 替换 tag
  if (isDef(data) && isDef(data.is)) {
    tag = data.is
  }
  if (!tag) {
    // is 指向不合法元素
    return createEmptyVNode()
  }

  // non-primitive key warning ...

  // 还没搞懂。。。
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {}
    data.scopedSlots = { default: children[0] }
    children.length = 0
  }
  // 子节点数组标准化
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children)
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children)
  }
  let vnode, ns
  if (typeof tag === 'string') {
    let Ctor
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag)
    if (config.isReservedTag(tag)) {
      /* 平台内置元素节点 */
      
      // .native for built-in elements warning ...

      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      )
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      /* 组件节点 */
      vnode = createComponent(Ctor, data, context, children, tag)
    } else {
      /* 未知节点类型，运行时从命名空间(ns)查找 */
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      )
    }
  } else {
    /* 组件节点(直接使用组件 options & constructor 构建) */
    vnode = createComponent(tag, data, context, children)
  }
  if (Array.isArray(vnode)) {
    /* 返回节点数组 */
    return vnode
  } else if (isDef(vnode)) {
    /* 返回单根节点 */
    if (isDef(ns)) applyNS(vnode, ns)  // 申请命名空间
    if (isDef(data)) registerDeepBindings(data)  // 数据绑定
    return vnode
  } else {
    /* 返回空节点 */
    return createEmptyVNode()
  }
}
