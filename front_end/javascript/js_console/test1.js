console.log(console)

console.log('----- log -----')
console.log('string') // string
console.log(123) // number
console.log(true) // boolean
console.log([ 1, 2, 3, 4, 5 ]) // array
console.log({ a: 1, b: 2, c: 3 }) // object
console.log(null) // null
console.log(undefined) // undefined

console.log('----- warn -----')
console.warn('warning')

console.log('----- error -----')
console.error('error')

console.clear()

console.log('----- time & timeEnd -----')
console.time('timer')
console.log('do something')
console.timeEnd('timer')

console.log('----- table -----')
console.table([ 1, 2, 3, 4, 5 ])
console.table({ a: 1, b: 2, c: 3 })

console.log('----- count -----')
let i = 0;
console.count(i)
i++;
console.count(i)
console.count(i)
console.count(i)
i++;
i++;
console.count(i)
console.count(i)
console.count(i)

console.log('----- group & groupEnd -----')
console.group('group1')
console.group('group2')
console.log('logging in group2')
console.warn('warning in group2')
console.error('error in group2')
console.groupEnd('group2')
console.log('logging in group1')
console.warn('warning in group1')
console.error('error in group1')
console.groupEnd('group1')

console.log('----- log with style -----')
const style = 'padding: 5px; color: red; background-color: white; font-style: italic;'
console.log(`style: ${style}`)
console.log('%clog with style', style)