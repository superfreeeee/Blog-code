import Vue from './vue.js'

// 创建 MVVM 类，并暴露成全局变量 vm 供访问
window.vm = new Vue({
  el: '#app',             // 模版选择器，即替换目标
  data: {                 // 数据项
    name: 'default name'
  }  
})