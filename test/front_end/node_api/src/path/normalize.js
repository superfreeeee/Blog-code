const { log, group } = require('../utils')

const path = require('path')

/* 标准化路径 */
group('path.normalize(path)', () => {
  log(path.normalize('')) // 默认 . (参数不可为空)
  log(path.normalize('/a/b/../c/////./../')) // 简化 .、..、多重分隔符
})