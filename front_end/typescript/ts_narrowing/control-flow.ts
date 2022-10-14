function predict(limit: number) {
  let n: string | number | boolean;

  n = 123;
  if (n > limit) {
    n = `more than ${limit}`;
  } else if (n < limit) {
    n = false;
  } else {
    n = 'others';
  }

  return n; // let n: string | false
}
