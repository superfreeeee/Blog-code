// 响应式对象代理

 export class Observer {
  value: any;
  dep: Dep;
  vmCount: number; // number of vms that have this object as root $data

  constructor (value: any) {
    this.value = value
    this.dep = new Dep()
    this.vmCount = 0
    /* 将 Observer 对象绑定到 __ob__ 属性上 */
    def(value, '__ob__', this)

    if (Array.isArray(value)) {
      /* 数组则先代理数组基本方法 */
      if (hasProto) {
        protoAugment(value, arrayMethods)
      } else {
        copyAugment(value, arrayMethods, arrayKeys)
      }
      /* 后遍历观察数组内元素 */
      this.observeArray(value)
    } else {
      /* 深度遍历对象属性并转为响应式数据 */
      this.walk(value)
    }
  }

  // 遍历 "对象属性" 并转变为响应式数据
  walk (obj: Object) {
    const keys = Object.keys(obj)
    for (let i = 0; i < keys.length; i++) {
      defineReactive(obj, keys[i])
    }
  }

  // 遍历 "数组元素" 并观察
  observeArray (items: Array<any>) {
    for (let i = 0, l = items.length; i < l; i++) {
      observe(items[i])
    }
  }
}

// helpers

// 重置原型对象(重新赋值 __proto__ 属性)
function protoAugment (target, src: Object) {
  /* eslint-disable no-proto */
  target.__proto__ = src
  /* eslint-enable no-proto */
}

// 覆盖数组原方法
function copyAugment (target: Object, src: Object, keys: Array<string>) {
  for (let i = 0, l = keys.length; i < l; i++) {
    const key = keys[i]
    def(target, key, src[key])
  }
}