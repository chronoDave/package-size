import test from 'tape';
import fsp from 'fs/promises';
import path from 'path';

import psize from './';

test('[package-size] returns package size within block margin', async t => {
  const { version } = await fsp.readFile(path.join(process.cwd(), 'package.json'), 'utf-8')
    .then(raw => JSON.parse(raw));
  const tgz = await fsp.readFile(path.join(process.cwd(), `chronocide-package-size-${version}.tgz`));

  const size = await psize(
    'LICENSE',
    'dist',
    'package.json',
    'README.md'
  );

  const diff = Math.abs(tgz.byteLength - size);

  t.true(diff <= 512, 'difference is smaller than block');

  t.end();
});

