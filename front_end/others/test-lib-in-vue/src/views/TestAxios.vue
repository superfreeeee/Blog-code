<template>
  <div class="">
    <form>
      <label>username: <input v-model="form.username"></label><br/>
      <label>password: <input v-model="form.password"></label><br/>
      <button @click="login">Login!</button>
      <button @click="reset">reset</button>
      <button @click="check">check</button>
    </form>
    <label>Inactive-Interval: <input v-model="interval"></label><br/>
    <button @click="setInterval">check</button>

  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: '',
        password: ''
      },
      interval: 0
    }
  },
  mounted() {
    console.log('test axios')
    this.hello()
  },
  methods: {
    hello() {
      this.$axios.get('/user/hello').then((res) => {
        console.log('response')
        console.log(res)
        console.log('data')
        console.log(res.data.content)
      })
    },
    login(e) {
      e.preventDefault()
      const loginForm = { ...this.form }
      console.log(loginForm)
      this.$axios.post('/user/login', loginForm).then(res => {
        console.log('response')
        console.log(res)
        console.log('data')
        console.log(res.data.content)
      })
    },
    check(e) {
      e.preventDefault()
      this.$axios.get('/user/check').then(res => {
        console.log('response')
        console.log(res)
        console.log('data')
        console.log(res.data.content)
      })
    },
    setInterval(e) {
      e.preventDefault()
      this.$axios.get('/user/interval', {params: { interval: this.interval }}).then(res => {
        if(res.status === 200) {
          console.log('set interval success')
        } else {
          console.log('set interval fail')
        }
      })
    },
    reset(e) {
      e.preventDefault()
      this.form = {
        username: '',
        password: ''
      }
    }
  }
}
</script>

<style></style>
