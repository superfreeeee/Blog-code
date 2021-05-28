const { log, group } = require('../utils')

const path = require('path')

/* 返回文件扩展名 */
group('path.extname(path)', () => {
  log(`path.extname('/a/index.html'):          ${path.extname('/a/index.html')}`) // 取 . 后作为扩展名
  log(`path.extname('/a/index.test.js'):       ${path.extname('/a/index.test.js')}`)
  log(`path.extname('/a/index.test.js/'):      ${path.extname('/a/index.test.js/')}`) // 忽略末尾分隔符
  log(`path.extname('/a/index.test.js/index'): ${path.extname('/a/index.test.js/index')}`) // 只取最后一个文件的最后一个 . 后作为扩展名
})
