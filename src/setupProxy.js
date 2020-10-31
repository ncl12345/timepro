const {
    createProxyMiddleware
} = require('http-proxy-middleware');
module.exports = function (app) {
    const tempUrl = 'http://192.168.174.1:3005'
    app.use(
        '/user',
        createProxyMiddleware({
            target:tempUrl,
            changeOrigin: true,
        })
    );
    app.use(
        '/role',
        createProxyMiddleware({
            target: tempUrl,
            changeOrigin: true,
        })
    );
    app.use(
        '/detail',
        createProxyMiddleware({
            target: tempUrl,
            changeOrigin: true,
        })
    );
    app.use(
        '/right',
        createProxyMiddleware({
            target: tempUrl,
            changeOrigin: true,
        })
    );
    app.use(
        '/comingsoon',
        createProxyMiddleware({
            target: tempUrl,
            changeOrigin: true,
        })
    );
    app.use(
        '/nowplaying',
        createProxyMiddleware({
            target: tempUrl,
            changeOrigin: true,
        })
    );
    app.use(
        '/login',
        createProxyMiddleware({
            target: tempUrl,
            changeOrigin: true,
        })
    );
    app.use(
        '/cinema',
        createProxyMiddleware({
            target: tempUrl,
            changeOrigin: true,
        })
    );
};