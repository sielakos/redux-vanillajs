var config = require('./webpack.config');

delete config.entry;
delete config.output;
delete config.plugins;

module.exports = config;
