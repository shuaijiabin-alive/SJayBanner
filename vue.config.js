module.exports = {
  devServer: {
    // open: false,
    // // 设置主机地址
    host: 'localhost',
    // // 设置默认端口
    // port: 8080,
    // https: false,
    // hotOnly: false,
  },
  configureWebpack: {
    externals: {
      'AMap': 'AMap' // 高德地图配置
    }
  }
}