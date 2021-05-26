const { log, group } = require('../utils')

const path = require('path')

/* 合并路径后生成绝对路径 */
group('path.resolve(...paths)', () => {
  log(`path.resolve('a', 'b', 'c'):    ${path.resolve('a', 'b', 'c')}`) // 相对路径
  log(`path.resolve('/a', 'b', 'c'):   ${path.resolve('/a', 'b', 'c')}`) // 绝对路径
  log(`path.resolve('/a', 'b/', 'c/'): ${path.resolve('/a', 'b/', 'c/')}`) // 尾部分隔符被删除
})
