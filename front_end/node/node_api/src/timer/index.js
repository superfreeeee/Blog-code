const { log, group } = require('../utils')

const modules = ['ref_test']

modules.forEach((module) => {
  group(module, () => {
    require(`./${module}`)
  })
})
