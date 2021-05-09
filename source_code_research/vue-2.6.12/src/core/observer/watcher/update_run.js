export default class Watcher {

  // instance props ...

  /* 通知观察者(模版依赖)更新 */
  update () {
    if (this.lazy) {  // lazy 模式下仅改变脏值
      this.dirty = true
    } else if (this.sync) {  // 同步模式下直接 run
      this.run()
    } else {  // 否则更新队列
      queueWatcher(this)
    }
  }

  /* 具体进行依赖更新 */
  run () {
    if (this.active) {
      // 重新 get 新的值
      const value = this.get()
      if (
        value !== this.value ||
        isObject(value) ||
        this.deep
      ) {
        // 值更新：值改变、数组/对象、深度遍历
        const oldValue = this.value  // set new value
        this.value = value
        if (this.user) {
          try {
            this.cb.call(this.vm, value, oldValue)
          } catch (e) {
            handleError(e, this.vm, `callback for watcher "${this.expression}"`)
          }
        } else {
          this.cb.call(this.vm, value, oldValue)
        }
      }
    }
  }

}
