const path = require('path')

const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: path.join(__dirname, 'src/index'),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name]-[chunkhash].js',
  },
  module: {
    rules: [{ test: /\.(js|jsx)$/, use: 'babel-loader' }],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'React Context 上下文 & 组件组合(Component Composition)',
      template: './public/index.html',
      filename: 'index.html',
    }),
  ],
  // optimization: {
  //   splitChunks: {
  //     chunks: 'all',
  //   },
  // },
  devServer: {
    port: 3000,
    host: '0.0.0.0',
    contentBase: 'dist',
  },
}
