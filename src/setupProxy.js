const { createProxyMiddleware } = require('http-proxy-middleware')
//配置代理
module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:9000/',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    }),
  )
}
