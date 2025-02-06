#! /usr/bin/env node
import size from './dist/package-size.js';

size(process.argv.slice(2)[0])
  .then(n => console.log(`${n} bytes`));
