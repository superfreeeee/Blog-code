<template>
  <div>
    <h3>A.vue</h3>
    <input v-for="item in arr" :key="item.id" v-model="item.val" />
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'A',
  computed: {
    ...mapState(['arr']),
  },
}
</script>
