const { log, group } = require('../utils')

const path = require('path')

/* 返回当前文件目录 */
group('path.dirname(path)', () => {
  log(`path.dirname('/a/index.html'): ${path.dirname('/a/index.html')}`)
  log(`path.dirname('/a/index'):      ${path.dirname('/a/index')}`)
  log(`path.dirname('/a/index/'):     ${path.dirname('/a/index/')}`) // 忽略末尾分隔符
})
