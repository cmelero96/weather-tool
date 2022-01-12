<template>
  <input type="text" ref="input" v-model.lazy="searchTerm" v-debounce="300" />
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
// import { debounce } from 'lodash';

import ALL_CITIES from './assets/history.city.list.json';
const SEARCH_OPTIONS = {
  threshold: 0.35,
  keys: ['city.name'],
};

// TODO: Find why lodash can't be used
function debounce2(func, wait) {
  let timeout;
  return function (...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
}

export default {
  name: 'App',
  data() {
    return {
      current: null,
      forecast: [],
      historical: [],
      fuse: null,
      searchResults: [],
      searchTerm: '',
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

    this.fuse = new Fuse(ALL_CITIES, SEARCH_OPTIONS);
  },
  watch: {
    searchTerm(n) {
      this.displaySuggestions(n);
    },
  },
  methods: {
    update() {
      console.log('hola');
      debounce2(function (e) {
        console.log(e.target.value);
      }, 300);
    },
    displaySuggestions() {
      const input = this.$refs.input.value;

      const search = this.fuse
        .search(input)
        .slice(0, 10)
        .map((city) => {
          let id = city.item.id;
          if (typeof id !== 'number') {
            id = Number(id['$numberLong']);
          }

          return {
            id,
            name: city.item.city.name,
            countryCode: city.item.city.country,
          };
        });

      console.log(search);
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
