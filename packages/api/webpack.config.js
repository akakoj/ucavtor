/**
 * Plugins
 */

const nodeExternals = require('webpack-node-externals');
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

  externals: [nodeExternals()],

  resolve: {
    extensions: ['.ts', '.js']
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
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
  },
};
