const paths = require('./paths');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: paths.src + '/index.js',
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
  output: {
    path: paths.build,
    filename: '[name].bundle.js',
    publicPath: '/',
  },
  plugins: [
    // Removes/cleans build folders and unused assets when rebuilding
    new CleanWebpackPlugin(),
    // Generates an HTML file from a template
    new HtmlWebpackPlugin({
      title: 'Notedly',
      // template: path.join(process.cwd(), 'src', 'index.html')
      template: paths.src + '/index.html',
    })
  ],
};