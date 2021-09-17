import { Log } from './other';

export const repeat = (s: string = '', n: number = 0): string => {
  // console.log(`[repeat] s=${s}, n=${n}`);
  return s.repeat(n);
};

export { Log };
