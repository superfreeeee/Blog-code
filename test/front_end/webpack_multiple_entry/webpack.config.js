const path = require('path')

const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { WebpackManifestPlugin } = require('webpack-manifest-plugin')
// const ProgressBarWebpackPlugin = require('progress-bar-webpack-plugin')
const WebpackBar = require('webpackbar')

const chunks = ['entryA', 'entryB', 'entryC']

module.exports = {
  mode: 'production',
  entry: {
    entryA: './src/entryA.js',
    entryB: './src/entryB.js',
    entryC: './src/entryC.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]-[chunkhash].js',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new WebpackManifestPlugin(),
    // new ProgressBarWebpackPlugin(),
    new WebpackBar(),
    ...chunks.map(
      (name) =>
        new HtmlWebpackPlugin({
          template: `public/${name}.html`,
          filename: `${name}.html`,
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
