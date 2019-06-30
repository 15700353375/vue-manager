//引入相关依赖
var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');
var HtmlWebpackPlugin = require('html-webpack-plugin');
//路径为文件夹，自动引入index文件
var config = require('../config');
var utils = require('./utils')
var vueLoaderConfig = require('./vue-loader.conf')
//设置变量
var ROOT_PATH = path.resolve(__dirname,'../');
var SRC_PATH = path.resolve(ROOT_PATH,'src');
const vuxLoader = require('vux-loader')

const webpackConfig = {
  devtool: '#source-map',
  //打包入口 也可直接用文件夹名字，默认找index.js
  entry: {
    app:  path.join(ROOT_PATH,'/main.js'),
    css: path.join(SRC_PATH,'/assets/vendor.js')
  },
  output: {
    path: config.build.assetsRoot,
    publicPath: process.env.NODE_ENV === 'production'
      ?config.build.assetsPublicPath
      : config.dev.assetsPublicPath,//给require.ensure用
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      // 'vue$': 'vue/dist/vue.common.js',
      'vue$': 'vue/dist/vue.esm.js',
      '@Src': SRC_PATH,
      '@Components': path.join(SRC_PATH, 'components'),
      '@Util': path.join(SRC_PATH, 'util'),
      '@View': path.join(SRC_PATH, 'view')
    }
  },
  module:{
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: "pre",
        include: [path.join(ROOT_PATH,'/main.js'), SRC_PATH],
        // exclude: /vue.vux.js$/,
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: process.env.NODE_ENV === 'production' ?  {} : vueLoaderConfig,
        // include: SRC_PATH
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        include: [ path.join(ROOT_PATH,'/main.js'), SRC_PATH ]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
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

  // externals: {
  //   'weui': 'weui',
  //   'weui.js': 'weui.js'
  // }
}


module.exports = vuxLoader.merge(webpackConfig, {
  plugins: ['vux-ui', 'progress-bar', 'duplicate-style']
})
