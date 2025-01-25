const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: process.env.NODE_ENV || "development",
  entry: "./src/renderer/index.jsx",
  target: "electron-renderer",
  devtool: "source-map",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "renderer.js",
    publicPath: process.env.NODE_ENV === "development" ? "/" : "./",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/renderer/index.html",
      filename: "index.html",
    }),
  ],
  devServer: {
    host: "localhost",
    port: 3000,
    hot: false,
    compress: true,
    static: {
      directory: path.join(__dirname, "dist"),
    },
    devMiddleware: {
      writeToDisk: true,
    },
    historyApiFallback: true,
  },
};
