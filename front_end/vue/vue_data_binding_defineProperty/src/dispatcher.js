export default function Dispatcher () {
  // 订阅者列表，是一个 Watcher 列表
  this.subs = []
}

Dispatcher.target = null

Dispatcher.prototype.notify = function () {
  // 通知更新时提醒所有观察者更新（调用 sub.update()）
  this.subs.forEach(sub => {
    sub.update()
  })
}

Dispatcher.prototype.addSub = function (sub) {
  // 添加订阅
  this.subs.push(sub)
}