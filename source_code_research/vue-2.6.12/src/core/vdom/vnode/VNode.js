// 虚拟 DOM 元素节点

export default class VNode {
  tag: string | void;           // 元素标签
  data: VNodeData | void;       // 元素数据
  children: ?Array<VNode>;      // 子节点数组
  text: string | void;          // 节点内文本
  elm: Node | void;             // 对应真实 dom 节点
  ns: string | void;            // 当前节点内命名空间
  context: Component | void;    // 组件上下文(Vue 实例)
  key: string | number | void;  // 节点特征标识符(用于 v-for 判断)

  componentOptions: VNodeComponentOptions | void;  // 组件 options 选项
  componentInstance: Component | void;             // 组件对应的 Vue 实例
  parent: VNode | void;       // 父节点

  // strictly internal
  raw: boolean;          // 是否为纯 HTML 文本
  isStatic: boolean;     // 是否为静态节点(不重复渲染)
  isRootInsert: boolean; // 是否作为根节点
  isComment: boolean;    // 是否为注释
  isCloned: boolean;     // 是否为拷贝节点
  isOnce: boolean;       // 是否为 v-once(只渲染一次，不动态绑定数据)
  asyncFactory: Function | void;  // 异步组件工厂函数
  asyncMeta: Object | void;       // 异步元数据
  isAsyncPlaceholder: boolean;
  ssrContext: Object | void;
  fnContext: Component | void;    // 函数式组件对应的 Vue 实例
  fnOptions: ?ComponentOptions;   // 函数式组件 options 选项
  fnScopeId: ?string;             // 函数式组件作用域 id
  devtoolsMeta: ?Object; // used to store functional render context for devtools

  constructor (
    tag?: string,
    data?: VNodeData,
    children?: ?Array<VNode>,
    text?: string,
    elm?: Node,
    context?: Component,
    componentOptions?: VNodeComponentOptions,
    asyncFactory?: Function
  ) {
    this.tag = tag
    this.data = data
    this.children = children
    this.text = text
    this.elm = elm
    this.ns = undefined
    this.context = context
    this.fnContext = undefined
    this.fnOptions = undefined
    this.fnScopeId = undefined
    this.key = data && data.key
    this.componentOptions = componentOptions
    this.componentInstance = undefined
    this.parent = undefined
    this.raw = false
    this.isStatic = false
    this.isRootInsert = true
    this.isComment = false
    this.isCloned = false
    this.isOnce = false
    this.asyncFactory = asyncFactory
    this.asyncMeta = undefined
    this.isAsyncPlaceholder = false
  }

  // DEPRECATED: alias for componentInstance for backwards compat.
  /* istanbul ignore next */
  get child (): Component | void {
    return this.componentInstance
  }
}