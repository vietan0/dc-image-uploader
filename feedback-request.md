It's the first time I've made a "fullstack" app, so I'd love to know what I can improve on my approach and what is the standard way to structure the project:

- I have a `client` dir which I use Vite to initialize, and a `server` that contains API logics, so all frontend libraries are included in `/client/package.json` while all backend libs are in `/package.json`.
- In developing, `client` will fetch from `server` (2 different servers, use proxy to not get CORS error)
- When deploying, the `dist` folder built from `client` will be served by server as static files. (1 server). Then just start server and I got a live working site.

Any feedback on the React part would also be welcomed!