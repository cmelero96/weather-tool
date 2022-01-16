<template>
  <section class="weather-card">
    <header class="title">
      <slot name="title" />
    </header>
    <div class="container">
      <ErrorMessage v-if="error">Error retrieving data</ErrorMessage>
      <Spinner v-else-if="isLoading" :color="'#000000'" />
      <div class="content" v-else>
        <div class="description">
          <div>{{ weather.description }}</div>
        </div>
        <img :class="`icon ${largeImage && 'large'}`" :src="getSrc(weather.icon, largeImage)" />

        <div class="temp">{{ weather.temperature }}ºC</div>
        <div
          class="temp-min-max"
          v-if="
            weather.maxTemperature &&
            weather.minTemperature &&
            weather.maxTemperature !== weather.minTemperature
          "
        >
          <div class="temp-min">Min: {{ weather.minTemperature }}ºC</div>
          <div class="temp-max">Max: {{ weather.maxTemperature }}ºC</div>
        </div>

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
          <div :class="`extra-info-container ${!showExtraInfo && 'hidden'}`">
            <slot name="extraInfo" />
          </div>
        </section>
      </div>
    </div>
  </section>
</template>

<script>
import { ref } from 'vue';
import { iconGetters } from '../utils';

import Spinner from 'vue-spinner/src/ClipLoader.vue';
import ErrorMessage from './ErrorMessage.vue';

export default {
  components: { Spinner, ErrorMessage },
  props: {
    weather: { type: Object, required: true },
    isLoading: { type: Boolean, default: true },
    error: { type: Boolean, default: false },
    toggler: { type: Boolean, default: false },
    largeImage: { type: Boolean, default: false },
  },
  setup() {
    const { getSrc, getSrcSet } = iconGetters;

    const showExtraInfo = ref(false);
    const toggleExtraInfo = () => (showExtraInfo.value = !showExtraInfo.value);

    return { showExtraInfo, toggleExtraInfo, getSrc, getSrcSet };
  },
};
</script>

<style scoped lang="scss">
@import '../utils/variables';

.weather-card {
  @include rounded-card;
  display: flex;
  flex-direction: column;
  background-color: $primary-color-light;
  white-space: nowrap;
  overflow: hidden;

  .title {
    height: fit-content;
    border-bottom: 1px solid black;
    border-radius: 5px 5px 0 0;
    background-color: $primary-color;
    color: $text-color-light;
    white-space: normal;
    padding: 0.5em;

    @media (max-width: 1080px) {
      font-size: 14px;
    }
  }

  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
    padding: 0.3em;

    .content {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-evenly;
      flex: 1;

      @media (max-width: 1080px) {
        font-size: 14px;
      }

      @media (max-width: 600px) {
        font-size: 18px;
        padding-bottom: 0.5em;
      }

      .description {
        text-transform: uppercase;
        font-size: 15px;
        height: 2em;
        display: flex;
        flex-direction: column;
        justify-content: center;
        white-space: normal;

        @media (max-width: 1080px) {
          font-size: 12px;
        }

        @media (max-width: 720px) {
          font-size: 18px;
        }
      }

      .icon.large {
        height: 100px;
      }

      .temp-min-max {
        @media (max-width: 720px) {
          width: 100%;
          display: flex;
          justify-content: space-evenly;
          padding-top: 0.4em;
        }
      }

      .extra-info-title {
        padding: 0.4em 0;
      }

      .extra-info-container {
        transition: opacity 0.1s linear;
        opacity: 1;

        &.hidden {
          opacity: 0;

          @media (max-width: 600px) {
            display: none;
          }
        }
      }

      .caret {
        transition: all 0.15s ease;
        cursor: pointer;
      }

      .caret.rotated {
        transform: rotateZ(180deg);
      }
    }
  }
}
</style>
