const staticOnuSite = "onu-site-v1";
const assets =  [
  "/",
  "/index.html",
  "/src/app/css/App.css",
  "/src/app/css/refresh.css",
  "/src/app/javascript/App.js",
  "/src/app/javascript/refresh.js",
  "/accets/default_profile_photo/fp_13.jpg"
];

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(staticOnuSite).then(cache => {
      cache.addAll(assets);
    })
  );
});

self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request);
    })
  );
});
