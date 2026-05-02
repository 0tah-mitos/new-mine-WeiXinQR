// sw.js
const CACHE_NAME = 'ikun-image-cache-v1';
const IKUN_URL = './icon.ikun';   // 真实文件路径
const JPG_ALIAS = 'icon.jpg';     // 你想用的“别名”

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      // 预缓存：把 icon.ikun 的内容以 icon.jpg 的名字存入缓存
      return fetch(IKUN_URL)
        .then(response => {
          if (!response.ok) throw new Error('Failed to fetch icon.ikun');
          // 克隆响应，因为流只能读一次
          const clonedResponse = response.clone();
          // 以 icon.jpg 为 key 缓存
          return cache.put(JPG_ALIAS, cloned_RESPONSE);
        })
        .then(() => self.skipWaiting());
    })
  );
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  // 如果请求的是 icon.jpg，就从缓存返回
  if (url.pathname.endsWith('/' + JPG_ALIAS)) {
    event.respondWith(
      caches.match(JPG_ALIAS).then(cached => {
        return cached || fetch(event.request); // 容错
      })
    );
  }
});
