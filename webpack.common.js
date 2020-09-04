const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const DotenvWebpack = require("dotenv-webpack");
const MomentLocalesPlugin = require("moment-locales-webpack-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "assets/icons/icon-96x96.png",
            },
          },
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: "./src/components/templates", to: "pages" },
        { from: "./src/components/assets", to: "assets" },
        { from: "./src/manifest.json", to: "" },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: "css/style.css",
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
      favicon: "./src/components/assets/icons/icon-72x72.png",
    }),
    new DotenvWebpack({
      path: "./.env",
    }),
    new MomentLocalesPlugin(),
    new WorkboxPlugin.InjectManifest({
      swSrc: "./src/service-worker.js",
      swDest: "sw.js",
    }),
  ],
};
