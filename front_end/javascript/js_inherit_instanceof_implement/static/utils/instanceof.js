function _instanceof(obj, target) {
  const targetProto = target.prototype
  let proto = obj.__proto__
  while (proto) {
    if (proto === targetProto) return true
    proto = proto.__proto__
  }
  return false
}

class A {}

class B extends A {}

class C extends B {}

class D extends A {}

group('test a', () => {
  const a = new A()
  console.log(`a instanceof A: ${a instanceof A},\t_instanceof(a, A): ${_instanceof(a, A)}`)
  console.log(`a instanceof B: ${a instanceof B},\t_instanceof(a, B): ${_instanceof(a, B)}`)
  console.log(`a instanceof C: ${a instanceof C},\t_instanceof(a, C): ${_instanceof(a, C)}`)
  console.log(`a instanceof D: ${a instanceof D},\t_instanceof(a, D): ${_instanceof(a, D)}`)
})

group('test b', () => {
  const b = new B()
  console.log(`b instanceof A: ${b instanceof A},\t_instanceof(b, A): ${_instanceof(b, A)}`)
  console.log(`b instanceof B: ${b instanceof B},\t_instanceof(b, B): ${_instanceof(b, B)}`)
  console.log(`b instanceof C: ${b instanceof C},\t_instanceof(b, C): ${_instanceof(b, C)}`)
  console.log(`b instanceof D: ${b instanceof D},\t_instanceof(b, D): ${_instanceof(b, D)}`)
})

group('test c', () => {
  const c = new C()
  console.log(`c instanceof A: ${c instanceof A},\t_instanceof(c, A): ${_instanceof(c, A)}`)
  console.log(`c instanceof B: ${c instanceof B},\t_instanceof(c, B): ${_instanceof(c, B)}`)
  console.log(`c instanceof C: ${c instanceof C},\t_instanceof(c, C): ${_instanceof(c, C)}`)
  console.log(`c instanceof D: ${c instanceof D},\t_instanceof(c, D): ${_instanceof(c, D)}`)
})

group('test d', () => {
  const d = new D()
  console.log(`d instanceof A: ${d instanceof A},\t_instanceof(d, A): ${_instanceof(d, A)}`)
  console.log(`d instanceof B: ${d instanceof B},\t_instanceof(d, B): ${_instanceof(d, B)}`)
  console.log(`d instanceof C: ${d instanceof C},\t_instanceof(d, C): ${_instanceof(d, C)}`)
  console.log(`d instanceof D: ${d instanceof D},\t_instanceof(d, D): ${_instanceof(d, D)}`)
})
