importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/6.5.3/workbox-sw.js"
);

const { clientsClaim } = workbox.core;
const { BackgroundSyncPlugin } = workbox.backgroundSync;
const { ExpirationPlugin } = workbox.expiration;
const { precacheAndRoute, createHandlerBoundToURL } = workbox.precaching;
const { registerRoute } = workbox.routing;
const { StaleWhileRevalidate } = workbox.strategies;

// Allows to publish a new service worker & have it control already-open
// webpages as soon as it activates
clientsClaim();

// Ignore Urchin Tracking Module & Facebook's analytics tracking links
precacheAndRoute(self.__WB_MANIFEST, {
  ignoreURLParametersMatching: [/^utm_/, /^fbclid$/],
});
