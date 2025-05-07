const { defineConfig } = require('@vue/cli-service')
const path = require('path')

const resolve = (dir) => {
  return path.join(__dirname, dir)
}

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      fallback: { path: require.resolve('path-browserify') }
    }
  },
  chainWebpack(config) {
    // 1. 清除默认的 svg 规则对 src/icons 目录的排除
    config.module.rule('svg').exclude.add(resolve('src/icons')).end()
    // 2. 创建新的 icons 规则来处理 src/icons 目录中的 svg
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      // 使用 svg-sprite-loader 处理这些 SVG
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader') // 指定 loader
      .options({
        symbolId: 'icon-[name]' // 定义 symbol 的id格式（[name]会被替换为文件名）
      })
      .end()
    // 编译时标志
    config.plugin('define').tap((definitions) => {
      Object.assign(definitions[0], {
        __VUE_OPTIONS_API__: 'true',
        __VUE_PROD_DEVTOOLS__: 'false',
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false'
      })
      return definitions
    })
  },
  // 代理跨域
  devServer: {
    proxy: {
      '/api': {
        target: 'https://api.imooc-admin.lgdsunday.club/',
        changeOrigin: true
      }
    },
    client: {
      overlay: {
        // runtimeErrors: false,  // 关闭所有错误覆盖
        runtimeErrors: (error) => {
          // 仅关闭特定错误
          return !error.message.includes('ResizeObserver')
        }
      }
    }
  }
})
