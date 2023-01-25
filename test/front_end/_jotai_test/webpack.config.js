const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackBar = require('webpackbar');

const IS_PROD = process.env.NODE_ENV === 'production';

const config = {
  // Start mode / environment
  mode: IS_PROD ? 'production' : 'development',

  // Entry files
  entry: path.resolve(__dirname, 'src/index'),

  // Output files and chunks
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]-[chunkhash].js',
  },

  // Resolve files configuration
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.scss'],
  },

  // Module/Loaders configuration
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.module.(sass|scss)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[path][name]__[local]--[hash:base64:5]',
              },
              sourceMap: true,
            },
          },
          'sass-loader',
        ],
      },
    ],
  },

  // Plugins
  plugins: [
    new WebpackBar(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'public/index.html'),
      minify: IS_PROD,
    }),
  ],

  // Webpack chunks optimization
  optimization: {
    splitChunks: {
      cacheGroups: {
        default: false,
        venders: false,
        vendor: {
          chunks: 'all',
          name: 'vender',
          test: /node_modules/,
        },
      },
    },
  },

  //
  performance: {
    maxEntrypointSize: 512 * 1000,
    maxAssetSize: 512 * 1000,
  },

  // DevServer for development
  devServer: {
    port: 3000,
    historyApiFallback: true,
    hot: true,
  },

  // Generate source map
  devtool: 'source-map',
};

module.exports = config;
