<template>
  <input type="text" ref="input" />
  <button @click="search">Search</button>
  <div v-for="item in searchResults" :key="item">
    {{ item }}
  </div>
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
import Fuse from 'fuse.js';

import ALL_CITIES from './assets/history.city.list.json';
const SEARCH_OPTIONS = {
  threshold: 0.35,
  keys: ['city.name'],
};

export default {
  name: 'App',
  data() {
    return {
      current: null,
      forecast: [],
      historical: [],
      fuse: null,
      searchResults: [],
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

    // this.fuse = new Fuse(ALL_CITIES, SEARCH_OPTIONS);
  },
  methods: {
    search() {
      const input = this.$refs.input.value;

      const search = this.fuse
        .search(input)
        .slice(0, 10)
        .map((city) => {
          let id = city.item.id;
          if (typeof id !== 'number') {
            id = id['$numberLong'];
          }
          console.log(id);

          return {
            id,
            name: city.item.city.name,
            countryCode: city.item.city.country,
          };
        });

      this.searchResults = search;
    },
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
