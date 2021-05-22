const f = () => {
  console.log('g', g)
  g()
}

const g = () => {
  console.log('invoke g')
}

f()