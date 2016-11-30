var config = require('./webpack.config');
var webpack = require('webpack');
var CompressionPlugin = require("compression-webpack-plugin");

config.plugins = addProductionPlugins();

module.exports = config;

function addProductionPlugins() {
  return config.plugins.concat([
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new CompressionPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$|\.html$/,
      threshold: 10240,
      minRatio: 0.8
    })
  ]);
}
