const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
console.log('path', path.resolve(__dirname, '../dist'));

module.exports = {
  entry: {
    app: path.resolve(__dirname, '../playground/app.js'),
  },
  output: {
    path: path.resolve(__dirname, '../docs'),
    filename: 'js/[name].[hash].js',
    publicPath: './',
    chunkFilename: 'js/[name].chunk.[hash].js',
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
            },
          },
          'css-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
            },
          },
          'css-loader',
          'postcss-loader',
          'sass-loader',
          {
            loader: 'sass-resources-loader',
            options: {
              sourceMap: true,
              resources: [path.resolve(__dirname, '../_var/var.scss')],
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/img/[name].[hash:7].[ext]',
        },
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: 'react-svg-loader',
            options: {
              jsx: true, // true outputs JSX tags
            },
          },
        ],
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/fonts/[name].[hash:7].[ext]',
        },
      },
    ],
  },
  resolve: {
    modules: ['src', 'node_modules'],
    alias: {
      '@finxos': path.resolve(__dirname, '../src/'),
    },
  },
};
