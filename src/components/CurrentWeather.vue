<template>
  <WeatherCard v-if="city" :weather="weather" toggler largeImage>
    <template v-slot:title>
      <h2>{{ city.name }}</h2>
    </template>
    <template v-slot:extraInfo>
      <div class="pressure">Pressure: {{ weather.pressure }} hPa</div>
      <div class="humidity">Humidity: {{ weather.humidity }}%</div>
      <div class="wind-speed">Wind speed: {{ weather.windSpeed }}m/s</div>
      <div class="sunrise">Sunrise: {{ formatDate(weather.sunrise) }}</div>
      <div class="sunset">Sunset: {{ formatDate(weather.sunset) }}</div>
    </template>
  </WeatherCard>
</template>

<script>
import WeatherCard from './WeatherCard.vue';

export default {
  components: { WeatherCard },
  props: {
    city: { type: Object, required: true },
    weather: { type: Object, required: true },
  },
  setup() {
    const formatDate = (date) =>
      new Date(date).toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit' });

    return { formatDate };
  },
};
</script>

<style scoped lang="scss"></style>
