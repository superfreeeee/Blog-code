const path = require('path')

const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { WebpackManifestPlugin } = require('webpack-manifest-plugin')
const ProgressBarWebpackPlugin = require('progress-bar-webpack-plugin')

const chunks = ['entryA', 'entryB', 'entryC']

module.exports = {
  mode: 'production',
  entry: {
    entryA: path.join(__dirname, 'src/entryA.js'),
    entryB: path.join(__dirname, 'src/entryB.js'),
    entryC: path.join(__dirname, 'src/entryC.js'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]-[chunkhash].js',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new WebpackManifestPlugin(),
    new ProgressBarWebpackPlugin(),
    ...chunks.map(
      (name) =>
        new HtmlWebpackPlugin({
          template: `public/${name}.html`,
          filename: `${name}.html`,
          title: `Webpack 多入口配置 - ${name}`,
          chunks: [name],
        })
    ),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
}
