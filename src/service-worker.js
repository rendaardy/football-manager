import { skipWaiting, clientsClaim } from "workbox-core";
import { precacheAndRoute } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import {
  CacheFirst,
  NetworkFirst,
  StaleWhileRevalidate,
} from "workbox-strategies";
import { CacheableResponsePlugin } from "workbox-cacheable-response";
import { ExpirationPlugin } from "workbox-expiration";

const BASE_URL = "https://api.football-data.org";

precacheAndRoute(self.__WB_MANIFEST || []);

skipWaiting();
clientsClaim();

registerRoute(
  ({ url }) => url.origin === "https://fonts.googleapis.com",
  new StaleWhileRevalidate({
    cacheName: "google-fonts-stylesheets",
  })
);

registerRoute(
  ({ url }) => url.origin === "https://fonts.gstatic.com",
  new CacheFirst({
    cacheName: "google-fonts-webfonts",
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
        maxEntries: 30,
      }),
    ],
  })
);

registerRoute(
  ({ request }) => request.destination === "image",
  new CacheFirst({
    cacheName: "images",
    plugins: [
      new ExpirationPlugin({
        maxEntries: 300,
        maxAgeSeconds: 60 * 60 * 24 * 365,
      }),
    ],
  })
);

registerRoute(
  new RegExp(".+\\.svg$"),
  new CacheFirst({
    cacheName: "additional-assets",
    plugins: [
      new ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
      }),
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);

registerRoute(
  ({ url }) => url.origin === BASE_URL,
  new NetworkFirst({
    cacheName: "football-manager-data",
    networkTimeoutSeconds: 15,
    plugins: [
      new ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 24 * 30,
      }),
    ],
  })
);

self.addEventListener("push", (event) => {
  let body;

  if (event.data) {
    body = event.data.text();
  } else {
    body = "Push message no payload";
  }

  event.waitUntil(
    self.registration.showNotification("Football Manager", {
      body,
      icon: "",
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: new Date(),
        primaryKey: 1,
      },
    })
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  switch (event.action) {
    case "yes-action":
      break;
    case "no-action":
      break;
    default:
      break;
  }
});
