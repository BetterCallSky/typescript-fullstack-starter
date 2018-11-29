/* eslint import/no-commonjs: 0, strict: 0, no-param-reassign: 0, global-require: 0 */
'use strict';

const path = require('path');
const ip = require('ip');
const webpack = require('webpack');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;

const __DEV__ = process.env.NODE_ENV === 'development';
const __PROD__ = process.env.NODE_ENV === 'production';

const fixStyleLoader = loader => {
  if (!__DEV__) {
    const first = loader.use[0];
    const rest = loader.use.slice(1);
    loader.use = ExtractTextPlugin.extract({
      fallback: first,
      use: rest,
    });
  }
  return loader;
};

const getEnvPlugins = () => {
  if (__DEV__) {
    return [
      process.env.CHECK_BUNDLE && new BundleAnalyzerPlugin(),
      new webpack.HotModuleReplacementPlugin(),
    ];
  }
  if (__PROD__) {
    return [
      process.env.CHECK_BUNDLE && new BundleAnalyzerPlugin(),
      new ExtractTextPlugin('[name].[md5:contenthash:hex:20].css'),
    ];
  }
  return [new ExtractTextPlugin('[name].[md5:contenthash:hex:20].css')];
};

const compact = array => array.filter(x => x);

const getAppStaticDir = dirname => {
  const staticPath = path.join(dirname, 'src/static');
  if (fs.existsSync(staticPath)) {
    return { from: staticPath };
  }
  return null;
};

module.exports = function makeWebpack(options) {
  const {
    dirname,
    entry,
    devtool = 'inline-eval-cheap-source-map',
    title,
  } = options;
  return {
    name: 'client',
    target: 'web',
    mode: __DEV__ ? 'development' : 'production',
    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      },
    },
    devtool: __DEV__ ? devtool : false,
    resolve: {
      extensions: ['.tsx', '.ts', '.jsx', '.js', '.json', 'json5'],
      alias: {
        typeless: path.join(__dirname, '../typeless'),
        src: path.join(dirname, './src'),
      },
    },
    entry: {
      app: compact([
        '@babel/polyfill',
        __DEV__ && 'webpack-hot-middleware/client',
        ...entry,
      ]),
    },
    output: {
      filename: '[name].[hash].js',
      path: path.join(dirname, './dist'),
      publicPath: __DEV__
        ? `http://${ip.address()}:${process.env.PORT || 3200}/`
        : '/',
    },
    plugins: compact([
      new CleanWebpackPlugin(['dist'], {
        root: dirname,
        verbose: false,
      }),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        },
      }),
      new HtmlWebpackPlugin({
        template: path.join(__dirname, './index.ejs'),
        hash: false,
        filename: 'index.html',
        inject: false,
        minify: {
          collapseWhitespace: false,
        },
        title,
      }),
      new CopyWebpackPlugin(compact([getAppStaticDir(dirname)])),
      ...getEnvPlugins(),
    ]),
    module: {
      rules: [
        {
          test: /\.(t|j)sx$/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                babelrc: false,
                presets: [
                  [
                    '@babel/preset-typescript',
                    {
                      isTSX: true,
                      allExtensions: true,
                    },
                  ],
                  '@babel/preset-react',
                ],
                plugins: [
                  'react-hot-loader/babel',
                  '@babel/plugin-syntax-dynamic-import',
                ],
              },
            },
          ],
          exclude: /node_modules/,
        },
        {
          test: /\.(t|j)s$/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                babelrc: false,
                presets: [
                  [
                    '@babel/preset-typescript',
                    {
                      isTSX: false,
                      allExtensions: false,
                    },
                  ],
                ],
              },
            },
          ],
          exclude: /node_modules/,
        },
        {
          test: /\.json5$/,
          use: 'json5-loader',
        },
        fixStyleLoader({
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        }),
        {
          test: /\.woff(\?.*)?$/,
          use:
            'url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff',
        },
        {
          test: /\.woff2(\?.*)?$/,
          use:
            'url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff2',
        },
        {
          test: /\.otf(\?.*)?$/,
          use:
            'file-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=font/opentype',
        },
        {
          test: /\.ttf(\?.*)?$/,
          use:
            'url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/octet-stream',
        },
        {
          test: /\.eot(\?.*)?$/,
          use: 'file-loader?prefix=fonts/&name=[path][name].[ext]',
        },
        {
          test: /\.svg(\?.*)?$/,
          use:
            'url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=image/svg+xml',
        },
        { test: /\.(png|jpg)$/, use: 'url-loader?limit=8192' },
      ],
    },
  };
};
