const { log, group } = require('../utils')

const path = require('path')

/* 检查是否为绝对路径 */
group('path.isAbsolute(path)', () => {
  log(`path.isAbsolute('/a/index.html'):  ${path.isAbsolute('/a/index.html')}`)
  log(`path.isAbsolute('a/index.html'):   ${path.isAbsolute('a/index.html')}`)
  log(`path.isAbsolute('./a/index.html'): ${path.isAbsolute('./a/index.html')}`)
  log(`path.isAbsolute('./a/index.html'): ${path.isAbsolute('./a/index.html')}`)
})