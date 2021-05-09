export default class Dep {
  static target: ?Watcher;
  id: number;
  subs: Array<Watcher>;

  constructor () {
    /* 初始化 uid & 观察者列表 */
    this.id = uid++
    this.subs = []
  }

  // 添加观察者
  addSub (sub: Watcher) {
    this.subs.push(sub)
  }

  // 移除观察者
  removeSub (sub: Watcher) {
    remove(this.subs, sub)
  }

  // 根据 Dep.target 添加观察者
  depend () {
    if (Dep.target) {
      Dep.target.addDep(this)
    }
  }

  // 通知观察者更新
  notify () {
    const subs = this.subs.slice()
    if (process.env.NODE_ENV !== 'production' && !config.async) {
      // async mode sorting
      subs.sort((a, b) => a.id - b.id)
    }
    for (let i = 0, l = subs.length; i < l; i++) {
      /* 逐一通知更新 */
      subs[i].update()
    }
  }
}