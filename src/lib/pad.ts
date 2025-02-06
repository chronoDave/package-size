export default (x: string | number, n: number): string =>
  x.toString(8).padStart(n, '0');
