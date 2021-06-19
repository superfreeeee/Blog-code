const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const WebpackBar = require('webpackbar')

module.exports = {
  // mode: 'development',
  mode: 'production',
  entry: path.join(__dirname, './src/index.js'),
  output: {
    path: path.join(__dirname, './dist'),
    filename: '[name].[chunkhash].bundle.js',
    publicPath: '/',
  },
  // devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node-modules/,
        use: 'babel-loader',
      },
    ],
  },
  plugins: [
    new WebpackBar(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      title: 'webpack + babel',
      hash: true,
    }),
  ],
  devServer: {
    contentBase: 'dist',
  },
}
