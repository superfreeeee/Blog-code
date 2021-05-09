// 注入
//   Vue.prototype.$data  -> dataDef  -> this._data
//   Vue.prototype.$props -> propsDef -> this._props
//   Vue.prototype.$set
//   Vue.prototype.$delete
//   Vue.prototype.$watch

export function stateMixin (Vue: Class<Component>) {
  const dataDef = {}
  dataDef.get = function () { return this._data }
  const propsDef = {}
  propsDef.get = function () { return this._props }
  if (process.env.NODE_ENV !== 'production') {
    dataDef.set = function () {
      // direct set root $data warning ...
    }
    propsDef.set = function () {
      // set $props warning
    }
  }

  Object.defineProperty(Vue.prototype, '$data', dataDef)
  Object.defineProperty(Vue.prototype, '$props', propsDef)

  Vue.prototype.$set = set
  Vue.prototype.$delete = del

  Vue.prototype.$watch = function (
    expOrFn: string | Function,
    cb: any,
    options?: Object
  ): Function {/* ... */}
}