const sum = (times) => {
  let ans = 0;
  for (let k = 0; k < times; k++) {
    for (let j = 0; j < times; j++) {
      for (let i = 0; i < times; i++) {
        ans += i;
      }
    }
  }
  return ans;
};

const fac = (n) => (n <= 2 ? 1 : fac(n - 1) + fac(n - 2));

module.exports = {
  sumInJs: sum,
  facInJs: fac,
};
