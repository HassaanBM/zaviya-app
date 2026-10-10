/* Tiny static server for local checks: node scripts/serve.mjs <dir> <port>. Serves /x/ as /x/index.html and 404.html for misses. */
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
const dir = path.resolve(process.argv[2] || "dist"), port = +(process.argv[3] || 8080);
const types = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".svg": "image/svg+xml", ".woff2": "font/woff2", ".xml": "application/xml", ".txt": "text/plain" };
http.createServer((req, res) => {
  let p = decodeURIComponent(new URL(req.url, "http://x").pathname);
  let f = path.join(dir, p); if (!f.startsWith(dir)) { res.writeHead(403).end(); return; }
  if (fs.existsSync(f) && fs.statSync(f).isDirectory()) f = path.join(f, "index.html");
  if (!fs.existsSync(f)) { res.writeHead(404, { "Content-Type": types[".html"] }).end(fs.readFileSync(path.join(dir, "404.html"))); return; }
  res.writeHead(200, { "Content-Type": types[path.extname(f)] || "application/octet-stream" }).end(fs.readFileSync(f));
}).listen(port, () => console.log(`http://localhost:${port}`));
