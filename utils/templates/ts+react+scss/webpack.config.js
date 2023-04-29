const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackBar = require('webpackbar');

const IS_PROD = process.env.NODE_ENV === 'production';

/**
 * @type {import('webpack').Configuration}
 */
const config = {
  mode: IS_PROD ? 'production' : 'development',

  entry: path.resolve(__dirname, 'src/index'),

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.scss'],
  },

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

  plugins: [
    new WebpackBar(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'public/index.html'),
      minify: IS_PROD,
    }),
  ],

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

  performance: {
    // maxEntrypointSize: 512 * 1000,
    // maxAssetSize: 512 * 1000,
  },

  devServer: {
    port: 3000,
    historyApiFallback: true,
    hot: true,
  },

  // Generate source map
  devtool: IS_PROD ? 'source-map' : 'eval-source-map',
};

module.exports = config;
