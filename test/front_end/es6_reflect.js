/**
 * ES6 Reflect usage
 */

const sampleObj = {
  name: 'superfree',
  age: 20,
  grade: 3,
}

const tests = {
  // Reflect.get
  test_reflect_get() {
    const obj = {
      name: 'superfree',
      age: 20,
      grade: 3,
    }
    console.log('obj', obj)
    console.log(`Reflect.get(obj, 'name') = ${Reflect.get(obj, 'name')}`)
    console.log(`Reflect.get(obj, 'age') = ${Reflect.get(obj, 'age')}`)
    console.log(`Reflect.get(obj, 'grade') = ${Reflect.get(obj, 'grade')}`)
    console.log(`Reflect.get(obj, 'gender') = ${Reflect.get(obj, 'gender')}`)
  },
  // Reflect.get (using receiver)
  test_reflect_get_with_receiver() {
    const obj = {
      get foo() {
        return `{ name = ${this.name}, age = ${this.age} }`
      },
    }
    const obj2 = {
      name: 'superfree',
      age: 20,
    }
    console.log('obj', obj)
    console.log('obj2', obj2)
    console.log(
      `Reflect.get(obj, 'foo', obj2) = ${Reflect.get(obj, 'foo', obj2)}`
    )
  },
  // Reflect.set
  test_reflect_set() {
    const obj = {
      name: 'superfree',
      age: 20,
      grade: 3,
    }
    console.log('obj', obj)
    console.log(
      `Reflect.set(obj, 'name', 'superfree2') = ${Reflect.set(
        obj,
        'name',
        'superfree2'
      )}`
    )
    console.log(
      `Reflect.set(obj, 'grade', 4) = ${Reflect.set(obj, 'grade', 4)}`
    )
    console.log(
      `Reflect.set(obj, 'gender', 'male') = ${Reflect.set(
        obj,
        'gender',
        'male'
      )}`
    )
    console.log('obj', obj)
  },
  // Reflect.set
  test_reflect_set_with_defineProperty() {
    const obj = {
      name: 'superfree',
      age: 20,
      grade: 3,
    }
    console.log('obj', obj)
    const proxy = new Proxy(obj, {
      set(target, prop, value, receiver) {
        console.log('set')
        return Reflect.set(target, prop, value, receiver)
      },
      defineProperty(target, prop, attrs) {
        console.log('defineProperty')
        return Reflect.defineProperty(target, prop, attrs)
      },
    })
    console.log('proxy', proxy)
    proxy.name = 'superfree2'
    proxy.gender = 'female'
    console.log('obj', obj)
  },
  // Reflect.has
  test_reflect_has() {
    const obj = { ...sampleObj }
    console.log('obj', obj)
    console.log(`'name' in obj = ${'name' in obj}`)
    console.log(`'age' in obj = ${'age' in obj}`)
    console.log(`'gender' in obj = ${'gender' in obj}`)
    console.log(`Reflect.has(obj, 'name') = ${Reflect.has(obj, 'name')}`)
    console.log(`Reflect.has(obj, 'age') = ${Reflect.has(obj, 'age')}`)
    console.log(`Reflect.has(obj, 'gender') = ${Reflect.has(obj, 'gender')}`)
  },
  // Reflect.defineProperty
  test_reflect_defineProperty() {
    const obj = {}
    const descriptor = {
      enumerable: true,
      value: 'superfree',
    }
    console.log(
      `Reflect.defineProperty(obj, 'name', descriptor) = ${Reflect.defineProperty(
        obj,
        'name',
        descriptor
      )}`
    )
    console.log('obj', obj)
  },
  // Reflect.deleteProperty
  test_reflect_deleteProperty() {
    const o1 = { ...sampleObj }
    const o2 = { ...sampleObj }
    console.log('o1', o1)
    console.log('o2', o2)
    console.log(`delete o1.name = ${delete o1.name}`)
    console.log(
      `Reflect.deleteProperty(o2, 'name') = ${Reflect.deleteProperty(
        o2,
        'name'
      )}`
    )
    // true if prop not exist anymore
    console.log(`delete o1.name = ${delete o1.name}`)
    console.log(
      `Reflect.deleteProperty(o2, 'name') = ${Reflect.deleteProperty(
        o2,
        'name'
      )}`
    )
    console.log('o1', o1)
    console.log('o2', o2)
  },
  // Reflect.construct
  test_reflect_construct() {
    function F() {
      this.name = 'superfree'
    }
    console.log(`new F() = `, new F())
    console.log(`Reflect.construct(F, [])`, Reflect.construct(F, []))
    function G() {
      this.age = 20
    }
    console.log(`Reflect.construct(F, [], G)`, Reflect.construct(F, [], G))
  },
  // Reflect.getPrototypeOf
  test_reflect_getPrototypeOf() {
    function SuperClass() {}
    function SubClass() {}
    SubClass.prototype = Object.create(SuperClass.prototype)

    const sup = new SuperClass()
    const sub = new SubClass()

    console.log(
      `SuperClass.prototype === Object.getPrototypeOf(sup) = ${
        SuperClass.prototype === Object.getPrototypeOf(sup)
      }`
    )
    console.log(
      `SubClass.prototype === Object.getPrototypeOf(sub) = ${
        SubClass.prototype === Object.getPrototypeOf(sub)
      }`
    )
    console.log(
      `SuperClass.prototype === Reflect.getPrototypeOf(sup) = ${
        SuperClass.prototype === Reflect.getPrototypeOf(sup)
      }`
    )
    console.log(
      `SubClass.prototype === Reflect.getPrototypeOf(sub) = ${
        SubClass.prototype === Reflect.getPrototypeOf(sub)
      }`
    )
    console.log(
      `Object.getPrototypeOf(sub).__proto__ === SuperClass.prototype = ${
        Object.getPrototypeOf(sub).__proto__ === SuperClass.prototype
      }`
    )
    console.log(
      `Reflect.getPrototypeOf(sub).__proto__ === SuperClass.prototype = ${
        Reflect.getPrototypeOf(sub).__proto__ === SuperClass.prototype
      }`
    )
  },
  // Reflect.setPrototypeOf
  test_reflect_setPrototypeOf() {
    function SuperClass() {}
    function SubClass() {}
    const sup = new SuperClass()
    const sub = new SubClass()

    console.log(
      `Reflect.setPrototypeOf(sub, SuperClass.prototype) = ${Reflect.setPrototypeOf(
        sub,
        SuperClass.prototype
      )}`
    )
    console.log(
      `Reflect.getPrototypeOf(sup) === Reflect.getPrototypeOf(sub) = ${
        Reflect.getPrototypeOf(sup) === Reflect.getPrototypeOf(sub)
      }`
    )
  },
  // Reflect.apply
  test_reflect_apply() {
    const nums = [1, 5, 2, 4, 3, 0]
    console.log('nums', nums)
    console.log(`Math.min.apply(null, nums) = ${Math.min.apply(null, nums)}`)
    console.log(
      `Math.max.call(null, ...nums) = ${Math.max.call(null, ...nums)}`
    )
    console.log(
      `Reflect.apply(Math.min, null, nums) = ${Reflect.apply(
        Math.min,
        null,
        nums
      )}`
    )
    console.log(
      `Reflect.apply(Math.max, null, nums) = ${Reflect.apply(
        Math.max,
        null,
        nums
      )}`
    )
  },
  test_reflect_() {},
}

for (const key in tests) {
  consoleGroup(`----- ${key} -----`, tests[key])
}

function consoleGroup(name, cb) {
  console.group(name)
  cb()
  console.groupEnd(name)
}
