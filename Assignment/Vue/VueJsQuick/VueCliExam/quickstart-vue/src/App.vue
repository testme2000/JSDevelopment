<template>
  <div id="app">
    <HelloWorld msg="Welcome to Vue Quickstart!"/>
    <hello-again />
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import HelloAgain from './components/Helloagain.vue'

export default {
  name: 'app',
  components: {
    HelloWorld, HelloAgain
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
