const path = require("path");
const merge = require("webpack-merge");
const TerserPlugin = require("terser-webpack-plugin");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "production",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [path.resolve(__dirname, "node_modules/")],
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "minify"],
            },
          },
        ],
      },
    ],
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        test: /\.m?js$/,
      }),
    ],
  },
});
