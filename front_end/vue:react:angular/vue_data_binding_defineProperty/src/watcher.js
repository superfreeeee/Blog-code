import Dispatcher from './dispatcher.js'

// 观察者（订阅者）
export default function Watcher (vm, prop, callback) {
  this.vm = vm
  this.$prop = prop
  this.value = this.get()
  this.callback = callback
}

Watcher.prototype.get = function () {
  Dispatcher.target = this
  const value = this.vm.$data[this.$prop]
  return value
}

Watcher.prototype.update = function () {
  const value = this.vm.$data[this.$prop]
  const oldValue = this.value
  // 观察者更新时检查当前保留数据（this.value 将与实际 dom 展示数据同步）
  // 与 新数据（data.name 为实际绑定数据）
  if (oldValue !== value) {
    // 不相同时则更新 this.value 并通知 Compiler 更新 dom（callback 为 Compiler 传入的更新 dom 函数）
    this.value = value
    this.callback(this.value)
  }
}