var webpack = require('webpack');
var path = require('path');

module.exports = {
  devtool: 'source-map',
  target: 'web',
  entry: {
    app: path.resolve(__dirname, 'app', 'app.js'),
    bpmnFiles: [path.resolve(__dirname, 'app', 'bpmn')],
    vendor: ['redux', 'bpmn-js', 'lodash.isequal'],
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
        test: /\.bpmn$/,
        loader: 'raw-loader'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader/url',
          {
            'loader': 'file-loader',
            options: {
              publicPath: '/dist/',
              name: '[name].css'
            }
          },
          'sass-loader'
        ]
      },
      {
        test: /\.(jpg|png)$/,
        loader: 'url-loader'
      },
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, 'app'),
        ],
        loader: 'babel-loader',
        query: {
          presets: ['latest'],
          plugins: ['transform-object-rest-spread']
        }
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'bpmnFiles', 'manifest']
    })
  ],
  devServer: {
    publicPath: '/dist/',
    contentBase: './',
    port: 9000
  }
};
