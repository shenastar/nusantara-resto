/* eslint-disable import/no-extraneous-dependencies */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const { InjectManifest } = require('workbox-webpack-plugin');
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
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
        ],
      }, {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        use: [
          'file-loader',
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/templates/index.html'),
      filename: 'index.html',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/public/'),
          to: path.resolve(__dirname, 'dist/'),
        },
      ],
    }),
    new WebpackPwaManifest({
      name: 'Nusantara Resto',
      short_name: 'Nusa Resto',
      description: 'Temukan restoran kesukaanmu di seluruh Nusantara',
      start_url: '/index.html',
      display: 'standalone',
      background_color: '#ffffff',
      theme_color: '#d84315',
      crossorigin: 'use-credentials',
      icons: [
        {
          src: path.resolve('src/public/favicon.png'),
          size: [96, 128, 192, 256, 384, 512],
          purpose: 'any maskable',
        },
      ],
    }),
    new InjectManifest({
      swSrc: path.resolve('src/scripts/sw.js'),
      swDest: 'sw.js',
    }),
  ],
};
