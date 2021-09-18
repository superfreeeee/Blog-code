const path = require('path');

module.exports = {
  mode: 'production',
  entry: path.join(__dirname, 'src/index'),
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'lib'),
    library: {
      name: '__youxiantest_pkg_1',
      type: 'umd',
    },
    globalObject: 'this',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
};
