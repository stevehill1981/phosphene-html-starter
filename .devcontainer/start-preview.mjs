import { spawn } from 'node:child_process';
import { request } from 'node:http';
import { realpath } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { defaultRoot, rootId } from './preview.mjs';

const expected = rootId(await realpath(defaultRoot));
function check() {
  return new Promise((accept, reject) => {
    const req = request('http://127.0.0.1:8000/__preview_health', { timeout: 500 }, res => {
      let data = '';
      res.on('data', chunk => {
        data += chunk;
        if (data.length > 2048) req.destroy(new Error('Port 8000 is already in use by another program.'));
      });
      res.on('end', () => {
        try {
          const result = JSON.parse(data);
          if (res.statusCode !== 200 || result.app !== 'phosphene-html-preview' || result.root !== expected) {
            throw new Error('Port 8000 is already in use by another program.');
          }
          accept(true);
        } catch { reject(new Error('Port 8000 is already in use by another program.')); }
      });
    });
    req.on('timeout', () => req.destroy(new Error('Port 8000 did not respond.')));
    req.on('error', error => error.code === 'ECONNREFUSED' ? accept(false) : reject(error));
    req.end();
  });
}
let ownedChild;
try {
  if (!(await check())) {
    const child = spawn(process.execPath, [fileURLToPath(new URL('./preview.mjs', import.meta.url))], {
      detached: true, stdio: 'ignore',
    });
    ownedChild = child;
    let startError;
    child.on('error', error => { startError = error; });
    child.unref();
    let ready = false;
    for (let attempt = 0; attempt < 50; attempt += 1) {
      if (startError) throw startError;
      if (await check()) { ready = true; break; }
      await new Promise(accept => setTimeout(accept, 100));
    }
    if (!ready) throw new Error('Preview did not start. Stop and reopen this codespace, then try again.');
  }
  console.log('Your preview is ready. In Ports, open “My website preview” in the browser. Save your file, then refresh that preview tab.');
} catch (error) {
  if (ownedChild && ownedChild.exitCode === null) ownedChild.kill('SIGTERM');
  console.error(error.message);
  process.exitCode = 1;
}
