//引用相关依赖
var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');
var baseWebpackConfig = require('./webpack.base.conf');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var utils = require('./utils');
var ROOT_PATH = path.resolve(__dirname,'../');
var webpackConfig = merge(baseWebpackConfig,{
  //输出文件名
  output: {
    filename: utils.assetsPath('js/[name].[hash].js'),
    chunkFilename: utils.assetsPath('js/[name].[hash].js')//给require.ensure用
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader']
      },
      {
        test: /\.less$/,
        use: [ 'style-loader', 'css-loader', 'postcss-loader', 'less-loader'],
        exclude: /node_modules/,
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: ROOT_PATH + '/index.html',
      inject: 'body',
      minify: {
        removeComments: true,//移除注释
        removeAttributeQuotes: true//移除双引号
      },
      chunksSortMode: 'dependency'//排序方式
    })
  ]
});
module.exports = webpackConfig
