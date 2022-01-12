<template>
  <section class="weather-forecast" v-if="weather">
    <header><h3>Forecast</h3></header>
    <div class="container">
      <div v-for="day in weather" :key="day" :class="`forecast forecast-${day}`">
        <div class="description">{{ day.description }}</div>
        <img class="icon" :src="getMainSource(day.icon)" :srcset="getSources(day.icon)" />
        <div class="temp">Temp: {{ day.temperature }} ºC</div>
        <div class="temp-min">Min: {{ day.minTemperature }} ºC</div>
        <div class="temp-max">Max: {{ day.maxTemperature }} ºC</div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
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
.weather-forecast > .container {
  display: flex;
  width: 100%;
  justify-content: space-around;
}
</style>
