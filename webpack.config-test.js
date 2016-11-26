var config = require('./webpack.config');
var path = require('path');
var RewirePlugin = require('rewire-webpack');

delete config.entry;
delete config.output;

config.resolve = {
  root: [
    path.resolve(__dirname, 'app'),
    path.resolve(__dirname, 'test')
  ]
};

config.plugins = [
  new RewirePlugin()
];

//Adds babel rewire plugin
config.module.loaders
  .filter(({loader}) => loader === 'babel-loader')
  .forEach(loader => {
    loader.query.plugins.push('babel-plugin-rewire');
  });


config.module.loaders.push({
  test: /\.js$/,
  include: [
    path.resolve(__dirname, 'test'),
  ],
  loader: 'babel-loader',
  query: {
    presets: ['latest'],
    plugins: ['transform-object-rest-spread']
  }
});

module.exports = config;
