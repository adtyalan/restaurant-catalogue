import 'regenerator-runtime';
import CacheHelper from './utils/cache-helper';

// Daftar asset yang akan di-caching
const assetsToCache = [
  './',
  './icons/frame1.png',
  './icons/frame2.png',
  './icons/frame3.png',
  './icons/frame4.png',
  './icons/frame5.png',
  './icons/frame6.png',
  './icons/frame7.png',
  './icons/frame8.png',
  './index.html',
  './favicon.png',
  './app.bundle.js',
  './app.webmanifest',
  './sw.bundle.js',
];

self.addEventListener('install', (event) => {
  console.log('Installing Service Worker ...');
  event.waitUntil(CacheHelper.cachingAppShell([...assetsToCache]));
  // TODO: Caching App Shell Resource
});

self.addEventListener('activate', (event) => {
  console.log('Activating Service Worker ...');
  event.waitUntil(CacheHelper.deleteOldCache());
  // TODO: Delete old caches
});

self.addEventListener('fetch', (event) => {
  console.log(event.request);

  event.respondWith(CacheHelper.revalidateCache(event.request));
  // TODO: Add/get fetch request to/from caches
});