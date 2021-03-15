const path = require("path");
const merge = require("webpack-merge");
const base_webpack_config = require("./webpack.base.js");
const html_webpack_plugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const InlineSourcePlugin = require("html-webpack-inline-source-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const MomentLocalesPlugin = require("moment-locales-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const HtmlWebpackIncludeAssetsPlugin = require("html-webpack-include-assets-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
const ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin");


module.exports = merge(base_webpack_config, {
  mode: "production",
  output: {
    filename: "js/[name]-[chunkhash:16].js",
    path: path.resolve(__dirname, "../dist/production"),
    //publicPath: urlconfig["prod"]["sysconfig"]["login"]["url"]
  },

  module: {
    rules: [{
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: [{
            loader: "babel-loader"
          },
          {
            loader: "eslint-loader"
          }
        ]
      },
      {
        test: /\.tsx?$/,
        enforce: "pre",
        use: [{
            loader: "babel-loader"
          },
          // {
          //   loader: "ts-loader"
          // },
          // {
          //   loader: "tslint-loader",
          //   options: {
          //     configFile: "./tslint.yaml",
          //     tsConfigFile: "tsconfig.json"
          //   }
          // }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.less$/,
        use: [{
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: false,
              importLoaders: 1
            }
          },
          {
            loader: "postcss-loader",
            options: {
              // exec: true,
              // sourceMap: true,
              // parser: 'postcss-js',
              plugins: loader => {
                return [
                  // require('postcss-import')(),
                  require("autoprefixer")({})
                ];
              }
            }
          },
          {
            loader: "less-loader",
            options: {
              javascriptEnabled: true,
              sourceMap: false
            }
          },
          {
            loader: "style-resources-loader",
            options: {
              patterns: path.resolve(__dirname, "../src/styles/globalvariable.less")
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [{
            loader: "style-loader",
            options: {
              sourceMap: true,
              hmr: true
            }
          },
          {
            loader: "css-loader"
          }
        ]
      },
      {
        test: /\.html$/,
        use: {
          loader: "html-loader"
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [{
            loader: "url-loader",
            options: {
              limit: (10 | 0) * (1024 | 0),
              fallback: "file-loader",
              outputPath: "/assets/images",
              name: "[hash:16].[ext]",
            }
          },
          {
            loader: "image-webpack-loader",
          }
        ]
      },
      {
        test: /\.mp4$/i,
        use: [{
          loader: "url-loader",
          options: {
            limit: (0 | 0) * (1024 | 0),
            fallback: "file-loader",
            outputPath: "/assets/video",
            name: "[hash:16].[ext]",
          }
        }]
      }
    ]
  },

  plugins: [

    new CopyWebpackPlugin([
      { from: path.resolve(__dirname, "../public/globalconfig.js"), to: path.resolve(__dirname, "../dist/production/js/api.js"), }
    ]),

    new html_webpack_plugin({
      template: "./public/index.html",
      filename: "../production/index.html",
      inject: "body",
      title: "",

      hash: false,
      meta: {
        "http-equiv": "Content-Type",
        "content": "text/html; charset=utf-8; IE=edge, chrome=1"
      },
      // inlineSource: "runtime~.+\\.js",
      chunksSortMode: "none",
      cache: false
    }),

    new ScriptExtHtmlWebpackPlugin({
      defer: [/\/echarts.*\.js$/, /\/main.*\.js$/],
      preload: [/main.*\.js$/, /\/react.*\.js$/, /\/vendor.*\.js$/],
      defaultAttribute: "async",
      inline: [/api\.js$/, /react-[a-z0-9]{16}\.js$/, /echarts-[a-z0-9]{16}\.js$/, /runtime~.+\.js$/]
    }),

    new HtmlWebpackIncludeAssetsPlugin({
      assets: ["js/api.js"],
      append: false
    }),

    new FaviconsWebpackPlugin({
      logo: path.resolve(__dirname, "../assets/logo.png"),
      prefix: 'icons/'
    }),

    new InlineSourcePlugin(),


    new MiniCssExtractPlugin({
      filename: "[name]_[hash:16].css",
      chunkFilename: "[id]_[contenthash].css",
    }),

    new MomentLocalesPlugin({
      localesToKeep: ["zh-cn"],
    }),

    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require("cssnano"),
      cssProcessorPluginOptions: {
        preset: ["default", { discardComments: { removeAll: true } }],
      },
      canPrint: true
    }),

    new BundleAnalyzerPlugin({
      analyzerPort: 8081
    })
  ]
});