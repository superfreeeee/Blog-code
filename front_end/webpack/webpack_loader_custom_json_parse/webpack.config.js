const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WebpackBar = require('webpackbar');

const config = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
  },
  resolveLoader: {
    modules: [path.resolve(__dirname, 'loaders'), 'node_modules'],
  },
  module: {
    rules: [
      {
        test: /\.jsonc/,
        use: 'jsonc-loader',
      },
    ],
  },
  plugins: [new CleanWebpackPlugin(), new WebpackBar()],
};

module.exports = config;
