import axios from './axios.js'

const prefix = '/test'

function queryParamToStr(obj) {
  const params = []
  for (let prop in obj) {
    params.push(`${prop}=${obj[prop]}`)
  }
  return params.join('&')
}

export function test1API(queryParam) {
  const queryStr = queryParamToStr(queryParam)
  return axios({
    url: `${prefix}/1?${queryStr}`,
    method: 'GET',
  })
}

export function test2API(queryParam) {
  const queryStr = queryParamToStr(queryParam)
  return axios({
    url: `${prefix}/2?${queryStr}`,
    method: 'GET',
  })
}
