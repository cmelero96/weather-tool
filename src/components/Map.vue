<template>
  <div class="map-wrapper">
    <GMapMap v-if="coord" :center="center" :options="{}" :zoom="12.5" ref="map">
      <GMapCluster>
        <GMapMarker
          v-for="(marker, index) in markers"
          :key="index"
          :position="marker.position"
          :clickable="false"
          :draggable="false"
          @click="center = marker.position"
        />
      </GMapCluster>
    </GMapMap>
  </div>
</template>

<script>
import { computed, ref, watch } from 'vue';

const createButton = (map) => {
  const controlUI = document.createElement('button');
  controlUI.title = 'Click to zoom the map';
  const controlText = document.createElement('div');
  controlText.innerHTML = `Center`;
  controlUI.appendChild(controlText);

  controlUI.addEventListener('click', () => {
    map.setZoom(map.getZoom() + 1);
  });

  return controlUI;
};

export default {
  props: {
    coord: { type: Object, required: true },
  },
  setup(props) {
    const center = computed(() => ({
      lat: props.coord.lat,
      lng: props.coord.lon,
    }));
    const markers = ref([]);

    watch(
      () => props.coord,
      (newCoord) => {
        console.log(newCoord);
        markers.value.push({ position: { lat: newCoord.lat, lng: newCoord.lon } });
      }
    );

    const map = ref();
    const button = ref();

    watch(map, (googleMap) => {
      if (googleMap) {
        googleMap.$mapPromise.then((map) => {
          const button = createButton(map);
          map.controls[google.maps.ControlPosition.TOP_CENTER].push(button);
        });
      }
    });

    return { center, markers, map, button };
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
