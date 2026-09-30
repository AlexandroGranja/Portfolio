import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";

const root = path.resolve("out");
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
assert.ok(existsSync(root), "Execute npm run build antes de verificar o export.");
function walk(dir) {
  return readdirSync(dir).flatMap(name => {
    const file = path.join(dir, name);
    return statSync(file).isDirectory() ? walk(file) : [file];
  });
}
const pages = walk(root).filter(file => file.endsWith(".html"));
for (const page of pages) {
  const html = readFileSync(page, "utf8");
  assert.equal((html.match(/<h1[\s>]/g) || []).length, 1, `${page}: deve ter um h1`);
  assert.match(html, /<html[^>]*lang="pt-BR"/);
  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    let url = match[1];
    if (!url.startsWith("/") || url.startsWith("//")) continue;
    if (basePath) {
      assert.ok(url === basePath || url.startsWith(basePath + "/"), `Sem basePath: ${url}`);
      url = url.slice(basePath.length);
    }
    const file = path.join(root, decodeURIComponent(url.split(/[?#]/)[0] || "/"));
    assert.ok(existsSync(file) || existsSync(file + ".html"), `${page}: link/asset ausente ${url}`);
  }
}
for (const page of ["index.html", "sobre/index.html", "contato/index.html", "projetos/index.html"]) {
  assert.ok(existsSync(path.join(root, page)), `Página ausente: ${page}`);
}
console.log(`${pages.length} páginas exportadas: títulos principais, idioma, links e assets locais válidos.`);
