const obj = { foo: 'value_foo', bar: 'value_bar' }
const proxy = new Proxy(obj, {
  get(target, propKey, receiver) {
    console.log('proxy get')
    return Reflect.get(target, propKey, receiver)
  },
  set(target, propKey, value, receiver) {
    console.log('proxy set')
    const success = Reflect.set(target, propKey, value, receiver)
    return success
  }
})
// console.log(proxy.foo = 'value2')
// console.log(proxy.foo)

console.log(Reflect.get(obj, 'foo', proxy))