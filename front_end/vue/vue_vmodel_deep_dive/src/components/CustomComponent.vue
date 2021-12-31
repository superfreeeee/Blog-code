<template>
  <div>
    <h1>v-model on Custom Component</h1>
    <CustomComponentInput v-model="input" @input="onInput" />
  </div>
</template>

<script>
import CustomComponentInput from './CustomComponentInput.vue';

export default {
  components: { CustomComponentInput },
  data() {
    return {
      input: 'Hello',
    };
  },
  methods: {
    onInput(input) {
      console.log(`onInput: input = ${input}`);
    },
  },
  watch: {
    input(input) {
      console.log(`[watch] input = ${input}`);
    },
  },
  mounted() {
    console.log(`[mounted] input = ${this.input}`);
  },
};
</script>

<style></style>
