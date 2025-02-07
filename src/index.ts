import gzip from './lib/gzip';
import tar from './lib/tar';

export { tar, gzip };

/** Return size of `.tgz` in bytes */
export default async (...files: string[]): Promise<number> => tar(...files)
  .then(gzip)
  .then(buffer => buffer.byteLength);
