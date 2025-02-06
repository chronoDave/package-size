import { build } from 'esbuild';
import path from 'path';
import fsp from 'fs/promises';

const outdir = path.join(process.cwd(), 'build');

await fsp.rm(outdir, { recursive: true, force: true });

build({
  entryPoints: ['src/**/*.spec.ts'],
  outdir,
  bundle: true,
  packages: 'external',
  platform: 'node',
  format: 'esm'
});
