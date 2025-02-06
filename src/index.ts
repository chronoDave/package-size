import tar from './lib/tar';
import gzip from './lib/gzip';

export default async (dir: string) => tar(dir)
  .then(gzip)
  .then(buffer => buffer.byteLength);
