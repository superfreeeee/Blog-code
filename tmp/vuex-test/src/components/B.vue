<template>
  <div>
    <h3>B.vue</h3>
    <div v-for="item in arr" :key="item.id">{{ item.val }}</div>
    <div>sum = {{ sum }}</div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'B',
  computed: {
    ...mapState(['arr']),
    ...mapGetters(['sum']),
  },
}
</script>
