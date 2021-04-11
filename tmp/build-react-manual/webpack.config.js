const path = require('path') // 引入‘path’，为了在这里使用绝对路径，避免相对路径在不同系统时出现不必要的问题
const webpack = require('webpack')

module.exports = {
  // 应用入口
  entry: {
    app: path.join(__dirname, './src/index.js') // index.js作为打包的入口
  },
  // 输出目录
  output: {
    filename: 'bundle.js',
    // filename: '[name].[hash:8].js', //name代表entry对应的名字; hash代表 整个app打包完成后根据内容加上hash。一旦整个文件内容变更，hash就会变化
    path: path.join(__dirname, 'dist'), // 打包好之后的输出路径
  }
} 	