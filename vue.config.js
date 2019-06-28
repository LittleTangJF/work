 module.exports = {
    lintOnSave: false,
    // 如果您不需要生产时的源映射，那么将此设置为false可以加速生产构建
    productionSourceMap: false,
    devServer: {
      port: 8085, // 端口号
      host: "localhost",
      https: false, // https:{type:Boolean}
      open: true, //配置自动启动浏览器
      // proxy: 'http://localhost:4000' // 配置跨域处理,只有一个代理
      proxy: {
            "/discovery": {
                target: "http://172.31.105.100:9999/discovery",
                ws: true,
                changOrigin: true,
                pathRewrite: {
                    "^/discovery": ""
                }
            },
            "/uc": {
                target: "http://172.31.105.100:9999/uc", // 个人中心
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                  "^/uc": ""
                }
              },
        }

    },
    
}