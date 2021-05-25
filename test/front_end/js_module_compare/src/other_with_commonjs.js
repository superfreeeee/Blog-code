let a = 1

const fa = () => {
  console.log(`a = ${a}`)
}

let oa = { a: 3 }

const foa = () => {
  console.log('oa = ', oa)
}

module.exports = {
  a,
  fa,
  oa,
  foa
}
