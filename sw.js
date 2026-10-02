// غيّر رقم الإصدار عند كل تحديث للتطبيق
const V='biz-v1',CORE=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(V).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
  const r=e.request;if(r.method!=='GET')return;
  const save=res=>{const cp=res.clone();caches.open(V).then(c=>c.put(r,cp));return res};
  if(r.mode==='navigate')e.respondWith(fetch(r).then(save).catch(()=>caches.match('index.html')));
  else e.respondWith(caches.match(r).then(h=>h||fetch(r).then(save)));
});
