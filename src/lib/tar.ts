import fsp from 'fs/promises';
import path from 'path';

import writer from './write';

const HEADER = 512;
const BLOCK = 512;

/**
 * Create tar file
 * 
 * @see https://www.gnu.org/software/tar/manual/html_node/Standard.html
 */
export default async (dir: string) => {
  const root = path.join(process.cwd(), dir);
  const files = await Promise.all((await fsp.readdir(root, { recursive: true, withFileTypes: true }))
    .map(async file => ({
      file,
      stat: await fsp.stat(path.join(file.parentPath, file.name))
    })));

  const max = files.reduce((acc, cur) => {
    let size = acc + HEADER + BLOCK * Math.trunc(cur.stat.size / BLOCK);
    if (cur.stat.size % BLOCK) size += BLOCK;

    return size;
  }, 0);

  let offset = 0;
  const buffer = new ArrayBuffer(max); // Allocate tar buffer
  const write = writer(buffer, new TextEncoder());

  for (const { file, stat } of files) {
    // Header
    write(path.join(file.parentPath, file.name).replace(root, '').replaceAll(path.sep, '/').slice(1), offset + 0, 100);
    write(stat.mode, offset + 100, 8);
    write(stat.uid, offset + 108, 8);
    write(stat.gid, offset + 116, 8);
    write(stat.size, offset + 124, 12);
    write(Math.trunc(stat.mtime.getTime() / 1000), offset + 136, 12);
    write('        ', offset + 148, 8);
    write(stat.isDirectory() ? 5 : 0, offset + 156, 1);
    write('ustar', offset + 257, 6);
    write('00', offset + 263, 2);

    // Checksum must be calculated last
    const checksum = new Uint8Array(buffer, offset, HEADER).reduce((acc, cur) => acc + cur, 0);
    write(checksum.toString(8), offset + 148, 8);

    offset += HEADER;

    // Body
    if (!stat.isDirectory()) {
      const data = new Uint8Array(buffer, offset, stat.size);
      const raw = await fsp.readFile(path.join(file.parentPath, file.name));

      for (let i = 0; i < stat.size; i += 1) {
        data[i] = raw[i];
      }

      offset += BLOCK * Math.trunc(stat.size / BLOCK);
      if (stat.size % 512) offset += BLOCK;
    }
  }

  return Buffer.from(new Uint8Array(buffer));
};