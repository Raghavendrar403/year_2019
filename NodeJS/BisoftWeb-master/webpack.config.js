var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');
const TARGET = process.env.npm_lifecycle_event;

var slash = require('slash');
var dirname = __dirname;
if (process.platform === 'win32') dirname = slash(dirname);
console.log(dirname);
var common = {
  plugins: [
    new webpack.DefinePlugin({'TARGET': '"' + TARGET + '"'}),
    new webpack.DefinePlugin({'__base': '"' + dirname + '/"'}),
    new webpack.DefinePlugin({
      'process.env': {'NODE_ENV': JSON.stringify(process.env.NODE_ENV)}
    }),
  ],
  output: {
    path: path.join(__dirname, 'static'),
    filename: 'bundle.js',
    publicPath: 'static/'
  }
};

if (TARGET === 'start') {
  module.exports = merge(common, {
    devtool: 'eval',
    output: {
      publicPath: '/static/'
    },
    entry: [
      'webpack-dev-server/client?http://localhost:3000',
      'webpack/hot/only-dev-server',
      './src/index'
    ],
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ],
    module: {
      loaders: [{
        test: /\.js$/,
        loaders: ['react-hot', 'babel'],
        include: path.join(__dirname, 'src')
      }]
    }
  });
} else {
  module.exports = merge(common, {
    entry: [
      './src/index'
    ],
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        compress: true,
        mangle: true
      })
    ],
    module: {
      loaders: [{
        test: /\.js$/,
        loaders: ['babel'],
        include: path.join(__dirname, 'src')
      }]
    }
  });
}
