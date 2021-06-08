let a = 1

const fa = () => {
  console.log(`origin a = ${a}`)
}

let oa = { a: 3 }

const foa = () => {
  console.log('origin oa = ', oa)
}

module.exports = {
  a,
  fa,
  oa,
  foa,
}
