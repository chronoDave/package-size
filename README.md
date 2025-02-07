<div align="center">
  <h1>@chronocide/package-size</h1>
  <p>Tiny package size calculator</p>
  <a href="/LICENSE">
    <img alt="License AGPLv3" src="https://img.shields.io/badge/license-AGPLv3-blue.svg" />
  </a>
  <a href="https://www.npmjs.com/package/@chronocide/package-size">
    <img alt="NPM" src="https://img.shields.io/npm/v/@chronocide/spider?label=npm">
  </a>
	<img alt="1.56KB" src="https://img.shields.io/badge/gzip-1.56KB-g">
</div>

## Install

Install using [npm](npmjs.org):

```sh
npm i @chronocide/package-size
```

## Usage

```SH
.\node_modules\@chronocide\package-size
```

### API

```TS
import psize from '@chronocide/package-size';

const size = await psize('dist');
console.log(size); // 1875
```

```TS
import { tar, gzip } from '@chronocide/package-size';

const file = await tar('dist'); // <Buffer> (.tar)
const zip = await gzip(file); // <Buffer> (.tgz)

console.log(zip.byteLength) // 1875
```

See [`/scripts/size.js`](/scripts/size.js) for an example that automatically creates a size badge.

### Why?

I couldn't find an package / online tool that was both small and gave me the size of **only**  code. npm bundles `package.json`, `README`, `LICENSE`, `main` and `bin`, which are irrelevant when trying to determine the size of packages. `@chronocide/package-size` tries to solve that by only calculating the size of files defined in [`files`](https://docs.npmjs.com/cli/v10/configuring-npm/package-json?v=true#files).
