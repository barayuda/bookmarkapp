const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './app/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'build.js'
  },
  module: {
    loaders: [
      /*
        Setting untuk vue dan babel, ini untuk memberi tau
        webpack untuk memproses extensi file vue dan js
      */
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      }
    ]
  },
  babel: {
    // infokan ke webpack, metode nulis dengan ES2015
    "presets": ["es2015"],
    "plugins":["transform-runtime"]
  },
  plugins: [
    // infokan ke webpack, klo saya pakai electron
    new webpack.ExternalsPlugin('commonjs', [
      'electron'
    ])
  ]
}
