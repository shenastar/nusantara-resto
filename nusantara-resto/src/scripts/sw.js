/* eslint-disable comma-dangle */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-restricted-globals */
import 'regenerator-runtime';
import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate, NetworkFirst } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';
import { skipWaiting, clientsClaim } from 'workbox-core';

skipWaiting();
clientsClaim();

precacheAndRoute(
  [
    ...self.__WB_MANIFEST,
    {
      url: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css',
      revision: '1',
    },
    {
      url: 'https://fonts.googleapis.com/icon?family=Material+Icons',
      revision: '1',
    },
    {
      url: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500',
      revision: '1',
    },
    {
      url: 'https://fonts.googleapis.com/css2?family=Great+Vibes&family=Secular+One&display=swap',
      revision: '1',
    },
  ],
  {
    ignoreURLParametersMatching: [/.*/],
  },
);

registerRoute(
  /https:\/\/restaurant-api.dicoding.dev\/images/,
  new StaleWhileRevalidate({
    cacheName: 'img-resto',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60,
      }),
    ],
  })
);

registerRoute(
  /https:\/\/restaurant-api.dicoding.dev\/?(list|detail|search)/,
  new NetworkFirst({
    cacheName: 'resto-api',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60,
      }),
    ],
  })
);
