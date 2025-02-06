import zlib from 'zlib';

export default async (buffer: Buffer) =>
  new Promise<Buffer>((resolve, reject) =>
    zlib.deflate(buffer, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    }));
