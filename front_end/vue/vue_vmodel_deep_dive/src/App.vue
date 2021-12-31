<template>
  <div id="app">
    <!-- <BasicVModel /> -->
    <!-- <CustomComponent /> -->
    <UnbindCustomComponent />
  </div>
</template>

<script>
import BasicVModel from './components/BasicVModel.vue';
import CustomComponent from './components/CustomComponent.vue';
import UnbindCustomComponent from './components/UnbindCustomComponent.vue';
export default {
  name: 'App',
  components: { BasicVModel, CustomComponent, UnbindCustomComponent },
};
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
</style>
