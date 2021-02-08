import axios from './axios.js'

const request = (name) => {
  axios.get(name).then((res) => {
    console.log(res)
  })
}

document.getElementById('btn-test1').addEventListener('click', (e) => {
  console.log('click test1')
  request('/test1')
})
document.getElementById('btn-test2').addEventListener('click', (e) => {
  console.log('click test2')
  request('/test2')
})
