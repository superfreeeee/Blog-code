import { test1API, test2API } from './api/test.js'

document.getElementById('btn-test1').addEventListener('click', (e) => {
  console.log('click test1')
  test1API().then(res => {
    console.log(res)
  })
})
document.getElementById('btn-test2').addEventListener('click', (e) => {
  console.log('click test2')
  test2API().then(res => {
    console.log(res)
  })
})
