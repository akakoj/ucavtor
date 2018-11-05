/**
 * Plugins
 */

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

/**
 * Env
 */

const devMode = process.env.NODE_ENV !== 'production';

/**
 * Expo
 */

module.exports = {
  target: 'node',
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: devMode ? 'app.bundle.js' : 'app.[hash].js'
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },

  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
      }),
    ],
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  },
};
