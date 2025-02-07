#! /usr/bin/env node
import fsp from 'fs/promises';
import path from 'path';

import psize from './dist/package-size.js';

const json = await fsp.readFile(path.resolve(process.cwd(), 'package.json'))
  .then(raw => JSON.parse(raw));

const glob = fsp.glob(json.files);
const files = [];

for await (const file of glob) files.push(file);

psize(...files)
  .then(size => console.log(`[${json.name}]: ${size} bytes (gzip)`));
