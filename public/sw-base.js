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
precacheAndRoute(self.__WB_MANIFEST, {
  ignoreURLParametersMatching: [/^utm_/, /^fbclid$/],
});
