<template>
  <div id="app">
    <SearchPlanet/>
  </div>
</template>

<script>
import SearchPlanet from './components/PlanetSearch.vue'

export default {
  name: 'app',
  components: {
    SearchPlanet
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
