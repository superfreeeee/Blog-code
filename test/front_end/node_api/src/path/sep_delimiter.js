const { log, group } = require('../utils')

const path = require('path')

/* 系统路径分界符 */
group('path.delimiter', () => {
  log(`path.sep: '${path.sep}'`) // 返回当前系统目录分隔符
  log(`path.delimiter: '${path.delimiter}'`) // 返回当前系统路径分隔符
  log(`process.env.PATH: ${process.env.PATH}`)
  log('process.env.PATH.split(path.delimiter):', process.env.PATH.split(path.delimiter))
})
