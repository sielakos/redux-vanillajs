var webpack = require('webpack');
var path = require('path');

module.exports = {
  devtool: 'source-map',
  target: 'web',
  entry: {
    app: './app/index.js',
    vendor: ['redux'],
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'dist')
  },
  resolve: {
    modules: [
      'node_modules',
      path.resolve(__dirname, 'app')
    ]
  },
  module: {
    rules: [
      {
        test: /\.(jpg|png)$/,
        loader: 'url-loader'
      },
      {
        test: /\.html$/,
        include: [
          path.resolve(__dirname, 'app')
        ],
        loader: 'html-loader'
      },
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, 'app')
        ],
        loader: 'babel-loader',
        options: {
          "presets": [
            ["latest", {
              "es2015": {
                "modules": false
              }
            }]
          ]
        }
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest'] // Specify the common bundle's name.
    })
  ],
  devServer: {
    publicPath: '/dist/',
    contentBase: './',
    port: 9000
  }
};
