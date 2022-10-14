function compareStrs(a: string | boolean, b: string | number) {
  if (a === b) {
    a.toLowerCase(); // a: string
    b.toLowerCase(); // b: string
  } else {
    a;
    b;
  }
}

function count(num: number | null | undefined) {
  if (num !== undefined) {
    num; // num: number | null
  }
  if (num !== null) {
    num; // num: number | undefined
  }

  if (num != null) {
    num; // num: number
  }
}
