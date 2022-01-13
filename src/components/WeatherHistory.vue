<template>
  <section class="weather-history">
    <header><h3>Historical data</h3></header>
    <div class="container" v-if="weather">
      <div v-for="day in weather" :key="day" :class="`historical historical-${day}`">
        <div class="description">{{ day.description }}</div>
        <img class="icon" :src="getSrc(day.icon)" :srcset="getSrcSet(day.icon)" />
        <div class="temp">Temp: {{ day.temperature }} ºC</div>
      </div>
    </div>
    <div v-else>Loading past data...</div>
  </section>
</template>

<script>
import { iconGetters } from '../utils';

export default {
  props: {
    weather: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const { getSrc, getSrcSet } = iconGetters;

    const test = (a) => {
      console.log(a);
    };

    return { getSrc, getSrcSet, test };
  },
};
</script>

<style>
.weather-history > .container {
  display: flex;
  width: 70%;
  margin: auto;
  justify-content: space-around;
}
</style>
