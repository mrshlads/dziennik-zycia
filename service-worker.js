const CACHE='dziennik-zycia-v3-20261115-1';
const ROOT=new URL('./',self.location).href;
const FILES=['./','./index.html','./manifest.webmanifest','./icons/icon-192.png','./icons/icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('dziennik-zycia-v3-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET'||!e.request.url.startsWith(ROOT))return;if(e.request.mode==='navigate'){e.respondWith(fetch(e.request).then(r=>{if(!r.ok)throw Error('Network');return r;}).catch(()=>caches.match(new URL('./index.html',ROOT).href)));return;}e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));});
