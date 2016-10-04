var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: {
    styles: './src/styles/main.scss',
    script: './src/scripts/index.js'
  },
  output: {
    path: 'public/',
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('css!sass')
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader?presets[]=es2015&presets[]=react'
      },
      {
        test: /\.(jpg|png|gif)$/,
        loader: 'file-loader?name=/images/[name].[hash].[ext]'
      },
      {
        test: /\.html$/,
        loader: 'file-loader?name=/[name].[ext]'
      },
      {
        test: /\.svg$/,
        loader: 'babel?presets[]=es2015,presets[]=react!svg-react'
      }
    ]
  },
  sassLoader: {
    outputStyle: 'compact'
  },
  plugins: [
    new ExtractTextPlugin('../public/styles/main2.css', {
        allChunks: true
    })
  ]
}
