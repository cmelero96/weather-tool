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
    <Spinner v-if="!weather" :color="'#000000'" />
  </section>
</template>

<script>
import { computed } from 'vue';
import { getWeekdays } from '../utils';

import WeatherCard from './WeatherCard.vue';
import Spinner from 'vue-spinner/src/ClipLoader.vue';

export default {
  components: { WeatherCard, Spinner },
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

.container > * {
  flex-basis: 15%;
}
</style>
