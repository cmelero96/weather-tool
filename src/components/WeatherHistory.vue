<template>
  <section class="weather-history" v-if="weather">
    <header><h3>Historical data</h3></header>
    <div class="container">
      <div v-for="day in weather" :key="day" :class="`historical historical-${day}`">
        <div class="description">{{ day.description }}</div>
        <img class="icon" :src="getMainSource(day.icon)" :srcset="getSources(day.icon)" />
        <div class="temp">Temp: {{ day.temperature }} ºC</div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    weather: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const getMainSource = (icon) => `https://openweathermap.org/img/wn/${icon}.png`;
    const getSources = (icon) => {
      return `https://openweathermap.org/img/wn/${icon}.png,
              https://openweathermap.org/img/wn/${icon}@2x.png,
              https://openweathermap.org/img/wn/${icon}@4x.png`;
    };

    const test = (a) => {
      console.log(a);
    };

    return { getMainSource, getSources, test };
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
