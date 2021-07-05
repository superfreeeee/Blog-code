const { log, group } = require('../utils')

/* 只读：环境变量 */
group('process.allowedNodeEnvironmentFlags', () => {
  process.allowedNodeEnvironmentFlags.forEach((flag) => {
    log(`flag: ${flag}`)
  })
  log()
  
})
