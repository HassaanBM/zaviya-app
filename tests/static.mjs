/* Static checks on dist/: every internal link and asset resolves, canonical/title/description exist, sitemap lists real pages. */
import fs from "node:fs"; import path from "node:path";
const dir = path.resolve("dist"); let bad = 0, pages = 0, links = 0;
const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]);
const exists = (u) => { const p = u.split("#")[0].split("?")[0]; if (!p) return true; let f = path.join(dir, decodeURIComponent(p)); return fs.existsSync(f) && (!fs.statSync(f).isDirectory() || fs.existsSync(path.join(f, "index.html"))); };
for (const f of walk(dir).filter((x) => x.endsWith(".html"))) { pages++; const h = fs.readFileSync(f, "utf8"); const rel = path.relative(dir, f);
  if (rel !== "404.html") { if (!/<title>[^<]{5,}/.test(h)) { console.log("no title", rel); bad++; } if (!/name="description" content="[^"]{20,}/.test(h)) { console.log("no description", rel); bad++; } if (!/rel="canonical"/.test(h)) { console.log("no canonical", rel); bad++; } }
  if ((h.match(/<h1[ >]/g) || []).length !== 1) { console.log("h1 count", rel); bad++; }
  for (const m of h.matchAll(/(?:href|src)="(\/[^"]*)"/g)) { links++; if (!exists(m[1])) { console.log("broken", rel, m[1]); bad++; } } }
const sm = fs.readFileSync(path.join(dir, "sitemap.xml"), "utf8"); for (const m of sm.matchAll(/<loc>https?:\/\/[^/]+(\/[^<]*)<\/loc>/g)) if (!exists(m[1])) { console.log("sitemap miss", m[1]); bad++; }
console.log(`${pages} pages, ${links} internal links checked, ${bad} problems`); process.exit(bad ? 1 : 0);
