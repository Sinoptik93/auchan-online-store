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
      }
    ]
  }
}