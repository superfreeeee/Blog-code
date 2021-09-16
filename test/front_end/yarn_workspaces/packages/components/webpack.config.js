const path = require('path');

module.exports = {
  mode: 'development',
  entry: path.join(__dirname, 'src/index'),
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
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
  externals: {
    '@youxian/test-hooks': path.resolve(__dirname, '../hooks'),
  },
};
