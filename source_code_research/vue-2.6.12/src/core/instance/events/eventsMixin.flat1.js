// 注入
//   Vue.prototype.$on
//   Vue.prototype.$once
//   Vue.prototype.$off
//   Vue.prototype.$emit

export function eventsMixin (Vue: Class<Component>) {
  const hookRE = /^hook:/
  Vue.prototype.$on = function (event: string | Array<string>, fn: Function): Component {/* ... */}

  Vue.prototype.$once = function (event: string, fn: Function): Component {/* ... */}

  Vue.prototype.$off = function (event?: string | Array<string>, fn?: Function): Component {/* ... */}

  Vue.prototype.$emit = function (event: string): Component {/* ... */}
}
