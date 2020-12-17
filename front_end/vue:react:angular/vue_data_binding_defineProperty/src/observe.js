import Dispatcher from './dispatcher.js'

// 观察（绑定）数据项
export default function observe (data) {
  // 只对 object 作用
  if (!data || typeof data !== 'object') {
    return
  }
  // 激活 reactive 对象的每个键
  Object.keys(data).forEach(key => {
    reactive(data, key, data[key])
  })
}

// 激活函数
function reactive (data, key, value) {
  // 对每个键创建独有的调配中心 Dispatcher
  const dp = new Dispatcher()
  // 使用 Object.defineProperty 设置成访问器属性（getter/setter）
  Object.defineProperty(data, key, {
    get () {
      // 访问属性时检查当前访问者是否已经订阅该属性
      if (Dispatcher.target && !dp.subs.includes(Dispatcher.target)) {
        dp.addSub(Dispatcher.target)
      }
      return value
    },
    set (newValue) {
      if (value !== newValue) {
        // 实际的值透过闭包绑定到局部变量 value 上
        value = newValue
        // 每次更新就透过 Dispatcher 更新（notify 将通知所有 subs）
        dp.notify()
      }
    }
  })
  // 递归观察
  observe(value)
}
