<template>
  <section class="weather-history">
    <header><h3>Historical data</h3></header>
    <div class="container" v-if="weather">
      <div v-for="(day, n) in weather" :key="day" :class="`historical historical-${n}`">
        <h4>{{ n === 0 ? 'Tomorrow' : weekdays[n] }}</h4>
        <div class="description">{{ day.description }}</div>
        <img class="icon" :src="getSrc(day.icon)" :srcset="getSrcSet(day.icon)" />
        <div class="temp">Temp: {{ day.temperature }} ºC</div>
      </div>
    </div>
    <div v-else>Loading past data...</div>
  </section>
</template>

<script>
import { computed } from 'vue';
import { getWeekdays, iconGetters } from '../utils';

export default {
  props: {
    weather: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const { getSrc, getSrcSet } = iconGetters;
    const weekdays = computed(() => getWeekdays(new Date(), -props.weather.length));

    return { weekdays, getSrc, getSrcSet };
  },
};
</script>

<style scoped>
.weather-history > .container {
  display: flex;
  width: 70%;
  margin: auto;
  justify-content: space-around;
}
</style>
