const path = require("path");
const merge = require("webpack-merge");

module.exports = merge({}, {
  entry: {
    main: "./src/main.jsx",
    react: ["react", "react-dom", "react-router-dom", "redux", "react-redux"],
    echarts: ["echarts"],
    maptalks: [
      "maptalks",
      "maptalks.three",
      "maptalks.arcgistilelayer",
      "maptalks.wmts"
    ]
  },

  optimization: {
    runtimeChunk: true,
    splitChunks: {
      chunks: "all",
      // minChunks: 10,
      // minSize: 0,
      maxInitialRequests: 4,
      maxAsyncRequests: 6,
      cacheGroups: {
        react: {
          test: "react",
          name: "react_bundle",
          priority: 98,
          reuseExistingChunk: true
        },
        echarts: {
          test: "echarts",
          name: "echarts_bundle",
          priority: 80,
          reuseExistingChunk: true
        },
        maptalks: {
          test: "maptalks",
          name: "maptalks_bundle",
          priority: 80,
          reuseExistingChunk: true
        },
        vendor: {
          test: path.resolve(__dirname, "../node_modules"),
          name: "vendor",
          priority: 0,
          reuseExistingChunk: true
        }
      }
    }
  },

  resolve: {
    extensions: [".wasm", ".ts", ".js", ".tsx", ".jsx", ".json"],
    alias: {
      "#": path.resolve(__dirname, "../libs")
    }
  }
});