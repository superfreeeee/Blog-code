const path = require('path');

module.exports = {
  // common
  mode: 'development',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },

  entry: './src/dynamic-import.js',

  // 1. multiple entry
  // entry: {
  //   index: {
  //     import: './src/index.js',
  //     dependOn: 'lodash',
  //   },
  //   another: {
  //     import: './src/another-module.js',
  //     dependOn: 'lodash',
  //   },
  //   lodash: 'lodash',
  // },
  // optimization: {
  //   runtimeChunk: 'single',
  // },

  // 2. SplitChunksPlugin
  // entry: {
  //   index: './src/index.js',
  //   another: './src/another-module.js',
  // },
  // optimization: {
  //   splitChunks: {
  //     chunks: 'all',
  //   },
  // },

  // 3. dynamic import
};
