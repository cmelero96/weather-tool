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
    <section class="extra-info-wrapper">
      <header class="extra-info-title">
        <strong>Additional information </strong>
        <img
          @click="toggleExtraInfo"
          alt="toggle the additional information"
          src="https://img.icons8.com/small/16/000000/expand-arrow.png"
          :class="`caret ${showExtraInfo && 'rotated'}`"
        />
      </header>
      <div v-if="showExtraInfo" class="extra-info-container">
        <div class="pressure">Pressure: {{ weather.pressure }} hPa</div>
        <div class="humidity">Humidity: {{ weather.humidity }}%</div>
        <div class="wind-speed">Wind speed: {{ weather.windSpeed }}m/s</div>
        <div class="sunrise">Sunrise: {{ weather.sunrise }}</div>
        <div class="sunset">Sunset: {{ weather.sunset }}</div>
      </div>
    </section>
  </section>
</template>

<script>
import { ref } from 'vue';
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

    const showExtraInfo = ref(false);
    const toggleExtraInfo = () => (showExtraInfo.value = !showExtraInfo.value);

    return { showExtraInfo, toggleExtraInfo, getMainSource, getSources };
  },
};
</script>

<style>
.description {
  text-transform: uppercase;
}

.caret {
  transition: all 0.15s ease;
}

.caret.rotated {
  transform: rotateZ(180deg);
}
</style>
