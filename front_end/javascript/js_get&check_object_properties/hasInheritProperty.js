function hasInheritProperty (obj, prop) {
  return prop in obj && !obj.hasOwnProperty(prop)
}

const sa = Symbol('a')
const object = { a: 1, [sa]: 2 }
console.log(hasInheritProperty(object, 'a'))
console.log(hasInheritProperty(object, sa))
console.log(hasInheritProperty(object, 'toString'))