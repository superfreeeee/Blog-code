import { initMixin } from './init'
import { stateMixin } from './state'
import { renderMixin } from './render'
import { eventsMixin } from './events'
import { lifecycleMixin } from './lifecycle'
import { warn } from '../util/index'

function Vue (options) {
  /* 创建实例环境检查 */
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }

  /* 实例初始化 */
  this._init(options)
}

initMixin(Vue)       // 注入 Vue.prototype._init
stateMixin(Vue)      // 注入 Vue.prototype.{$data, $props, $set, $delete, $watch}
eventsMixin(Vue)     // 注入 Vue.prototype.{$on, $once, $off, $emit}
lifecycleMixin(Vue)  // 注入 Vue.prototype.{_update, $forceUpdate, $destroy}
renderMixin(Vue)     // 注入 Vue.prototype.{$nextTick, _render}

export default Vue
