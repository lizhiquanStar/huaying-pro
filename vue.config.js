module.exports = {
  publicPath: '/',
  css: {
    loaderOptions: {
      sass: {
        // eslint-disable-next-line quotes
        data: `@import "~@/core/styles/common/variable.scss";`
      }
    }
  },
  productionSourceMap: false,
  configureWebpack: {
    entry: './src/main.ts',
    module: {
      rules: [{
        test: /\.md$/,
        use: [{
          loader: 'vue-loader',
          options: {
            compilerOptions: {
              preserveWhitespace: false
            }
          }
        }]
      }]
    },
    resolve: {
      extensions: ['.js', '.vue', '.json', '.ts', '.tsx']
    }
  },
  devServer: {
    watchOptions: {
      ignored: ['node_modules', 'public']
    },
    // proxy: {
    //   '/api': {
    //     target: 'http://47.100.189.31:8080', // 代理地址
    //     changeOrigin: true,
    //     pathRewrite: {
    //       '^/api': ''
    //     }
    //   }
    // }
  }
};
