<template>
  <div class="">
    <h1>clipboard.js test page</h1>
    <div class="division">
      <input id="input-1" value="hello world" />
      <button id="cp1" data-clipboard-target="#input-1">Copy!</button>
    </div>
    <div class="division">
      <input id="input-2" value="hello world" />
      <button
        id="cp2"
        data-clipboard-action="cut"
        data-clipboard-target="#input-2"
      >
        Cut!
      </button>
    </div>
    <div class="division">
      <button id="cp3" data-clipboard-text="text: hello world">copy!</button>
    </div>
    <div class="division">
      <input id="input-4" value="hello world" />
      <button id="cp4">Cut!</button>
    </div>
  </div>
</template>

<script>
import ClipboardJS from 'clipboard'

export default {
  mounted() {
    const _cp1 = new ClipboardJS('#cp1')
    const _cp2 = new ClipboardJS('#cp2')
    const _cp3 = new ClipboardJS('#cp3')
    _cp1.on('success', function(trigger) {
      console.log(trigger)
    })
    const _cp4 = new ClipboardJS('#cp4', {
      action: function(trigger) { return 'cut'},
      target: t => {
        return document.querySelector('#input-4')
      }
    })
  }
}
</script>

<style>
.division {
  margin-bottom: 20px;
}
</style>
