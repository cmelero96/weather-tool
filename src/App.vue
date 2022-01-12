<template>
  <SearchBar></SearchBar>
  <br />
  <CurrentWeather :city="city" :weather="weather.current"></CurrentWeather>

  <br />
  <WeatherForecast :weather="weather.forecast"></WeatherForecast>

  <br />
  <WeatherHistory :weather="weather.historical"></WeatherHistory>

  <br />
  <br />
</template>

<script>
import { getCurrentWeather, getForecast, getWeatherHistory } from './services/apiCall';
import { mockCityData, mockCurrent, mockForecast, mockHistorical } from './assets/mockData';
import { ref, onMounted, onUpdated } from 'vue';

import SearchBar from './components/SearchBar.vue';
import CurrentWeather from './components/CurrentWeather.vue';
import WeatherForecast from './components/WeatherForecast.vue';
import WeatherHistory from './components/WeatherHistory.vue';

export default {
  components: { SearchBar, CurrentWeather, WeatherForecast, WeatherHistory },
  setup() {
    const city = ref({});
    const weather = ref({});

    onMounted(async () => {
      city.value = mockCityData;
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

    return { city, weather };
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
