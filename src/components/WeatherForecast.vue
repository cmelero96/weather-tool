<template>
  <section class="weather-forecast">
    <header><h3>Forecast</h3></header>
    <div class="container">
      <ErrorMessage v-if="error">Error retrieving data</ErrorMessage>
      <WeatherCard v-for="(day, n) in weather" :key="day" :weather="day" :isLoading="isLoading">
        <template v-slot:title>
          <h4>{{ n === 0 ? 'Tomorrow' : weekdays[n] }}</h4>
        </template>
      </WeatherCard>
    </div>
  </section>
</template>

<script>
import { computed } from 'vue';
import useWatchCity from '../composables/useWatchCity';

import { getWeekdays } from '../utils';
import { getForecast } from '../services/weatherServices';

import WeatherCard from './WeatherCard.vue';
import ErrorMessage from './ErrorMessage.vue';

export default {
  components: { WeatherCard, ErrorMessage },
  props: {
    city: { type: Object, required: true },
  },
  setup(props) {
    const { weather, isLoading, error } = useWatchCity(props.city, getForecast);

    const weekdays = computed(() => getWeekdays(new Date(), weather.value.length));

    return { weather, isLoading, error, weekdays };
  },
};
</script>

<style scoped lang="scss">
.container {
  display: flex;
  width: 100%;
  justify-content: space-around;

  & > * {
    flex-basis: 12%;
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
