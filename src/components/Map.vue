<template>
  <div class="map-wrapper">
    <GMapMap
      v-if="coord && coord.lat && coord.lon"
      :center="{ lat: coord.lat, lng: coord.lon }"
      :options="{}"
      :zoom="12.5"
      style="width: 100%; height: 100%"
    >
      <GMapCluster :zoomOnClick="true">
        <GMapMarker
          :key="index"
          v-for="(m, index) in markers"
          :position="m.position"
          :clickable="true"
          :draggable="true"
          @click="center = m.position"
        />
      </GMapCluster>
    </GMapMap>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  props: {
    coord: { type: Object, required: true },
  },
};
</script>

<style>
.map-wrapper {
  height: 500px;
}
.vue-map-container {
  height: 100%;
  width: 100%;
}
</style>
