const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');

const paths = require('./paths');

module.exports = {
  entry: paths.src + '/index.js',
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },


      /*{
        test: /\.ts?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true
            }
          }
        ]
      },
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },*/
    ],
  },
  output: {
    path: paths.build,
    filename: '[name].bundle.js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.ts'],
    fallback: {
      path: false,
    },
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