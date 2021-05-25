const { log, group } = require('../utils')

const path = require('path')

/* 系统路径分界符 */
group('path.delimiter', () => {
  log(`path.delimiter: '${path.delimiter}'`) // 返回当前系统分隔符
  log(`process.env.PATH: ${process.env.PATH}`)
  log('process.env.PATH.split(path.delimiter):', process.env.PATH.split(path.delimiter))
})
