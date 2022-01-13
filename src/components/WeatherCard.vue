<template>
  <section>
    <header>
      <slot name="title" />
    </header>
    <div class="container" v-if="weather && weather.temperature">
      <div class="description">{{ weather.description }}</div>
      <img class="icon" :src="getSrc(weather.icon)" :srcset="getSrcSet(weather.icon)" />

      <div class="temp">Temp: {{ weather.temperature }} ºC</div>
      <div v-if="weather.minTemperature" class="temp-min">Min: {{ weather.minTemperature }} ºC</div>
      <div v-if="weather.maxTemperature" class="temp-max">Max: {{ weather.maxTemperature }} ºC</div>

      <section v-if="toggler" class="extra-info-wrapper">
        <header class="extra-info-title">
          <strong>Additional information </strong>
          <img
            @click="toggleExtraInfo"
            alt="toggle the additional information"
            src="https://img.icons8.com/small/16/000000/expand-arrow.png"
            :class="`caret ${showExtraInfo && 'rotated'}`"
          />
        </header>
        <div v-if="showExtraInfo" class="extra-info-container">
          <slot name="extraInfo" />
        </div>
      </section>
    </div>
    <div v-else-if="weather">Error retrieving data</div>
    <Spinner v-else :color="'#000000'" />
  </section>
</template>

<script>
import { ref } from 'vue';
import { iconGetters } from '../utils';

import Spinner from 'vue-spinner/src/ClipLoader.vue';

export default {
  components: { Spinner },
  props: {
    weather: { type: Object, required: true },
    toggler: { type: Boolean, default: false },
  },
  setup(props) {
    const { getSrc, getSrcSet } = iconGetters;

    const showExtraInfo = ref(false);
    const toggleExtraInfo = () => (showExtraInfo.value = !showExtraInfo.value);

    return { showExtraInfo, toggleExtraInfo, getSrc, getSrcSet };
  },
};
</script>

<style scoped></style>
