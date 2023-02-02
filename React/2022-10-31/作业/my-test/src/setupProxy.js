const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://api.aulence.com',
            changeOrigin: true,
            pathRewrite: { '^/api': '' }
        })
    );
};