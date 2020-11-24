const path = require("path");
const { DefinePlugin } = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');

const paths = require('./paths');

const dotenv = require('dotenv').config({
  path: path.resolve(process.cwd(), '.env'),
});

console.log(dotenv.parsed);

const envKeys = Object.keys(dotenv.parsed).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(dotenv.parsed[next]);
  return prev;
}, {});

console.log(envKeys);

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
  },
  plugins: [
    // Add .env variables to process.env
    new DefinePlugin(envKeys),
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