// proxy 설정

const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/product", {
      target: process.env.REACT_APP_PRODUCT_SERVER_URL,
      //target: "http://43.200.122.174:8000/",
      changeOrigin: true,
    })
  );
  /*
  app.use(
    createProxyMiddleware("/order", {
      target: process.env.REACT_APP_ORDER_INQUIRY_SERVER_URL,
      changeOrigin: true,
    })
  );
  */
};
