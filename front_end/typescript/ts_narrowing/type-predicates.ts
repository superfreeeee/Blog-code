(function (x: number | string) {
  function wrongPredict(numOrStr: number | string): boolean {
    return typeof numOrStr === 'number';
  }

  if (wrongPredict(x)) {
    // x.toFixed(); // (parameter) x: string | number
  }

  function rightPredict(numOrStr: number | string): numOrStr is number {
    return typeof numOrStr === 'number';
  }
  if (rightPredict(x)) {
    x; // (parameter) x: number
  }
});
