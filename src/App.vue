<template>
  <SearchBar @selectCity="updateCity"></SearchBar>
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
import { ref, onMounted, watch } from 'vue';

import SearchBar from './components/SearchBar.vue';
import CurrentWeather from './components/CurrentWeather.vue';
import WeatherForecast from './components/WeatherForecast.vue';
import WeatherHistory from './components/WeatherHistory.vue';

export default {
  components: { SearchBar, CurrentWeather, WeatherForecast, WeatherHistory },
  setup() {
    const city = ref({});
    const weather = ref({});

    const updateCity = (selectedCity) => (city.value = selectedCity);

    watch(city, (newCity) => {
      updateWeather(newCity.coord);
    });

    // Mocked functionality
    onMounted(() => (city.value = mockCityData));
    const updateWeather = () => {
      weather.value = {
        current: mockCurrent,
        forecast: mockForecast,
        historical: mockHistorical,
      };
    };

    // TODO: Uncomment this and remove mocked functionality above
    // const updateWeather = async (coordinates) => {
    //   weather.value = {
    //     current: await getCurrentWeather(coordinates),
    //     forecast: await getForecast(coordinates),
    //     historical: await getWeatherHistory(coordinates),
    //   };
    // };

    return { city, weather, updateCity };
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
