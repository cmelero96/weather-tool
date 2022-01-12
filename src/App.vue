<template>
  <SearchBar></SearchBar>
  <br />
  <div>{{ this.current }}</div>
  <br />
  <div v-for="day in forecast" :key="day">
    {{ day }}
  </div>
  <br />
  <div v-for="day in historical" :key="day">
    {{ day }}
  </div>
</template>

<script>
import { getCurrentWeather, getForecast, getWeatherHistory } from './services/apiCall';
import { current, forecast, history } from './assets/mockWeather';

import SearchBar from './components/SearchBar.vue';

export default {
  name: 'App',
  components: { SearchBar },
  data() {
    return {
      current: null,
      forecast: [],
      historical: [],
    };
  },
  async mounted() {
    const coord = { lat: 40.4165, lon: -3.70256 };
    // this.current = await getCurrentWeather(coord);
    // this.forecast = await getForecast(coord);
    // this.historical = await getWeatherHistory(coord);

    this.current = current;
    this.forecast = forecast;
    this.historical = history;
  },
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
