importScripts("https://www.gstatic.com/firebasejs/10.14.1/firebase-app-compat.js","https://www.gstatic.com/firebasejs/10.14.1/firebase-messaging-compat.js");
firebase.initializeApp({apiKey:"AIzaSyCqI4vOaqxd7crE8I68gLcHhU4TTAvrXlc",authDomain:"libretaestudioapp.firebaseapp.com",projectId:"libretaestudioapp",storageBucket:"libretaestudioapp.firebasestorage.app",messagingSenderId:"497805272613",appId:"1:497805272613:web:a4cfbffd4af336d27e01cc"});
firebase.messaging();
const C="huilen-v5",F=["./","./index.html","./manifest.json","./logo.png","./icon-192.png","./icon-512.png","./favicon.png"];
self.addEventListener("install",e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(F)))});
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener("fetch",e=>{
  if(e.request.method!=="GET")return;
  const u=new URL(e.request.url);if(u.origin!==location.origin)return;
  e.respondWith(fetch(e.request).then(r=>{const cp=r.clone();caches.open(C).then(c=>c.put(e.request,cp));return r}).catch(()=>caches.match(e.request)))
});
