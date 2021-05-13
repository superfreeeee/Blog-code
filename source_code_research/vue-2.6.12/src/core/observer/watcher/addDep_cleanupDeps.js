// 观察者对象

export default class Watcher {

  // instance props ...

  // 添加依赖
  addDep (dep: Dep) {
    const id = dep.id
    if (!this.newDepIds.has(id)) {
      this.newDepIds.add(id)
      this.newDeps.push(dep)
      // 队列中不存在表示尚未注册到 dep
      if (!this.depIds.has(id)) {
        dep.addSub(this)
      }
    }
  }

  // 刷新依赖队列
  cleanupDeps () {
    let i = this.deps.length
    while (i--) {
      const dep = this.deps[i]
      // 清理下一轮未 dep
      if (!this.newDepIds.has(dep.id)) {
        dep.removeSub(this)
      }
    }
    // 以 newDepIds 替换 depIds
    let tmp = this.depIds
    this.depIds = this.newDepIds
    this.newDepIds = tmp
    this.newDepIds.clear()
    // 以 newDeps 替换 deps
    tmp = this.deps
    this.deps = this.newDeps
    this.newDeps = tmp
    this.newDeps.length = 0
  }
}