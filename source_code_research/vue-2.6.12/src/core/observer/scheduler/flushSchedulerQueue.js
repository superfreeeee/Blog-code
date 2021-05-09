// 刷新更新队列

function flushSchedulerQueue () {
  currentFlushTimestamp = getNow()
  flushing = true
  let watcher, id

  queue.sort((a, b) => a.id - b.id)  // 保证 watcher 执行顺序

  // 三个保证
  // 1. 按父 -> 子的顺序更新
  // 2. user watcher 运行在 render watcher
  // 3. destroy 期间忽略 watcher
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index]
    if (watcher.before) {
      watcher.before()  // 调用 beforeUpdate 钩子
    }
    id = watcher.id
    has[id] = null
    watcher.run()  // 调用 watcher.run 执行实际 watcher 更新

    // infinite update loop warning in development version ...
  }

  // 维护队列副本
  const activatedQueue = activatedChildren.slice()
  const updatedQueue = queue.slice()

  // 更新队列状态
  resetSchedulerState()

  // 调用生命周期钩子
  callActivatedHooks(activatedQueue)  // activated 钩子
  callUpdatedHooks(updatedQueue)  // updated 钩子

  // emit devtools event ...
}

function callUpdatedHooks (queue) {
  let i = queue.length
  while (i--) {
    const watcher = queue[i]
    const vm = watcher.vm
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated')
    }
  }
}

function callActivatedHooks (queue) {
  for (let i = 0; i < queue.length; i++) {
    queue[i]._inactive = true
    activateChildComponent(queue[i], true /* true */)
  }
}