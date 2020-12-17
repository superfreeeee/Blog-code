import Vue from 'vue'
import App from './App.vue'

// element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)

// axios
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:8080'
// axios.defaults.withCredentials = true
axios.interceptors.request.use(function(config) {
  console.log('config')
  console.log(config)
  return config
}, function(err) {
  console.log(err)
})

axios.interceptors.response.use(function(res) {
  // console.log(res)
  return res
}, function(err) {
  console.log(err)
})

Vue.prototype.$axios = axios

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

