<template>
  <div class="main-header">
    <header><h1>Weather Forecast</h1></header>
    <SearchBar @selectCity="updateCity" ref="searchBar"></SearchBar>
  </div>
  <div class="main-container">
    <CurrentWeather
      class="current-wrapper"
      :city="city"
      :weather="weather.current"
    ></CurrentWeather>
    <Map class="map-wrapper" :city="city" @updateLocation="updateCity"></Map>
  </div>
  <WeatherForecast class="forecast-wrapper" :weather="weather.forecast"></WeatherForecast>
  <WeatherHistory class="history-wrapper" :weather="weather.historical"></WeatherHistory>
</template>

<script>
import { getCurrentWeather, getForecast, getWeatherHistory } from './services/weatherServices';
import {
  promiseMock,
  mockCityData,
  mockCurrent,
  mockForecast,
  mockHistorical,
} from './utils/mockData';
import { ref, onMounted, watch } from 'vue';

import SearchBar from './components/SearchBar.vue';
import CurrentWeather from './components/CurrentWeather.vue';
import WeatherForecast from './components/WeatherForecast.vue';
import WeatherHistory from './components/WeatherHistory.vue';
import Map from './components/Map.vue';

export default {
  components: { SearchBar, CurrentWeather, WeatherForecast, WeatherHistory, Map },
  setup() {
    const isLoading = ref(true);
    const city = ref({});
    const weather = ref({});
    const searchBar = ref();

    const updateCity = (selectedCity) => {
      city.value = selectedCity;
      searchBar.value.searchTerm = selectedCity.name;
    };

    watch(city, (newCity) => {
      updateWeather(newCity.coord);
    });

    onMounted(() => {
      const initialData = {};

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((data) => {
          city.value = {
            id: -1,
            name: 'Your current location',
            countryCode: '',
            coord: { lat: data.coords.latitude, lon: data.coords.longitude },
          };
        });
      } else {
        city.value = mockCityData;
      }
    });

    // Mocked functionality
    const updateWeather = async () => {
      promiseMock(mockCurrent, 1000).then((data) => (weather.value.current = data));
      promiseMock(mockForecast, 4000).then((data) => (weather.value.forecast = data));
      promiseMock(mockHistorical, 2000).then((data) => (weather.value.historical = data));
    };

    // TODO: Uncomment this and remove mocked functionality above
    // const updateWeather = async (coordinates) => {
    //  getCurrentWeather(coordinates).then((data) => (weather.value.current = data));
    //  getForecast(coordinates).then((data) => (weather.value.forecast = data));
    //  getWeatherHistory(coordinates).then((data) => (weather.value.historical = data));
    // };

    return { city, weather, updateCity, searchBar, isLoading };
  },
};
</script>

<style lang="scss">
@import 'utils/variables';

html,
body {
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  box-sizing: border-box;
  min-height: 100vh;
  background-color: $background-color-light;
  color: $text-color;
}

.main-header {
  position: sticky;
  height: 7rem;
  top: -3.5rem;
  z-index: 2;
  background-color: $background-color;

  display: flex;
  flex-direction: column;
  justify-content: space-around;

  border-bottom: 1px solid;

  h1 {
    margin: 0;
  }
}

.main-container {
  display: flex;
  justify-content: space-around;
  padding: 2rem 0 1rem 0;

  .current-wrapper {
    flex-basis: 30%;
  }

  .map-wrapper {
    align-self: stretch;
    flex-basis: 50%;
  }
}

.forecast-wrapper,
.history-wrapper {
  padding-bottom: 1rem;
}
</style>
