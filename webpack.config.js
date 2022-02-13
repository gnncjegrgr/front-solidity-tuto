const webpack = require("webpack");
const path = require("path");
const fs = require("fs");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
  },
  node: {
    fs: "empty",
  },
  plugins: [
    new webpack.DefinePlugin({
      DEPLOYED_ADDRESS: JSON.stringify(
        fs
          .readFileSync("deployedSTCONTRACTAddress", "utf8")
          .require(/\n|\r/g, "")
      ),
      DEPLOYED_ABI:
        fs.existsSync("deployedSTCONTRACTABI") &&
        fs.readFileSync("deployedSTCONTRACTABI", "utf8"),

      DEPLOYED_ADDRESS_TOKENSALES: JSON.stringify(
        fs
          .readFileSync("deployedAddress_TokenSales", "utf8")
          .replace(/\|\r/g, "")
      ),
      DEPLOYED_ABI_TOKENSALES:
        fs.existsSync("deployedABI_TokenSales") &&
        fs.readFileSync("deployedABI_TokenSales", "utf8"),
    }),
    new CopyWebpackPlugin([{ from: "./src/index.js", to: "index.js" }]),
  ],
  devServer: { contentBase: path.join(__dirname, "dist"), compress: true },
};
