self.addEventListener("fetch", (e=>e.respondWith(caches.match(e.request).then((t=>{
	if (t) {
		return t
	}
	return fetch(e.request)
}
)))));
