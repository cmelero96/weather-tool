<template>
  <section class="weather-forecast" v-if="weather">
    <header><h3>Forecast</h3></header>
    <div class="container">
      <div v-for="day in weather" :key="day" :class="`forecast forecast-${day}`">
        <div class="description">{{ day.description }}</div>
        <img class="icon" :src="getSrc(day.icon)" :srcset="getSrcSet(day.icon)" />
        <div class="temp">Temp: {{ day.temperature }} ºC</div>
        <div class="temp-min">Min: {{ day.minTemperature }} ºC</div>
        <div class="temp-max">Max: {{ day.maxTemperature }} ºC</div>
      </div>
    </div>
  </section>
</template>

<script>
import { iconGetters } from '../shared/utils';

export default {
  props: {
    weather: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const { getSrc, getSrcSet } = iconGetters;

    return { getSrc, getSrcSet };
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
