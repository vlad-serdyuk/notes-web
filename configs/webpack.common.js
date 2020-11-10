const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.resolve(process.cwd(), './src/index.js'),
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.js?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      /* {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      }, */
    ],
  },
  resolve: {
    extensions: ['.ts', '.js' ],
    fallback: {
      path: false,
    },
  },
  output: {
    path: path.resolve(process.cwd(), './dist'),
    filename: 'bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(process.cwd(), 'src', 'index.html')
    })
  ],
  devServer: {
    contentBase: path.resolve(process.cwd(), './dist'),
  }
};