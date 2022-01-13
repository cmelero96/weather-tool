<template>
  <header><h1>Weather Forecast</h1></header>
  <SearchBar @selectCity="updateCity" ref="searchBar"></SearchBar>
  <br />
  <div class="main-container">
    <CurrentWeather
      class="current-wrapper"
      :city="city"
      :weather="weather.current"
    ></CurrentWeather>
    <Map class="map-wrapper" :city="city" @updateLocation="updateCity"></Map>
  </div>
  <br />
  <WeatherForecast :weather="weather.forecast"></WeatherForecast>

  <br />
  <WeatherHistory :weather="weather.historical"></WeatherHistory>

  <br />
</template>

<script>
import { getCurrentWeather, getForecast, getWeatherHistory } from './services/weatherServices';
import { mockCityData, mockCurrent, mockForecast, mockHistorical } from './assets/mockData';
import { ref, onMounted, watch } from 'vue';

import SearchBar from './components/SearchBar.vue';
import CurrentWeather from './components/CurrentWeather.vue';
import WeatherForecast from './components/WeatherForecast.vue';
import WeatherHistory from './components/WeatherHistory.vue';
import Map from './components/Map.vue';

export default {
  components: { SearchBar, CurrentWeather, WeatherForecast, WeatherHistory, Map },
  setup() {
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

    return { city, weather, updateCity, searchBar };
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
  box-sizing: border-box;
}

.main-container {
  display: flex;
  justify-content: space-around;
}

.current-wrapper {
  flex-basis: 50%;
  padding-top: 2em;
}

.map-wrapper {
  align-self: stretch;
  padding: 0 1em 0 4em;
}
</style>
