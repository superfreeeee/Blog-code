const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const WasmPackPlugin = require('@wasm-tool/wasm-pack-plugin');

module.exports = {
  mode: 'development',
  entry: './index.js',
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new WasmPackPlugin({
      crateDirectory: path.resolve(__dirname, 'pack_template'),
    }),
    // Have this example work in Edge which doesn't ship `TextEncoder` or
    // `TextDecoder` at this time.
    new webpack.ProvidePlugin({
      TextDecoder: ['text-encoding', 'TextDecoder'],
      TextEncoder: ['text-encoding', 'TextEncoder'],
    }),
  ],
  experiments: {
    asyncWebAssembly: true,
  },
};
