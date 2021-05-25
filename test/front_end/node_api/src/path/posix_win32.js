const { log, group } = require('../utils')

const path = require('path')

/* 平台特定实现 */
group('path.posix / path.win32', () => {
  log(`path.posix.delimiter: '${path.posix.delimiter}'`)
  log(`path.posix.sep:       '${path.posix.sep}'`)
  log(`path.win32.delimiter: '${path.win32.delimiter}'`)
  log(`path.win32.sep:       '${path.win32.sep}'`)
})
