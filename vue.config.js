'use strict'
const path = require('path')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin // 分析bundle文件
const webpack = require('webpack')
// const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
const defaultSettings = require('./src/settings.js')
const isProduction = process.env.NODE_ENV === 'production'

function resolve(dir) {
  return path.join(__dirname, dir)
}

const name = defaultSettings.title // page title
const devIp = defaultSettings.devIp // dev Ip

// If your port is set to 80,
// use administrator privileges to execute the command line.
// For example, Mac: sudo npm run
// You can change the port by the following method:
// port = 9527 npm run dev OR npm run dev --port = 9527
const port = process.env.port || process.env.npm_config_port || 9528 // dev port

// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
  /**
   * You will need to set publicPath if you plan to deploy your site under a sub path,
   * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
   * then publicPath should be set to "/bar/".
   * In most cases please use '/' !!!
   * Detail: https://cli.vuejs.org/config/#publicpath
   */
  publicPath: '/', // history模式 -- /     hash模式 -- ./
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: false, // 是否保存的时候自动eslint
  productionSourceMap: false, // 是否生产环境启用source-map
  parallel: require('os').cpus().length > 1, // 多线程打包
  // 是否使用包含运行时编译器的 Vue 构建版本
  runtimeCompiler: false,
  // 生成的 HTML 中的 <link rel="stylesheet"> 和 <script> 标签上启用 Subresource Integrity (SRI)
  integrity: false,
  // PWA 插件相关配置
  pwa: {},
  devServer: {
    port: port, // 端口
    hot: true, // 热更新
    open: false, // 自动打开默认浏览器
    // eslint有错误或者警告的时候，编译错误，需要改正。
    overlay: {
      warnings: true,
      errors: true
    },
    // 本地proxy
    /* proxy: {
      [process.env.VUE_APP_BASE_API]: {
        target: devIp,
        ws: false,
        changeOrigin: true,
        pathRewrite: {
          // ['^' + process.env.VUE_APP_BASE_API]: '/'
        },
        // 过滤
        bypass: function (req, res, proxyOptions) {
          if (!req.headers.accept || req.headers.accept.indexOf('html') !== -1) {
            return '/index.html'
          }
        }
      }
    }, */
    disableHostCheck: true // 新版的webpack-dev-server出于安全考虑，默认检查hostname，如果hostname不是配置内的，将中断访问提示Invalid Host header
    // 本地mock，也可以配置接口请求
    // before: require('./mock/mock-server.js')
  },
  // 默认情况下 babel-loader 会忽略所有 node_modules 中的文件。如果你想要通过 Babel 显式转译一个依赖，可以在这个选项中列出来
  /* transpileDependencies: [
    /[/\\]node_modules[/\\]packageName[/\\]/
  ], */
  configureWebpack: (config) => {
    config.name = name
    if (isProduction) {
      /* config.plugins.push(
        // bundle文件分析
        new BundleAnalyzerPlugin()
      ) */
      config.plugins.push(
        // 开启gzip压缩
        new CompressionWebpackPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: /\.(js|json|css|html|svg)$/,
          compressionOptions: { level: 5 },
          threshold: 51200,
          minRatio: 0.8, // 压缩率大于0.8的才压缩
          deleteOriginalAssets: false // 是否删除原文件
        })
      )
      /* config.plugins.push(
        // 忽略moment目录下的locale文件夹
        new webpack.IgnorePlugin(/\.\/locale/, /moment/)
      ) */
      config.plugins.push(
        // 提高再次构建速度
        new webpack.optimize.ModuleConcatenationPlugin()
      )
      /* config.plugins.push(
        // 懒加载
        new HardSourceWebpackPlugin()
      ) */
      // 压缩代码
      config.optimization.minimizer = [
        new UglifyJsPlugin({
          uglifyOptions: {
            compress: {
              drop_console: true, // console
              drop_debugger: true,
              pure_funcs: ['console.log'] // 移除console
            }
          },
          parallel: true
        })
      ]
      // 取消webpack警告的性能提示
      config.performance = {
        hints: 'warning',
        // 入口起点的最大体积
        maxEntrypointSize: 5000000,
        // 生成文件的最大体积
        maxAssetSize: 10000000,
        // 只给出 js 文件的性能提示
        assetFilter: function (assetFilename) {
          return assetFilename.endsWith('.js')
        }
      }
    }
  },
  chainWebpack(config) {
    if (isProduction) {
      // 删除预加载
      config.plugins.delete('preload')
      config.plugins.delete('prefetch')
    }
    config.entry('index').add('@babel/polyfill').end()
    config.resolve.alias.set('@', resolve('./src'))
    // set svg-sprite-loader
    config.module.rule('svg').exclude.add(resolve('src/icons')).end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
    config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap((options) => Object.assign(options, { limit: 10000 }))
      .end()

    // set preserveWhitespace
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap((options) => {
        options.compilerOptions.preserveWhitespace = true
        return options
      })
      .end()

    config
      // https://webpack.js.org/configuration/devtool/#development
      .when(!isProduction, (config) => config.devtool('source-map'))

    config.when(isProduction, (config) => {
      config
        .plugin('ScriptExtHtmlWebpackPlugin')
        .after('html')
        .use('script-ext-html-webpack-plugin', [
          {
            // `runtime` must same as runtimeChunk name. default is `runtime`
            inline: /runtime\..*\.js$/
          }
        ])
        .end()
      // 第三方模块没有AMD/CommonJS规范版本，可以使用 noParse 来标识这个模块，这样 Webpack 会引入这些模块，但是不进行转化和解析，从而提升 Webpack 的构建性能
      config.module.noParse = /echarts/
      // 分割代码js
      config.optimization.splitChunks({
        chunks: 'all',
        maxInitialRequests: Infinity,
        minSize: 20000,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              // get the name. E.g. node_modules/packageName/not/this/part.js
              // or node_modules/packageName
              const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
              // npm package names are URL-safe, but some servers don't like @ symbols
              return `npm.${packageName.replace('@', '')}`
            }
          },
          utils: {
            name: true,
            chunks: 'initial',
            minSize: 0,
            priority: 40,
            minChunks: 2
          }
        }
      })
      config.optimization.runtimeChunk('single')
    })
  },
  css: {
    // requireModuleExtension: true, // 默认情况下，只有 *.module.[ext] 结尾的文件才会被视作 CSS Modules 模块。设置为 false 后你就可以去掉文件名中的 .module 并将所有的 *.(css|scss|sass|less|styl(us)?) 文件视为 CSS Modules 模块,替代css.modules
    extract: isProduction, // 是否使用css分离插件 ExtractTextPlugin,将组件中的 CSS 提取至一个独立的 CSS 文件中
    sourceMap: !isProduction, // 是否开启 CSS source maps
    loaderOptions: {
      // 给 sass-loader 传递选项,在 sass-loader v7 中，这个选项名是 "data"
      /* sass: {
        prependData: ''
      }, */
      // 给 less-loader 传递选项
      /* less: {
        globalVars: {},
        modifyVars: {},
        javascriptEnabled: true
      } */
    }
  },
  pluginOptions: {}
}
