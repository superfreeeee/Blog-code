const base = 123

const f = async function() {
  const res = await Promise.reject(base).catch(err => 123)
  console.log('res in f')
  console.log(res)
  return res + base
}

f().then(res => {
  console.log('res in then')
  console.log(res)
}).catch(err => {
  console.log('err in catch')
  console.log(err)
})

// const wait = (step) => {
//   const end = new Date().getTime() + step
//   while(true) {
//     const cur = new Date().getTime()
//     if(cur >= end) {
//       return
//     }
//   }
// }

// const p = new Promise(function(s, r) {
//   wait(3)
//   s(123)
// }).then(res => {
//   console.log(res)
// })

// console.log(p)

