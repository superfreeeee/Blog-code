const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: {
    index: './src/index.js',
    print: './src/print.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Development',
    }),
    new WebpackManifestPlugin(),
  ],
  devServer: {
    port: 3000,
    static: './dist',
  },
  optimization: {
    runtimeChunk: 'single',
  },
};
