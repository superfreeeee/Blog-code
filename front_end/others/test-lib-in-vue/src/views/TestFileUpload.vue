<template>
  <div class="">
    <h1>File Upload test page</h1>
    <div>
      <h2>Test 1</h2>
      <input type="file" @change="upload" ref="file" />
      <button @click="show">show</button>
    </div>

    <div>
      <h2>Test 2</h2>
      <button @click="getPaths">get paths</button>
      <!-- <span v-for="path in paths" :key="path">{{path}}<br/></span> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fileForm: null,
      paths: null
    }
  },
  methods: {
    upload() {
      const file = this.$refs.file.files[0]
      const fileForm = new FormData()
      fileForm.append('file', file)
      console.log(fileForm.get('file'))
      this.fileForm = fileForm
    },
    show() {
      console.log(this.fileForm)
      this.$axios
        .post('/img/upload', this.fileForm, {
          headers: {
            'Content-Type':
              'multipart/form-data;boundary=' + new Date().getTime()
            // "Content-Type": "multipart/form-data"
          }
        })
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          console.error('upload fail')
        })
    },
    getPaths() {
      this.$axios.get('/img/url').then((res) => {
        console.log(res)
        const content = res.data.content
        console.log(content)
        this.paths = content
      })
    }
  },
  computed: {

  }
}
</script>

<style></style>
