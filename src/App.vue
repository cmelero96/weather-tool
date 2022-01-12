<template>
  <SearchBar></SearchBar>
  <br />
  <div>{{ weather.current }}</div>
  <br />
  <div v-for="day in weather.forecast" :key="day">
    {{ day }}
  </div>
  <br />
  <div v-for="day in weather.historical" :key="day">
    {{ day }}
  </div>
</template>

<script>
import { getCurrentWeather, getForecast, getWeatherHistory } from './services/apiCall';
import { mockCurrent, mockForecast, mockHistorical } from './assets/mockWeather';
import { ref, onMounted } from 'vue';

import SearchBar from './components/SearchBar.vue';

export default {
  components: { SearchBar },
  setup() {
    const weather = ref({});
    const coord = ref({});

    onMounted(async () => {
      coord.value = { lat: 40.4165, lon: -3.70256 };
      weather.value = {
        current: mockCurrent,
        forecast: mockForecast,
        historical: mockHistorical,
      };
      // weather.value = {
      //   current: await getCurrentWeather(coord.value),
      //   forecast: await getForecast(coord.value),
      //   historical: await getWeatherHistory(coord.value),
      // };
    });

    return { coord, weather };
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
