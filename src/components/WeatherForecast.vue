<template>
  <section class="weather-forecast">
    <header><h3>Forecast</h3></header>
    <div class="container">
      <WeatherCard v-for="(day, n) in weather" :key="day" :weather="day">
        <template v-slot:title>
          <h4>{{ n === 0 ? 'Tomorrow' : weekdays[n] }}</h4>
        </template>
      </WeatherCard>
    </div>
    <Spinner v-if="!weather" :color="'#000000'" />
  </section>
</template>

<script>
import { computed } from '@vue/reactivity';
import { getWeekdays } from '../utils';

import WeatherCard from './WeatherCard.vue';
import Spinner from 'vue-spinner/src/ClipLoader.vue';

export default {
  components: { WeatherCard, Spinner },
  props: {
    weather: { type: Object, required: true },
  },
  setup(props) {
    const weekdays = computed(() => getWeekdays(new Date(), props.weather.length));

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
  width: 100%;
  justify-content: space-around;
}
</style>
