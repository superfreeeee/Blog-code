const nums = [ 1, 2, 3, 4, 5 ]
console.log('----- normal for -----')
for (let i = 0; i < nums.length; i++) {
  console.log(`nums[${i}]: ${nums[i]}`)
}

console.log('----- for i in nums -----')
for (let i in nums) {
  console.log(i)
}

const object = { a: 1, b: 2, c: 3 }

console.log('----- for i in object -----')
for (let i in object) {
  console.log(i)
}

Object.defineProperty(object, 'a', {
  enumerable: false
})
console.log('----- for i in object -----')
for (let i in object) {
  console.log(i)
}

function showDetail (o, name) {
  console.log(`----- show detail: ${name} -----`)
  const propertyNames = Object.getOwnPropertyNames(o)
  console.log(`Object.getOwnPropertyNames(${name})`)
  console.log(propertyNames)
  for (let i = 0; i < propertyNames.length; i++) {
    console.log(`property: ${propertyNames[i]}`)
    console.log(Object.getOwnPropertyDescriptor(o, propertyNames[i]))
  }
}

showDetail(nums, 'nums')
showDetail(object, 'object')

console.log('----- for i in nums -----')
for (let i in nums) {
  console.log(i)
}

console.log('----- fake for i in nums -----')
const numsProps = Object.getOwnPropertyNames(nums)
for (let i = 0; i < numsProps.length; i++) {
  if (Object.getOwnPropertyDescriptor(nums, numsProps[i]).enumerable) {
    console.log(numsProps[i])
  }
}

console.log('----- for i in object -----')
for (let i in object) {
  console.log(i)
}

console.log('----- fake for i in object -----')
const objectProps = Object.getOwnPropertyNames(object)
for (let i = 0; i < objectProps.length; i++) {
  if (Object.getOwnPropertyDescriptor(object, objectProps[i]).enumerable) {
    console.log(objectProps[i])
  }
}

console.log('---- real meaning for array -----')
for (let index in nums) {
  console.log(`nums[${index}]: ${nums[index]}`)
}

console.log('---- real meaning for object -----')
for (let attr in object) {
  console.log(`object.${attr}: ${object[attr]}`)
}
