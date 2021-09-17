const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/index',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    library: {
      name: '__webpack_library_2',
      type: 'umd',
    },
    globalObject: 'this',
  },
  resolve: {
    extensions: ['.js', '.ts', '.json'],
  },
  plugins: [new CleanWebpackPlugin()],
};
