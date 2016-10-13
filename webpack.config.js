const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const merge = require('webpack-merge');
const validate = require('webpack-validator');
const CustomValidationSchema = require('webpack-validator').Joi

/*
This is a handy page on managin multiple configs:
http://survivejs.com/webpack/developing-with-webpack/splitting-configuration/
*/

const commonConfig = {
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

const prodConfig = {
  devtool: 'cheap-module-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress:{
        warnings: true
      }
    })
  ]
}

var config;

if (process.env.npm_lifecycle_event === 'prod') {
  config = merge(commonConfig, prodConfig, {})
} else {
  config = commonConfig
}

const schemaExtension = CustomValidationSchema.object({
  sassLoader: CustomValidationSchema.any()
})

module.exports = validate(config, {schemaExtension: schemaExtension});
