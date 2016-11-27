var config = require('./webpack.config');
var webpack = require('webpack');

config.plugins = addProductionPlugins();

module.exports = config;

function addProductionPlugins() {
  return config.plugins.concat([
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.UglifyJsPlugin()
  ]);
}
