<template>
  <div class="map-wrapper">
    <GMapMap v-if="coord" :center="center" :options="{}" :zoom="12" ref="map">
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
// TODO: Make markers clickable to refresh the search to the clicked value (emit event to App, then send back)
import { computed, ref, watch } from 'vue';

const createButton = (title, tooltip, onClick) => {
  const controlUI = document.createElement('button');
  controlUI.title = tooltip;
  const controlText = document.createElement('div');
  controlText.innerHTML = title;
  controlUI.appendChild(controlText);

  controlUI.addEventListener('click', onClick);

  return controlUI;
};

export default {
  props: {
    coord: { type: Object, required: true },
  },
  setup(props) {
    // For every new search, create a marker with the search coordinates
    const markers = ref([]);
    watch(
      () => props.coord,
      (coord) => markers.value.push({ position: { lat: coord.lat, lng: coord.lon } })
    );

    // Inject two custom buttons on the map to center the view and remove old markers
    const map = ref();
    watch(map, (googleMap) => {
      if (googleMap) {
        googleMap.$mapPromise.then((map) => {
          const centerButton = createButton(
            'Center view',
            'Click to center the view to the last city',
            () => map.setCenter(markers.value.at(-1).position)
          );
          const clearMarkersButton = createButton(
            'Clear old markers',
            'Click to remove markers from past searches from the map',
            () => (markers.value = [markers.value.at(-1)])
          );
          map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerButton);
          map.controls[google.maps.ControlPosition.BOTTOM_LEFT].push(clearMarkersButton);
        });
      }
    });

    // Update the center of the map whenever new coordinates are obtained
    const center = computed(() => ({
      lat: props.coord.lat,
      lng: props.coord.lon,
    }));

    return { center, markers, map };
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
