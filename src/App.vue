<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
/*
const defaultItem = () => {
  return {
      key: util.makeKey(), // 동일 item 검증
      subject: '',
      text : '',
      status : 'doing', // doing, complete
      expireDate : null,
      registDate : new Date().format
  }
}
*/

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  mounted() {
    this.$store.dispatch("fetchItems", []);
  },
}
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
