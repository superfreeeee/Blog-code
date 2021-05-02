import { reactive } from './reactive.js'
import { effect } from './effect.js'

// 创建响应式状态
const state = reactive({ count: 1 })

// 创建副作用，当 state.count 修改时会重新调用
effect(() => {
  console.log(`state.count = ${state.count}`)
})

// 修改 state.count，触发上面的 effect 回调
state.count = 2

// 删除 state.count，一样也会触发回调
delete state.count
