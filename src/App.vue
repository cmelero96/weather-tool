<template>
  <input type="text" />
  <div>{{ this.current }}</div>
  <div>{{ this.past }}</div>
  <div>{{ this.future }}</div>
</template>

<script>
// import { getWeatherData } from './services/apiCall';
import fakeWeatherObject from './assets/fakeWeatherObject';

export default {
  name: 'App',
  data() {
    return {
      current: null,
      past: null,
      future: null,
    };
  },
  async mounted() {
    // this.current = await getWeatherData('madrid');
    this.current = fakeWeatherObject;
  },
  methods: {},
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
