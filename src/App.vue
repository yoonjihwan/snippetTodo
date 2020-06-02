<template>
    <div id="app">
        <Todo />
    </div>
</template>

<script>

export default {
  name: 'App',
  components: {
    Todo: () => import('./components/todo')
  },
  mounted() {
    this.$store.dispatch("initItems");
    this.$eventHub.$on("SHOW_MESSAGE", this.showMessage);
  },
  methods: {
    showMessage(message, type) {
      alert(type + " : " + message)
    }
  }
}
</script>

<style>
body {
  background-color: #1b1b1b;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
