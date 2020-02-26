const path = require('path');

const webpackMerge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.config');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = webpackMerge(baseWebpackConfig, {
  mode: 'development',
  plugins: [
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, '../dist/index.html'),
      template: path.resolve(__dirname, '../playground/index.html'),
      inject: true,
    }),
  ],
  devtool: 'inline-source-map',
  devServer: {
    historyApiFallback: true,
    // hot: true,
    contentBase: false,
    compress: true,
    publicPath: '/',
    proxy: {},
  },
});
