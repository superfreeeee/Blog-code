<template>
  <div>
    <h1>Unbind Custom Component</h1>
    <CustomComponentInput ref="input_ref" :value="input" @input="onInput" />
  </div>
</template>

<script>
import CustomComponentInput from './CustomComponentInput.vue';
export default {
  components: { CustomComponentInput },
  data() {
    return {
      input: 'Init value',
    };
  },
  methods: {
    onInput(input) {
      this.input = input;

      console.group('onInput');
      console.log(`onInput: input = ${input}`);
      console.log(`this.input = ${this.input}`);
      console.log(`value = ${this.$refs.input_ref.value}`);
      this.$nextTick(() => {
        console.log(`[$nextTick] value = ${this.$refs.input_ref.value}`);
        console.groupEnd();
      });
    },
  },
};
</script>

<style></style>
