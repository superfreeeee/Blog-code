const path = require('path');

module.exports = {
  mode: 'development',
  // entry: [
  //   'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
  //   './client.js',
  // ],
  output: {
    path: path.join(__dirname, 'lib'),
    publicPath: '/lib',
    filename: '[name].js',
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /.(jsx?|tsx?)/,
        loader: 'babel-loader',
      },
    ],
  },
  plugins: [],
};
