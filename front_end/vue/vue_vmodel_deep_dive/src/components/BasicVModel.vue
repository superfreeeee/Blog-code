<template>
  <div>
    <h1>Basic v-model Usage</h1>
    <input type="text" v-model="input" @input="onInput" @change="onChange" />
  </div>
</template>

<script>
export default {
  name: 'BasicVModel',
  data() {
    return {
      input: '',
    };
  },
  methods: {
    onInput(e) {
      console.log(`onInput: e.target.value=${e.target.value}`, e);
    },
    onChange(e) {
      console.log(`onChange: e.target.value=${e.target.value}`, e);
    },
  },
  watch: {
    input(input) {
      console.log(`[watch] input = ${input}`);
    },
  },
};
</script>

<style></style>
