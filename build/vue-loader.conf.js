var utils = require('./utils')
var config = require('../config')
var isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: isProduction
      ? config.build.productionSourceMap
      : config.dev.cssSourceMap,
    extract: isProduction
  }),
  postcss: [
    require('autoprefixer')({
      browsers: ['iOS >= 7', 'Android >= 4.1']
    }),
    // require("postcss-px-to-viewport")({
    //   viewportWidth: 750,
    //   viewportHeight: 1334,
    //   unitPrecision: 3,
    //   viewportUnit: 'vw',
    //   selectorBlackList: ['.ignore', '.hairlines', 'vux'],
    //   minPixelValue: 1,
    //   mediaQuery: false,
    //   exclude: /node_modules|folder_name/i
    // })
  ]
}
