module.exports = {
  plugins: {
    // 'autoprefixer': {
    //     browsers: '> 5%',
    //     grid: true
    // },
    "postcss-px-to-viewport": {
      viewportWidth: 750,
      viewportHeight: 1334,
      unitPrecision: 3,
      viewportUnit: 'vw',
      selectorBlackList: ['.ignore', '.hairlines','weui','vux'],
      minPixelValue: 1,
      mediaQuery: false,
      exclude: /node_modules|folder_name/i
    },
  }
}
