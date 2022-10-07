interface Options {
  num?: number;
  str?: string;
}

const opt0: Options = {};
const opt1: Options = { num: 1 };
const opt2: Options = { str: 'string' };
const opt3: Required<Options> = { num: 1, str: 'string' };
// Required<Options> = {
//   num: number;
//   str: string;
// }
