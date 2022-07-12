importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/6.5.3/workbox-sw.js"
);

const { clientsClaim } = workbox.core;
const { ExpirationPlugin } = workbox.expiration;
const { precacheAndRoute } = workbox.precaching;
const { registerRoute } = workbox.routing;
const { StaleWhileRevalidate } = workbox.strategies;

// Allows to publish a new service worker & have it control already-open
// webpages as soon as it activates
clientsClaim();

/* 
  -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
                    Handling Imported Fonts
  -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
*/
const fontRegex = /.*(?:googleapis|gstatic|fontawesome)\.com.*$/;
registerRoute(
  ({ url }) => url.origin.match(fontRegex),
  new StaleWhileRevalidate({
    cacheName: "fonts",
    plugins: [
      new ExpirationPlugin({ maxAgeSeconds: 60 * 60 * 24 * 30 }), // Refreshes cache once a month
    ],
  })
);

// Ignore Urchin Tracking Module & Facebook's analytics tracking links
precacheAndRoute([{"revision":"31ed4268ccd1b0618af19cc7b11e7c7a","url":"index.html"},{"revision":"cfe08d5df75fd1d9aac63464bed927b4","url":"src/css/style.css"},{"revision":"5581d72e3c6f6500cea2f4b3cca1ef7b","url":"src/images/favicon.png"},{"revision":"9c4bbb21ac32475a2f3d8c55d2b7337d","url":"src/images/missing_cover.jpg"},{"revision":"87812cb2be86353aea34c4df8f4bce9c","url":"src/js/app.js"},{"revision":"e0802d1c11eb910c50b0df763dfbec32","url":"src/js/main.js"}], {
  ignoreURLParametersMatching: [/^utm_/, /^fbclid$/],
});
