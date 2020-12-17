import observe from './observe.js'
import Compiler from './compiler.js'

// MVVM 主类
export default function Vue (options) {
  // 初始化各属性
  this.$options = options // 传入参数备份
  this.$el = document.querySelector(options.el) // 选到实际 dom 元素
  this.$data = options.data // 数据项备份
  Object.keys(this.$data).forEach(key => {
    this.$prop = key // 目前只有一个绑定属性 name
  })
  this.init() // 初始化
}

Vue.prototype.init = function () {
  // 初始化时递归观察 this.$data 数据项
  observe(this.$data)
  // 创建模版渲染对象，于自身绑定（传入 vm）
  new Compiler(this)
}