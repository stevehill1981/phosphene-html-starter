import { createServer } from 'node:http';
import { readFile, realpath, stat } from 'node:fs/promises';
import { extname, join, resolve, sep } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createHash } from 'node:crypto';

const types = new Map([
  ['.html', 'text/html; charset=utf-8'], ['.css', 'text/css; charset=utf-8'],
  ['.js', 'text/javascript; charset=utf-8'], ['.json', 'application/json'],
  ['.png', 'image/png'], ['.jpg', 'image/jpeg'], ['.jpeg', 'image/jpeg'],
  ['.gif', 'image/gif'], ['.webp', 'image/webp'], ['.svg', 'image/svg+xml'],
  ['.ico', 'image/x-icon'], ['.woff2', 'font/woff2'], ['.txt', 'text/plain; charset=utf-8'],
]);
export const defaultRoot = fileURLToPath(new URL('../', import.meta.url));
export const rootId = root => createHash('sha256').update(resolve(root)).digest('hex');

export async function createPreviewServer({ root = defaultRoot, port = 8000, host = '0.0.0.0' } = {}) {
  const canonical = await realpath(root);
  const server = createServer(async (request, response) => {
    response.setHeader('Cache-Control', 'no-store');
    response.setHeader('X-Content-Type-Options', 'nosniff');
    const reply = (status, body) => {
      response.writeHead(status, { 'Content-Type': 'text/plain; charset=utf-8' });
      response.end(request.method === 'HEAD' ? undefined : body);
    };
    if (!['GET', 'HEAD'].includes(request.method)) {
      response.setHeader('Allow', 'GET, HEAD');
      return reply(405, 'Use GET or HEAD.');
    }
    if (request.url === '/__preview_health') {
      response.writeHead(200, { 'Content-Type': 'application/json' });
      return response.end(request.method === 'HEAD' ? undefined : JSON.stringify({
        app: 'phosphene-html-preview', root: rootId(canonical), pid: process.pid,
      }));
    }
    let pathname;
    try { pathname = decodeURIComponent(request.url.split('?')[0]); }
    catch { return reply(400, 'Invalid address.'); }
    if (!pathname.startsWith('/') || pathname.includes('\\') || pathname.includes('\0') ||
        pathname.split('/').some(part => part.startsWith('.'))) return reply(404, 'Page not found.');
    try {
      let target = join(canonical, pathname);
      if ((await stat(target)).isDirectory()) target = join(target, 'index.html');
      target = await realpath(target);
      if (!target.startsWith(canonical + sep) || !types.has(extname(target).toLowerCase())) {
        return reply(404, 'Page not found.');
      }
      if (!(await stat(target)).isFile()) return reply(404, 'Page not found.');
      const data = await readFile(target);
      response.writeHead(200, { 'Content-Type': types.get(extname(target).toLowerCase()), 'Content-Length': data.length });
      response.end(request.method === 'HEAD' ? undefined : data);
    } catch (error) {
      if (['ENOENT', 'ENOTDIR', 'EACCES', 'EISDIR', 'ELOOP'].includes(error.code)) return reply(404, 'Page not found.');
      reply(500, 'The preview could not read this file.');
    }
  });
  await new Promise((accept, reject) => {
    server.once('error', reject);
    server.listen(port, host, () => { server.removeListener('error', reject); accept(); });
  });
  return server;
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  try { await createPreviewServer(); }
  catch (error) { console.error(`Preview could not start: ${error.message}`); process.exitCode = 1; }
}
