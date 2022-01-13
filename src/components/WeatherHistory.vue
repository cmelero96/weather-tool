<template>
  <section class="weather-history">
    <header><h3>Historical data</h3></header>
    <div class="container">
      <WeatherCard v-for="(day, n) in weather" :key="day" :weather="day">
        <template v-slot:title>
          <h4>{{ n === 0 ? 'Yesterday' : weekdays[n] }}</h4>
        </template>
      </WeatherCard>
    </div>
    <div v-if="!weather">Loading past data...</div>
  </section>
</template>

<script>
import WeatherCard from './WeatherCard.vue';
import { computed } from 'vue';
import { getWeekdays } from '../utils';

export default {
  components: { WeatherCard },
  props: {
    weather: { type: Object, required: true },
  },
  setup(props) {
    const weekdays = computed(() => getWeekdays(new Date(), -props.weather.length));

    return { weekdays };
  },
};
</script>

<style scoped>
.description {
  text-transform: uppercase;
}

.container {
  display: flex;
  width: 70%;
  margin: auto;
  justify-content: space-around;
}
</style>
