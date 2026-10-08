// Offline support for the published deck.
// Open the deck once online; after that it loads from Cache Storage with no network.
// /deck publish bumps VERSION and regenerates PRECACHE on every sync.

const VERSION = '2026-10-08T1150Z';
const CACHE = `fourth-platform-${VERSION}`;

// Deck files, relative to this worker. The entry is index.html in the repo
// (fourth-platform.html in Claude Design). dist/ and docs are left out.
const PRECACHE = [
  './',
  'index.html',
  'deck-stage.js',
  'deck.css',
  'slides-content.jsx',
  'slides-frame.jsx',
  'tweaks-panel.jsx',
  'assets/amazon-logo.png',
  'assets/experience/automotive.jpg',
  'assets/experience/bigscreen.jpg',
  'assets/experience/fridge.jpg',
  'assets/experience/mobile.jpg',
  'assets/favicon.png',
  'assets/me/dog-bjorn.jpg',
  'assets/me/kids.jpg',
  'assets/me/profile.jpg',
  'assets/me/react-berlin.jpg',
  'assets/me/wife-travel.jpg',
  'assets/me/work-zattoo.jpg',
  'assets/poc/auth.png',
  'assets/poc/login-before.png',
  'assets/poc/login-qr.png',
  'assets/poc/stream.png',
  'assets/poc/vega-first-boot.jpg',
  'assets/product-hero-cropped.jpg',
  'assets/psyduck.gif',
  'assets/slides/beta-feedback-reference.jpg',
  'assets/slides/duplication-reference.jpg',
  'assets/slides/ownership-reference.jpg',
  'assets/slides/product-look-reference.jpg',
  'assets/slides/pwa-reference.jpg',
  'assets/slides/swot-reference.jpg',
  'assets/slides/team-topologies.jpg',
  'assets/slides/tests-reference.jpg',
  'assets/tux.png',
  'assets/vega-developer-portal-1.jpg',
  'assets/vega-developer-portal-2.jpg',
  'ds/colors_and_type.css',
  'ds/fonts/Compasse-Bold.otf',
  'ds/fonts/Compasse-ExtraBold.otf',
  'ds/fonts/Compasse-Italic.otf',
  'ds/fonts/Compasse-Light.otf',
  'ds/fonts/Compasse-Regular.otf',
];

// Pinned third-party files, loaded with crossorigin so their responses are cacheable.
const PRECACHE_REMOTE = [
  'https://unpkg.com/react@18.3.1/umd/react.development.js',
  'https://unpkg.com/react-dom@18.3.1/umd/react-dom.development.js',
  'https://unpkg.com/@babel/standalone@7.29.0/babel.min.js',
];

// The font files behind this stylesheet are read out of it at install time.
const FONTS_CSS = 'https://fonts.googleapis.com/css2?family=Barlow+Semi+Condensed:wght@300;400;500;700;800&display=swap';

const precacheFonts = async (cache) => {
  try {
    const response = await fetch(FONTS_CSS);
    if (!response.ok) {
      return;
    }
    await cache.put(FONTS_CSS, response.clone());
    const css = await response.text();
    const fontUrls = [...css.matchAll(/url\((https:\/\/fonts\.gstatic\.com\/[^)]+)\)/g)].map((match) => match[1]);
    await cache.addAll(fontUrls);
  } catch {
    // Barlow falls back to the system font offline; never block the install on it.
  }
};

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    // cache: 'reload' skips the HTTP cache, so a fresh publish is never precached stale.
    await cache.addAll(PRECACHE.map((path) => new Request(path, {cache: 'reload'})));
    await cache.addAll(PRECACHE_REMOTE);
    await precacheFonts(cache);
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys
      .filter((key) => key.startsWith('fourth-platform-') && key !== CACHE)
      .map((key) => caches.delete(key)));
    await self.clients.claim();
  })());
});

// Own files: serve from cache, refresh in the background (a new publish shows on the next reload).
const staleWhileRevalidate = async (request) => {
  const cache = await caches.open(CACHE);
  const cached = await cache.match(request, {ignoreSearch: true});
  const network = fetch(request)
    .then((response) => {
      if (response.ok) {
        cache.put(request, response.clone());
      }
      return response;
    })
    .catch(() => cached);
  return cached || network;
};

// Pinned third-party files never change: cache first, network only on a miss.
const cacheFirst = async (request) => {
  const cache = await caches.open(CACHE);
  const cached = await cache.match(request);
  if (cached) {
    return cached;
  }
  const response = await fetch(request);
  if (response.ok) {
    cache.put(request, response.clone());
  }
  return response;
};

self.addEventListener('fetch', (event) => {
  const {request} = event;
  if (request.method !== 'GET') {
    return;
  }
  const url = new URL(request.url);
  if (url.origin === self.location.origin) {
    event.respondWith(staleWhileRevalidate(request));
    return;
  }
  if (['unpkg.com', 'fonts.googleapis.com', 'fonts.gstatic.com'].includes(url.hostname)) {
    event.respondWith(cacheFirst(request));
  }
});
