const path = require('path');

module.exports = {
  //Change mode for 'development' or 'production'
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  }
}