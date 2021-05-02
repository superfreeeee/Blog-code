import Watcher from './watcher.js'

// 模版渲染器
export default function Compiler (vm) {
  this.vm = vm
  this.$el = vm.$el
  this.fragment = null
  this.init()
}

Compiler.prototype.init = function () {
  // 初始化时使用 data 的值替换 dom 展示的内容
  // 这边没有实现模版解析，而是直接指定 data.name 并替换标签内容（textContent）
  let value = this.vm.$data.name
  document.querySelector('.input').value = value
  document.querySelector('.content').textContent = value

  // 为观察属性（prop）创建相应的观察者，并传入能够更新模版内容的回调函数（callback）
  // 这边只有一个 data.name 属性，并且回调函数直接修改指定标签内容
  // 正常实现是需要遇上方模版解析语法配合，在虚拟 dom 上修改相应标签
  new Watcher(this.vm, this.vm.$prop, value => {
    document.querySelector('.input').value = value
    document.querySelector('.content').textContent = value
  })

  // 为输入框添加监听函数
  document.querySelector('.input').addEventListener('input', e => {
    const targetValue = e.target.value
    if (value !== targetValue) {
      // 输入框的值修改时直接修改绑定变量的值
      this.vm.$data.name = targetValue
      // 并直接更新模版内容
      document.querySelector('.input').value = targetValue
      document.querySelector('.content').textContent = targetValue
    }
  }, false) // 默认 false 为冒泡事件
}
