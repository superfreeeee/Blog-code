<template>
<div id="app">
  <header>
    <button :class="option.page === page ? 'selected':'non-selected'" class="header-btn" v-for="option in options" :key="option.name" @click="changePage(option.page)">
      {{ option.name }}
    </button>
  </header>
  <HelloWorld v-if="page === 'hello'" msg="Welcome to Your Vue.js App" />
  <TestNProgress v-if="page === 'test-nprogress'"></TestNProgress>
  <TestClipboard v-if="page === 'test-clipboard'"></TestClipboard>
  <TestGitGraph v-if="page === 'test-gitgraph'"></TestGitGraph>
  <TestAxios v-if="page === 'test-axios'"></TestAxios>
  <TestFileUpload v-if="page === 'test-file-upload'"></TestFileUpload>
</div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import TestNProgress from './views/TestNProgress'
import TestClipboard from './views/TestClipboard'
import TestGitGraph from './views/TestGitGraph'
import TestAxios from './views/TestAxios'
import TestFileUpload from './views/TestFileUpload'

export default {
  name: 'App',
  components: {
    HelloWorld,
    TestNProgress,
    TestClipboard,
    TestGitGraph,
    TestAxios,
    TestFileUpload
  },
  data() {
    const options = [{
        name: 'Home',
        page: 'hello'
      },
      {
        name: 'NProgress',
        page: 'test-nprogress'
      },
      {
        name: 'clipboard',
        page: 'test-clipboard'
      },
      {
        name: 'GitGraph',
        page: 'test-gitgraph'
      },
      {
        name: 'Axios',
        page: 'test-axios'
      },
      {
        name: 'FileUpload',
        page: 'test-file-upload'
      },
    ]
    return {
      page: 'hello',
      options
    }
  },
  methods: {
    changePage(page) {
      this.page = page
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
  margin-top: 60px;
}

.non-selected {
  background-color: #ffffff;
}

.selected {
  background-color: rgb(238, 238, 238);
}

.header-btn {
  padding: 10px;
  border-radius: 20px;
}

.header-btn:focus {
  outline: none;
}

.header-btn+.header-btn {
  margin-left: 10px;
}
</style>
