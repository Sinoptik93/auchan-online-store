const path = require('path');
  const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  //Change mode for 'development' or 'production'
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
    plugins: [
      new HTMLWebpackPlugin({
        template: './src/index.html'
      })
  ]
}