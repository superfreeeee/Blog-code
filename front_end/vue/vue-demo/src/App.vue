<template>
  <div id="app">
    <div id="nav">Hi Vue</div>
    <img alt="Vue logo" src="./assets/logo.png">
    <div>
      {{ userInfo }}
    </div>
    <div>
      <button @click="setUserInfo">Click!</button>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    userInfo() {
      return this.$store.state.userInfo
    }
  },
  methods: {
    setUserInfo() {
      this.$store.commit('setUserInfo', {
        id: 123,
        name: 456,
        newProp: 789
      })
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
