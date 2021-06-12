const path = require('path')

const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { WebpackManifestPlugin } = require('webpack-manifest-plugin')
const ProgressBarWebpackPlugin = require('progress-bar-webpack-plugin')

module.exports = {
  mode: 'production',
  entry: path.join(__dirname, 'src/entryA.js'),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name]-[chunkhash].js',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new WebpackManifestPlugin(),
    new ProgressBarWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: `public/entryA.html`,
      filename: `entryA.html`,
      title: `Webpack 单入口配置 - entryA`,
    }),
  ],
}
