import axios from 'axios'

const CancelToken = axios.CancelToken

const instance = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 10000,
})

const requests = []

const cancelRequest = (config) => {
  const target = `${config.url}&${config.method}`
  for (let idx in requests) {
    if (requests[idx].umet === target) {
      requests[idx].cancel(`撤销请求: ${target}`)
      requests.splice(idx, 1)
    }
  }
}

instance.interceptors.request.use(
  (config) => {
    config.headers = {
      'content-type': 'application/json; charset=utf-8',
    }
    cancelRequest(config)
    config.cancelToken = new CancelToken((c) => {
      requests.push({ umet: `${config.url}&${config.method}`, cancel: c })
    })
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  (response) => {
    cancelRequest(response.config)
    return response.data
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default instance
