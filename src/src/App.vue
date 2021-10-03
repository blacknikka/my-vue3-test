<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <ScoreLists></ScoreLists>>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import ScoreLists from './components/Score/ScoreLists.vue'

export default {
  name: 'App',
  components: {
    ScoreLists
  }
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
