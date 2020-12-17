// console.log('----- global properties -----')
// console.log(Object.getOwnPropertyNames(global))

// console.log(`\n__dirname: ${__dirname}`)
// console.log(`__filename: ${__filename}`)

// console.log('\n----- console types -----')
// console.log(console)

// console.log('\n----- process properties -----')
// console.log(Object.getOwnPropertyNames(process))

// const other = require('./other')
// const { user, greeting } = other
// greeting(user.name)

const server = require('./server')
server.start()