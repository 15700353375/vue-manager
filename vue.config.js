const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
    runtimeCompiler: true,  // 加入内容
    //反向代理的配置
    devServer: {
        open: true,
        host: '0.0.0.0',
        port: '8004', //设置端口号
        proxy: {
            '/api': {
                // target: 'http://qsyfw.gnway.cc:12345/',//目标地址
                target: 'https://szy.kiloxy.com',
                // ws: true, //// 是否启用websockets
                changeOrigin: true, //开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
                pathRewrite: {'^/api': ''}    //这里重写路径
            }

        }
    },    
    chainWebpack(config) {
        // 修复HMR
        // config.resolve.symlinks(true);
        config.resolve.alias
        .set('@Components', resolve('src/components'))
        .set('@Src', resolve('src'))
        .set('@Util', resolve('src/util'))
        // 修复HMR
        // config.resolve.symlinks(true);
    },
    configureWebpack: config => {
        require('vux-loader').merge(config, {
        options: {},
        plugins: ['vux-ui']
        })
    },
    pluginOptions: {
        'style-resources-loader': {
          preProcessor: 'less',
          patterns: [
            path.resolve(__dirname, './src/assets/vender.js'),
          ],
        },
    },
    // 是否开启eslint保存检测，有效值：ture | false | 'error'
    lintOnSave: true,
    css: {
        sourceMap: true, // 是否在构建样式地图，false将提高构建速度
        extract: true, // 是否使用css分离插件 ExtractTextPlugin，采用独立样式文件载入，不采用<style>方式内联至html文件中
        loaderOptions: {
        postcss: {
            plugins: [
            require("postcss-px-to-viewport")({
                viewportWidth: 750,
                viewportHeight: 1334,
                unitPrecision: 3,
                viewportUnit: 'vw',
                selectorBlackList: ['.ignore', '.hairlines', 'vux'],
                minPixelValue: 1,
                mediaQuery: false,
                exclude: /node_modules|folder_name/i
            })
            ]
        }
        }
    }
}