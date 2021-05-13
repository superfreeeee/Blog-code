// 初始化状态：props、methods、data、computed、watch

export function initState (vm: Component) {
  vm._watchers = []
  const opts = vm.$options

  /* 初始化 props */
  if (opts.props) initProps(vm, opts.props)
  /* 初始化 methods */
  if (opts.methods) initMethods(vm, opts.methods)
  /* 初始化 data */
  if (opts.data) {
    initData(vm)
  } else {
    observe(vm._data = {}, true /* asRootData */)
  }
  /* 初始化 computed */
  if (opts.computed) initComputed(vm, opts.computed)
  /* 初始化 watch */
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch)
  }
}

function initProps (vm: Component, propsOptions: Object) {
  /* props 遍历对象 */
  const propsData = vm.$options.propsData || {}
  const props = vm._props = {}
  const keys = vm.$options._propKeys = []
  const isRoot = !vm.$parent
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false)
  }
  for (const key in propsOptions) {
    keys.push(key)
    const value = validateProp(key, propsOptions, propsData, vm)
    if (process.env.NODE_ENV !== 'production') {
      const hyphenatedKey = hyphenate(key)
      // reserved props name warning ...

      /*** 将 props 的每个属性设置为响应式 ***/
      defineReactive(props, key, value, /* setting props warning ... */)
    } else {
      /*** 将 props 的每个属性设置为响应式 ***/
      defineReactive(props, key, value)
    }
    // proxy instantiation props ...
  }
  toggleObserving(true)
}

function initMethods (vm: Component, methods: Object) {
  const props = vm.$options.props
  for (const key in methods) {
    if (process.env.NODE_ENV !== 'production') {
      // not function methods warning ...
      // already defined warning ...
      // conflict with instance method warning ...
    }
    /* 将方法绑定到实例对象上 */
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm)
  }
}

function initData (vm: Component) {
  let data = vm.$options.data
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {}
  // non-object data warning ...
  // proxy data on instance
  const keys = Object.keys(data)
  const props = vm.$options.props
  const methods = vm.$options.methods
  let i = keys.length
  while (i--) {
    const key = keys[i]
    // conflict with methods warning ...
    if (props && hasOwn(props, key)) {
      // conflict with props warning ...
    } else if (!isReserved(key)) {
      /* 对每个属性建立 vm._data.key 的代理 */
      proxy(vm, `_data`, key)
    }
  }
  /* 转变为响应式数据 */
  observe(data, true /* asRootData */)
}

function initComputed (vm: Component, computed: Object) {
  const watchers = vm._computedWatchers = Object.create(null)
  const isSSR = isServerRendering()

  for (const key in computed) {
    const userDef = computed[key]
    const getter = typeof userDef === 'function' ? userDef : userDef.get
    // missing getter warning ...

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      )
    }

    /* 创建响应式 getter */
    if (!(key in vm)) {
      defineComputed(vm, key, userDef)
    } else if (process.env.NODE_ENV !== 'production') {
      // conflict with data warning ...
      // conflict with prop warning ...
    }
  }
}

function initWatch (vm: Component, watch: Object) {
  for (const key in watch) {
    const handler = watch[key]
    /* 为每一个观察属性创建一个观察者 */
    if (Array.isArray(handler)) {
      for (let i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i])
      }
    } else {
      createWatcher(vm, key, handler)
    }
  }
}
