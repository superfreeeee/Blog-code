const { log, group } = require('../utils')

const path = require('path')

/* 解析路径 */
group('path.parse(path)', () => {
  log(`path.parse('/a/index.html'):`, path.parse('/a/index.html')) // root 对应根目录
  log(`path.parse('./a/index.html/'):`, path.parse('./a/index.html/')) // 忽略尾部分隔符
  log(`path.parse('../a/../index.test.js'):`, path.parse('../a/../index.test.js')) // 不会对路径进行标准化
})
