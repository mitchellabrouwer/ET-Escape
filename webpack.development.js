/* eslint-disable import/no-extraneous-dependencies */
const path = require('path')
const { merge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  mode: 'development',
  optimization: {
    usedExports: true,
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    historyApiFallback: true,
    publicPath: '/',
    port: 8080,
    // Enable this host if you need to access this from another device, like for mobile testing:
    host: '0.0.0.0',
  },
  module: {
    rules: [],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      minify: false,
    }),
  ],
})
