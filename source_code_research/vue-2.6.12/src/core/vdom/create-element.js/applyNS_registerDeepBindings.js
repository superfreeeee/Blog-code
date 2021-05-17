// 申请命名空间

function applyNS (vnode, ns, force) {
  vnode.ns = ns
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined
    force = true
  }
  if (isDef(vnode.children)) {
    for (let i = 0, l = vnode.children.length; i < l; i++) {
      const child = vnode.children[i]
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force)
      }
    }
  }
}

// 数据绑定

function registerDeepBindings (data) {
  // 绑定 style 属性的 v-bind
  if (isObject(data.style)) {
    traverse(data.style)
  }
  // 绑定 class 属性的 v-bind
  if (isObject(data.class)) {
    traverse(data.class)
  }
}
