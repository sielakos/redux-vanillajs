var config = require('./webpack.config');
var path = require('path');

deleteUnneededConfigEntries();
addTestRoot();
addBabelRewirePlugin();
addTestFilesBabelLoader();

module.exports = config;

function deleteUnneededConfigEntries() {
  delete config.entry;
  delete config.output;
  delete config.plugins;
}

function addTestRoot() {
  config.resolve.modules.push(
    path.resolve(__dirname, 'test')
  );
}

function addBabelRewirePlugin() {
  config.module.rules
    .filter(function(loaderConf){
      return loaderConf.loader === 'babel-loader';
    })
    .forEach(function(loader) {
      loader.query.plugins.push('babel-plugin-rewire');
    });
}

function addTestFilesBabelLoader() {
  config.module.rules.push({
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
}
