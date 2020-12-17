<template>
  <div class=''>
    <h1>NProgress test page</h1>
    <button @click="start()">start!</button>
    <button @click="move(0.1)">10%</button>
    <button @click="move(0.25)">25%</button>
    <button @click="move(0.5)">50%</button>
    <button @click="move(0.75)">75%</button>
    <button @click="move(1)">100%</button>
    <button @click="inc()">inc!</button>
    <button @click="end()">done!</button>
    <button @click="remove()">remove!</button>
  </div>
</template>

<script>
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

export default {
  mounted() {
    console.log(NProgress)
    console.log(NProgress.getPositioningCSS())
    NProgress.configure({

    })
  },
  methods: {
    start() {
      console.log('nprogress start')
      NProgress.start()
      console.log(NProgress)
    },
    end() {
      console.log('nprogress done')
      NProgress.done(true)
      console.log(NProgress)
    },
    move(percent) {
      console.log('nprogress move', percent)
      NProgress.set(percent)
      console.log(NProgress)
    },
    inc() {
      console.log('nprogress inc')
      NProgress.inc()
      console.log(NProgress)
    },
    remove() {
      console.log('nprogress remove')
      NProgress.remove()
      console.log(NProgress)
    }
  }
}
</script>

<style>

</style>
