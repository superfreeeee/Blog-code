const { log, group } = require('../utils')

/* 进程退出前触发 beforeExit 事件 */
group('process.beforeExit', () => {
  process.on('beforeExit', (code) => {
    log(`[event: beforeExit]exit code: ${code}`)
    doCleanUp()
  })
})

function doCleanUp() {
  log('doCleanUp before exit')
}
