import type { Stats } from 'fs';

import fsp from 'fs/promises';
import path from 'path';

export type File = {
  file: string;
  stat: Stats;
};

const read = async (file: string): Promise<File[]> => {
  const root = path.join(process.cwd(), file);
  const stat = await fsp.lstat(root);

  if (stat.isDirectory()) {
    const files = await Promise.all(await fsp.readdir(root, { recursive: true }));
    
    return Promise
      .all(files.map(async x => read(path.join(file, x))))
      .then(x => x.flat());
  } else {
    return [{ file, stat }];
  }
};

export default read;
