<template>
  <section class="weather-history">
    <header><h3>Historical data</h3></header>
    <div class="container" v-if="!isLoading">
      <WeatherCard v-for="(day, n) in weather" :key="day" :weather="day">
        <template v-slot:title>
          <h4>{{ n === 0 ? 'Yesterday' : weekdays[n] }}</h4>
        </template>
      </WeatherCard>
    </div>
    <Spinner v-else :color="'#000000'" />
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
    isLoading: { type: Boolean, default: false },
  },
  setup(props) {
    const weekdays = computed(() => getWeekdays(new Date(), -props.weather.length));

    return { weekdays };
  },
};
</script>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: row-reverse;
  width: 70%;
  margin: auto;
  justify-content: space-around;

  & > * {
    flex-basis: 15%;
  }

  h4 {
    margin: 0;
  }

  @media (max-width: 720px) {
    flex-direction: column;
    justify-content: space-around;
    align-items: normal;
    width: 300px;
    margin: auto;

    & > * {
      margin: 1em 0;
    }
  }
}
</style>
