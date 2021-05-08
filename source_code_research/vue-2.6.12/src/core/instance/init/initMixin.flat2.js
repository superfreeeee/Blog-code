// 注入
//   Vue.prototype._init

export function initMixin (Vue: Class<Component>) {
  Vue.prototype._init = function (options?: Object) {
    const vm: Component = this
    // a uid  （唯一标识号
    vm._uid = uid++
    // startTag, endTag ...  （实例创建记录
    // a flag to avoid this being observed
    vm._isVue = true  // （Vue 实例打上标志
    // merge options ...  （合并/初始化启动参数
    // _renderProxy ... （渲染代理

    // 暴露 vm 实例本身，透过 _self
    vm._self = vm
    initLifecycle(vm)  // 初始化生命周期标志
    initEvents(vm)     // 初始化事件队列
    initRender(vm)     // 添加组件创建辅助函数
    callHook(vm, 'beforeCreate')  // beforeCreate 生命周期钩子
    initInjections(vm) // 初始化 inject
    initState(vm)      // 初始化状态：props、methods、data、computed、watch
    initProvide(vm)    // 初始化 provide
    callHook(vm, 'created')       // created 生命周期钩子

    // resolve component name （处理组件名称

    // 有 el 则挂载到 vm.$options.el
    // 没有则返回后实例（等待 $mount 方法调用
    if (vm.$options.el) {
      vm.$mount(vm.$options.el)
    }
  }
}