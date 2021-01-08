const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const paths = require('../paths');

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
      app: paths.src + '/app',
      common: paths.src + '/common',
      components: paths.src + '/components',
      gql: paths.src + '/gql',
      pages: paths.src + '/pages',
    },
  },
  plugins: [
    // Add .env variables to process.env
    new Dotenv({
      systemvars: true,
    }),
    // Removes/cleans build folders and unused assets when rebuilding
    new CleanWebpackPlugin(),
    // Generates an HTML file from a template
    new HtmlWebpackPlugin({
      title: 'Notedly',
      // template: path.join(process.cwd(), 'src', 'index.html')
      template: paths.public + '/index.html',
    }),
  ],
  optimization: {
    /* runtimeChunk: "single", // enable "runtime" chunk
    splitChunks: {
        cacheGroups: {
            vendor: {
                test: /[\\/]node_modules[\\/]/,
                name: "vendor",
                chunks: "all"
            }
        }
    } */
    splitChunks: {
      chunks: 'all',
    },
  },

};