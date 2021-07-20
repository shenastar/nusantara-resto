/* eslint-disable prefer-destructuring */
/* eslint-disable import/no-extraneous-dependencies */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const FaviconWebpackPlugin = require('favicons-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const { InjectManifest } = require('workbox-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const ImageminWebpWebpackPlugin = require('imagemin-webp-webpack-plugin');
const ImageminWebpackPlugin = require('imagemin-webpack-plugin').default;
const ImageminMozjpeg = require('imagemin-mozjpeg');
// const ImageminPngQuant = require('imagemin-pngquant');
const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'src/scripts/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(png|jpeg|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.(scss|css)$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/templates/index.html'),
      filename: 'index.html',
    }),
    new FaviconWebpackPlugin({
      logo: './src/public/favicon.png',
    }),
    new WebpackPwaManifest({
      name: 'Nusantara Resto',
      short_name: 'Nusa Resto',
      description: 'Temukan restoran kesukaanmu di seluruh Nusantara',
      theme_color: '#141313',
      background_color: '#2c2b2b',
      crossorigin: 'use-credentials',
      icons: [
        {
          src: path.resolve('src/public/favicon.png'),
          size: [96, 128, 192, 256, 384, 512],
          purpose: 'any maskable',
        },
      ],
    }),
    new BundleAnalyzerPlugin(),
    new InjectManifest({
      swSrc: path.resolve('src/scripts/sw.js'),
      swDest: 'sw.js',
    }),
    new ImageminWebpackPlugin({
      plugins: [
        ImageminMozjpeg({
          quality: 50,
          progressive: true,
        }),
      ],
    }),
    new ImageminWebpWebpackPlugin({
      config: [
        {
          test: /\.(jpe?g|png)/,
          options: {
            quality: 50,
          },
        },
      ],
      overrideExtension: true,
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/public/'),
          to: path.resolve(__dirname, 'dist/'),
          globOptions: {
            ignore: ['**/images/**'],
          },
        },
      ],
    }),
  ],
  node: {
    fs: 'empty',
  },
};
