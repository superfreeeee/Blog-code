import attrs from './attrs'
import klass from './class'
import events from './events'
import domProps from './dom-props'
import style from './style'
import transition from './transition'

/* platformModules 模块 (作为 patch 函数的 modules 模块选项) */
export default [
  attrs,
  klass,
  events,
  domProps,
  style,
  transition
]
