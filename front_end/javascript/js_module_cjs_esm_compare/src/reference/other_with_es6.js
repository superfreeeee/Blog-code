export let b = 2

export const fb = () => {
  console.log(`origin b = ${b}`)
}

export const setb = () => {
  console.log('\n>>> invoke setb b *= 10\n'), (b *= 10)
}

export const ob = { b: 4 }

export const fob = () => {
  console.log('origin ob = ', ob)
}
