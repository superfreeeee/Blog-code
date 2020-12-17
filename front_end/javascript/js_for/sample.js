// 待遍历变量
const nums = [ 1, 2, 3, 4, 5 ]
const object = { a: 1, b: 2, c: 3 }
// 为 object 添加 Symbol.iterator 供 let...of 使用
object[Symbol.iterator] = function* () {
  for (let prop in this) {
    yield { [prop]: this[prop] }
  }
}

/* 一般 for 循环 */
// 按下标访问数组
console.log('----- for: array -----')
for (let i = 0; i < nums.length; i++) {
  console.log(nums[i])
}

// 按自有属性访问对象键值对
console.log('----- for: object -----')
const objectProps = Object.getOwnPropertyNames(object)
for (let i = 0; i < objectProps.length; i++) {
  console.log(object[objectProps[i]])
}

/* for...in */
// for...in 遍历数组
console.log('----- for...in: array -----')
for (let index in nums) {
  console.log(`nums[${index}] = ${nums[index]}`)
}

// for...in 遍历对象
console.log('----- for...in: object -----')
for (let prop in object) {
  console.log(`object.${prop} = ${object[prop]}`)
}

/* for...of */
// for...of 遍历数组
console.log('----- for...of: array -----')
for (let num of nums) {
  console.log(num)
}

// for...of 遍历对象（透过 Symbol.iterator 方法）
console.log('----- for...of: object(through object[Symbol.iterator]) -----')
for (let item of object) {
  console.log(item)
}