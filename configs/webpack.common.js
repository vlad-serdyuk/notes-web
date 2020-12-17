const path = require("path");
const { DefinePlugin } = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const paths = require('./paths');

const dotenv = require('dotenv').config({
  path: path.resolve(process.cwd(), '.env'),
});

module.exports = {
  entry: paths.src + '/index.js',
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  output: {
    path: paths.build,
    filename: '[name].bundle.js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    fallback: {
      path: false,
    },
    alias: {
      common: path.resolve(__dirname, '../src/common'),
      components: path.resolve(__dirname, '../src/components'),
      gql: path.resolve(__dirname, '../src/gql'),
      pages: path.resolve(__dirname, '../src/pages'),
    },
  },
  plugins: [
    // Add .env variables to process.env
    new Dotenv({
      systemvars: true,
    }),
    // new DefinePlugin({ 'process.env': JSON.stringify(dotenv.parsed) }),
    // Removes/cleans build folders and unused assets when rebuilding
    new CleanWebpackPlugin(),
    // Generates an HTML file from a template
    new HtmlWebpackPlugin({
      title: 'Notedly',
      // template: path.join(process.cwd(), 'src', 'index.html')
      template: paths.src + '/index.html',
    }),
  ],
  /*optimization: {
    runtimeChunk: "single", // enable "runtime" chunk
    splitChunks: {
        cacheGroups: {
            vendor: {
                test: /[\\/]node_modules[\\/]/,
                name: "vendor",
                chunks: "all"
            }
        }
    }
  }*/
};