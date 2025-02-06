import type { TextEncoder } from 'node:util';

import pad from './pad';

export default (buffer: ArrayBuffer, encoder: TextEncoder) =>
  (x: string | number, offset: number, size: number) => {
    const view = new Uint8Array(buffer, offset, size);
    const { written } = encoder.encodeInto(
      // Numeric values are encoded in octal numbers using ASCII digits, with leading zeroes. For historical reasons, a final NUL or space character should also be used.
      typeof x === 'number' ? pad(x, size - 1) : x,
      view
    );

    for (let i = written; i < size; i += 1) view[i] = 0; // 0 padding
  };
