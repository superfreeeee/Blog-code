const { log, group } = require('../utils')

const path = require('path')

/* 当前文件名(可去除扩展名) */
group('path.basename(path, ext)', () => {
  log(`path.basename('/a/index.html'):          ${path.basename('/a/index.html')}`)
  log(`path.basename('./a/index.html'):         ${path.basename('./a/index.html')}`)
  log(`path.basename('a/index.html'):           ${path.basename('a/index.html')}`)
  log(`path.basename('a/index.html/'):          ${path.basename('a/index.html/')}`)  // 忽略末尾分隔符
  log(`path.basename('C:\\a\\index.html'):        ${path.basename('C:\\a\\index.html')}`)  // 不处理非本平台分隔符
  log(`path.basename('/a/index.html', '.html'): ${path.basename('/a/index.html', '.html')}`)  // 去除扩展名
  log(`path.basename('/a/index.html', '.c'):    ${path.basename('/a/index.html', '.c')}`)
})