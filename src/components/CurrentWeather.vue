<template>
  <Spinner v-if="isLoading" :color="'#000000'" />
  <WeatherCard v-else :weather="weather" toggler largeImage>
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
import WeatherCard from './WeatherCard.vue';
import Spinner from 'vue-spinner/src/ClipLoader.vue';

export default {
  components: { WeatherCard, Spinner },
  props: {
    city: { type: Object, required: true },
    weather: { type: Object, required: true },
    isLoading: { type: Boolean, default: false },
  },
  setup() {
    const formatDate = (date) =>
      new Date(date).toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit' });

    return { formatDate };
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
    height: 2em;
    margin: 0;

    @media (max-width: 600px) {
      height: 2em;
    }
  }
}
</style>
