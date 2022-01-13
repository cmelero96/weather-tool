<template>
  <section class="weather-forecast">
    <header><h3>Forecast</h3></header>
    <div class="container" v-if="weather">
      <div v-for="(day, n) in weather" :key="day" :class="`forecast forecast-${n}`">
        <h4>{{ n === 0 ? 'Tomorrow' : weekdays[n] }}</h4>
        <div class="description">{{ day.description }}</div>
        <img class="icon" :src="getSrc(day.icon)" :srcset="getSrcSet(day.icon)" />
        <div class="temp">Temp: {{ day.temperature }} ºC</div>
        <div class="temp-min">Min: {{ day.minTemperature }} ºC</div>
        <div class="temp-max">Max: {{ day.maxTemperature }} ºC</div>
      </div>
    </div>
    <div v-else>Loading forecast...</div>
  </section>
</template>

<script>
import { computed } from '@vue/reactivity';
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
    const weekdays = computed(() => getWeekdays(new Date(), props.weather.length));

    return { getSrc, getSrcSet, weekdays };
  },
};
</script>

<style scoped>
.weather-forecast > .container {
  display: flex;
  width: 100%;
  justify-content: space-around;
}
</style>
