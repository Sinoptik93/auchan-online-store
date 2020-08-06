const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  //Change mode for 'development' or 'production'
  mode: 'development',
  context: path.resolve(__dirname, 'src'),
  entry: './index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@images': path.resolve(__dirname, 'src', 'images'),
      '@styles': path.resolve(__dirname, 'src', 'styles'),
      '@fonts': path.resolve(__dirname, 'src', 'fonts')
    }
  },
  plugins: [
      new HTMLWebpackPlugin({
        template: './index.html'
      })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: ['file-loader']
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        use: ['file-loader']
      },
    ]
  }
}