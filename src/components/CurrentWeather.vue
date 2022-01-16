<template>
  <WeatherCard :weather="weather" :isLoading="isLoading" :error="error" toggler largeImage>
    <template v-slot:title>
      <div class="title-wrapper">
        <h2>{{ city.name }}</h2>
      </div>
    </template>
    <template v-slot:extraInfo>
      <div class="pressure">Pressure: {{ weather.pressure }} hPa</div>
      <div class="humidity">Humidity: {{ weather.humidity }}%</div>
      <div class="wind-speed">Wind speed: {{ weather.windSpeed }}m/s</div>
      <div class="sunrise">Sunrise at {{ formatDate(weather.sunrise) }}</div>
      <div class="sunset">Sunset at {{ formatDate(weather.sunset) }}</div>
    </template>
  </WeatherCard>
</template>

<script>
import useWatchCity from '../composables/useWatchCity';
import { getCurrentWeather } from '../services/weatherServices';
import WeatherCard from './WeatherCard.vue';

export default {
  components: { WeatherCard },
  props: {
    city: { type: Object, required: true },
  },
  setup(props) {
    const { weather, isLoading, error } = useWatchCity(props.city, getCurrentWeather);

    const formatDate = (date) =>
      new Date(date).toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit' });

    return { weather, isLoading, error, formatDate };
  },
};
</script>

<style scoped lang="scss">
.title-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;

  h2 {
    margin: 0;
  }
}
</style>
