const ServiceWorkerWebpackPlugin = require("serviceworker-webpack-plugin");

module.exports = {
  configureWebpack: {
    plugins: [
      new ServiceWorkerWebpackPlugin({
        entry: "./src/service-worker.js"
      })
    ]
  }
};