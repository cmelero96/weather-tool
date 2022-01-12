<template>
  <section class="current-weather" v-if="city && weather">
    <header class="title">
      <h2>{{ city.name }}</h2>
    </header>
    <div class="description">{{ weather.description }}</div>
    <img class="icon" :src="getMainSource(weather.icon)" :srcset="getSources(weather.icon)" />
    <div class="temp">Temp: {{ weather.temperature }} ºC</div>
    <div class="temp-min">Min: {{ weather.minTemperature }} ºC</div>
    <div class="temp-max">Max: {{ weather.maxTemperature }} ºC</div>
    <div class="pressure">Pressure: {{ weather.pressure }} hPa</div>
    <div class="humidity">Humidity: {{ weather.humidity }}%</div>
    <div class="wind-speed">Wind speed: {{ weather.windSpeed }}m/s</div>
    <div class="sunrise">Sunrise: {{ weather.sunrise }}</div>
    <div class="sunset">Sunset: {{ weather.sunset }}</div>
  </section>
</template>

<script>
export default {
  props: {
    city: {
      type: Object,
      required: true,
    },
    weather: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const getMainSource = (icon) => `https://openweathermap.org/img/wn/${icon}.png`;
    const getSources = (icon) => {
      return `https://openweathermap.org/img/wn/${icon}.png,
              https://openweathermap.org/img/wn/${icon}@2x.png,
              https://openweathermap.org/img/wn/${icon}@4x.png`;
    };

    return { getMainSource, getSources };
  },
};
</script>

<style>
.description {
  text-transform: uppercase;
}
</style>
