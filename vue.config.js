const path = require('path')

module.exports = {
  publicPath: '/A/ar/resources/',
  outputDir: 'dist',
  assetsDir: 'assets',
  pages: {
    index: {
      entry: 'src/main.js',
      template: path.resolve(__dirname, 'public/index.html'),
      filename: 'index.html',
      chunks: ['chunk-vendors', 'chunk-common', 'index'],
      minify: {
        minimize: true, // 是否打包为最小值 ,没有看到有什么作用，网上没有相关资料
        removeAttributeQuotes: true, // 移除属性的引号（不常用）
        // removeEmptyElements:true,    //删除所有含有空内容的元素。（不常用,慎用）
        removeComments: true, // 带HTML注释
        collapseWhitespace: true, // 去掉空格
        minifyJS: true, // 压缩html里的js 压缩内联js（使用uglify-js进行的压缩）
        minifyCSS: true // 压缩html里的css 压缩内联css（使用clean-css进行的压缩）
      },
      hash: true, // 引入产出的资源时加上哈希避免缓存,在html中的js和css后面加上？hash值
    }
  },
  lintOnSave: false,
  runtimeCompiler: false,
  transpileDependencies: [],
  productionSourceMap: false,
  crossorigin: undefined,
  integrity: false,
  devServer: {
    port: 8085,
    proxy: {
      '/A/ar/api/': {
        target: 'http://10.16.21.7:9600/',
        changeOrigin: true,
        secure: false
      },
    }
  }
}