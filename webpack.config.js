'use strict';

const webpack = require('webpack');
const path = require('path');
const AssetsPlugin = require('assets-webpack-plugin');
const indexHtml = require('./index.html.js');

const production = process.env.NODE_ENV === 'production';
const BUILD_DIR = path.resolve(__dirname, 'www/assets/');

let entry = ['./src/index'];
if (!production) {
  entry = ['react-hot-loader/patch'].concat(entry);
}

const config = {
  devtool: process.env.DEBUG ? 'source-map' : undefined,
  entry: {
    app: entry,
  },
  output: {
    path: BUILD_DIR,
    filename: 'bundle.[hash].js', // [hash] is replaced by a hash
    publicPath: 'assets/',
  },
  devServer: {
    contentBase: path.join(__dirname, 'www'),
    port: 3001,
  },
  module: {
    rules: [
      { test: /\.(js|jsx)$/, use: 'babel-loader', exclude: /node_modules/ },
      { test: /\.scss$/, loader: 'style-loader!css-loader!sass-loader' },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.(png|gif|ttf|otf|jpe?g|svg|eot|woff|woff2)$/i, loader: 'url-loader?limit=10000&publicPath=assets/' },
      { test: /\.tsv$/, loader: 'dsv-loader?delimiter=\t' },
    ],
    noParse: /node_modules\/json-schema\/lib\/validate\.js/,
  },

  node: {
    console: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        DEBUG: process.env.DEBUG,
      },
    }),
    // Creates index.html file and includes build.[hash].js
    new AssetsPlugin({
      path: path.resolve(__dirname, 'www/'),
      filename: 'index.html',  // change to .txt
      processOutput: assets => indexHtml(assets.app.js),
    }),
  ],
};

if (production) {
  config.plugins = config.plugins.concat([
    // This plugins optimizes chunks and modules by
    // how much they are used in your app
    new webpack.optimize.OccurrenceOrderPlugin(),

    // This plugin prevents Webpack from creating chunks
    // that would be too small to be worth loading separately
    new webpack.optimize.MinChunkSizePlugin({
      minChunkSize: 51200, // ~50kb
    }),

    // This plugin minifies all the Javascript code of the final bundle
    new webpack.optimize.UglifyJsPlugin({
      mangle: true,
      compress: {
        warnings: false, // Suppress uglification warnings
      },
    }),
  ]);
} else {
  config.plugins = config.plugins.concat([
    new webpack.optimize.OccurrenceOrderPlugin(),
    // new webpack.NoEmitOnErrorsPlugin(),
  ]);
}

module.exports = config;
