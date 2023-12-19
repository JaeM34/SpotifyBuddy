const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://mc.amigoes.life:3000',
      changeOrigin: true,
    })
  );
};