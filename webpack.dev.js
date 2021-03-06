const merge = require("webpack-merge");
const WriteFilePlugin = require("write-file-webpack-plugin");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  plugins: [new WriteFilePlugin()],
});
