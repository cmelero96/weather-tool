<template>
  <div class="main-header">
    <header><h1>Weather Forecast</h1></header>
    <SearchBar @selectCity="updateCity" ref="searchBar"></SearchBar>
  </div>
  <div v-if="city.id" class="main-container">
    <CurrentWeather
      class="current-wrapper"
      :city="city"
      :weather="weather.current"
      :isLoading="loadingData.current"
    ></CurrentWeather>
    <Map
      v-show="!loadingData.current"
      class="map-wrapper"
      :city="city"
      @updateLocation="updateCity"
    ></Map>
  </div>
  <WeatherForecast
    v-if="city.id"
    class="forecast-wrapper"
    :weather="weather.forecast"
    :isLoading="loadingData.forecast"
  ></WeatherForecast>
  <WeatherHistory
    v-if="city.id"
    class="history-wrapper"
    :weather="weather.historical"
    :isLoading="loadingData.historical"
  ></WeatherHistory>
  <div class="initial-prompt" v-if="!city.id">
    To start, allow Location permissions in your browser, or search any city in the searchbar!
  </div>
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
    const loadingData = ref({});
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
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((data) => {
          city.value = {
            id: -1,
            name: 'Your current location',
            countryCode: '',
            coord: { lat: data.coords.latitude, lon: data.coords.longitude },
          };
        });
      }
    });

    const updateWeather = (coordinates) => {
      loadingData.value = {
        current: true,
        forecast: true,
        historical: true,
      };

      getCurrentWeather(coordinates).then((data) => {
        loadingData.value.current = false;
        weather.value.current = data;
      });
      getForecast(coordinates).then((data) => {
        loadingData.value.forecast = false;
        weather.value.forecast = data;
      });
      getWeatherHistory(coordinates).then((data) => {
        loadingData.value.historical = false;
        weather.value.historical = data;
      });
    };

    return { city, weather, updateCity, searchBar, loadingData };
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
  color: $text-color-dark;
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
  box-shadow: $shadow;

  h1 {
    margin: 0;
  }
}

.main-container {
  display: flex;
  justify-content: space-around;
  padding: 2rem 0 1rem 0;
  min-height: 400px;

  .current-wrapper {
    flex-basis: 30%;
  }

  .map-wrapper {
    flex-basis: 50%;
  }

  @media (max-width: 600px) {
    flex-direction: column;
    justify-content: space-around;
    align-items: center;

    .map-wrapper {
      margin-top: 1rem;
      flex-basis: unset;
      width: 90%;
    }
  }
}

.forecast-wrapper,
.history-wrapper {
  padding-bottom: 1rem;
}

.initial-prompt {
  padding-top: 4rem;
  font-weight: bold;
}
</style>
