const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MinCSSExtractPlugin = require('mini-css-extract-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const optimization = () => {
  const config = {};
  
  if (isProd) {
    config.minimizer = [
      new TerserWebpackPlugin(),
      new OptimizeCSSAssetsWebpackPlugin(),
    ]
  }

  return config;
}

const filename = (extension) => isDev ? `[name].${extension}` : `[name].[hash].${extension}`;

const cssLoader = (extra) => {
  const loader = [
    {
      loader: MinCSSExtractPlugin.loader,
      options: {
        hmr: isDev,
        reloadAll: true
      }
    },
    'css-loader',
  ];

  if (extra) {
    loader.push(extra);
  }

  return loader;
}

const plugins = () => {
  const base = [
    new HTMLWebpackPlugin({
      template: './index.html',
      minify: {
        collapseWhitespace: isProd,
      }
    }),
    new MinCSSExtractPlugin({
      filename: filename('css')
    })
  ];

  if (isProd) {
    base.push(new BundleAnalyzerPlugin());
  }

  return base;
}

// const jsLoader = () => {
//   const loader = [{
//       loader: 'babel-loader',
//       options: {
//         presets: [
//           '@babel/preset-env'
//         ]
//       }
//     }];

//   if (isDev) {
//     loader.push('eslint-loader');
//   }

//   return loader;
// }

module.exports = {
  //Change mode for 'development' or 'production'
  mode: 'development',
  context: path.resolve(__dirname, 'src'),
  entry: {
    main: ['@babel/polyfill', './index.js']
  },
  output: {
    filename: filename('js'),
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
  optimization: optimization(),
  devtool: isDev ? 'source-map' : '',
  plugins: plugins(),
  module: {
    rules: [
      // {
      //   test: /\.js$/,
      //   exclude: /node_modules/,
      //   use: jsLoader()
      // },
      {
        test: /\.js$/,
        exclude: /node_modules/, //exclude folder from work
        loader: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env'
            ]
          }
        }
      },
      {
        test: /\.css$/,
        use:cssLoader()
      },
      {
        test: /\.scss$/,
        use: cssLoader('sass-loader')
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