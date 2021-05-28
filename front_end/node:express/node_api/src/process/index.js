const { log, group } = require('../utils')

group('process attributes', () => {
  log(Reflect.ownKeys(process))
})

const modules = [
  'beforeExit',
  'allowedNodeEnvironmentFlags'
]

modules.forEach((name) => {
  require(`./${name}`)
})
