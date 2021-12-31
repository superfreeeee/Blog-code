<template>
  <input :value="value" @input="$emit('input', $event.target.value)" />
</template>

<script>
export default {
  name: 'CustomComponentInput',
  props: ['value'],
};
</script>

<style></style>
