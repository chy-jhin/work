module.exports = {
  // chainWebpack: config => {
  //   config
  //     .plugin('webpack-bundle-analyzer')
  //     .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
  // },

  /* 部署生产环境和开发环境下的URL：可对当前环境进行区分，baseUrl 从 Vue CLI 3.3 起已弃用，要使用publicPath */
  /* baseUrl: process.env.NODE_ENV === 'production' ? './' : '/' */
  publicPath: "./",
  /* 输出文件目录：在npm run build时，生成文件的目录名称 */
  outputDir: "dist",
  /* 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录 */
  assetsDir: "assets",
  /* 是否在构建生产包时生成 sourceMap 文件，false将提高构建速度 */
  productionSourceMap: false,
  /* 默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存，你可以通过将这个选项设为 false 来关闭文件名哈希。(false的时候就是让原来的文件名不改变) */
  filenameHashing: false,
  /* 代码保存时进行eslint检测 */
  lintOnSave: false,
  /* webpack-dev-server 相关配置 */
  // devServer: {
  //   /* 自动打开浏览器 */
  //   open: false,
  //   /* 设置为0.0.0.0则所有的地址均能访问 */
  //   host: "0.0.0.0",
  //   port: 8066,
  //   https: false,
  //   hotOnly: false,
  //   /* 使用代理 */
  //   proxy: {
  //     "/api": {
  //       /* 目标代理服务器地址 */
  //       target: "http://47.100.47.3/",
  //       /* 允许跨域 */
  //       changeOrigin: true
  //     }
  //   }
  // }
  pages: {
    index: {
      // 页面入口
      entry: 'src/main.js',
      // 模板来源
      template: 'public/index.html',
      // 在 dist/index.html 的输出
      filename: 'index.html',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: '添添福利后台管理系统',
      // 在这个页面中包含的块，默认情况下会包含提取出来的通用 chunk 和 vendor chunk
      chunks: [ 'chunk-vendors', 'chunk-common', 'index']
    },
    // 当使用只有入口的字符串格式时，
    // 模板会被推导为 `public/subpage.html`
    // 并且如果找不到的话，就回退到 `public/index.html`
    // 输出文件名会被推导为 `subpage.html`
    //subpage: 'src/main.js'
  },
};