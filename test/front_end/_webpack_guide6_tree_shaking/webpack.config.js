const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  devServer: {
    static: './dist',
  },
  mode: 'production',
  // plugins: [
  //   new HtmlWebpackPlugin({
  //     title: 'Hot Module Replacement',
  //   }),
  // ],
  // mode: 'development',
  // devtool: false,
  // optimization: {
  //   usedExports: true,
  // },
};
