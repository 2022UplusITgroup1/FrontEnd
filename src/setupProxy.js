// proxy 설정

const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/product", {
      target: "http://43.200.122.174:8000/",
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware("/image", {
      target: "https://d2i7g6t0sifvpq.cloudfront.net/",
      changeOrigin: true,
    })
  );
};
