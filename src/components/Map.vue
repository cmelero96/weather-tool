<template>
  <div class="map-wrapper">
    <GMapMap v-if="city && city.coord" :center="center" :options="{}" :zoom="12" ref="map">
      <GMapCluster>
        <GMapMarker
          v-for="(marker, index) in markers"
          :key="index"
          :position="{ lat: marker.coord.lat, lng: marker.coord.lon }"
          :clickable="true"
          @click="updateLocation(marker)"
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
    city: { type: Object, required: true },
  },
  emits: ['updateLocation'],
  setup(props, { emit }) {
    // For every new search, create a marker with the search coordinates
    const markers = ref([]);
    watch(
      () => props.city,
      (city) => {
        // Bugfix: Only add the new marker if it wasn't the last one already
        if (!markers.value.length || markers.value.at(-1).id !== city.id) {
          markers.value.push(city);
        }
      }
    );

    // Inject two custom buttons on the map to center the view and remove old markers
    const map = ref();
    watch(map, (googleMap) => {
      if (googleMap) {
        googleMap.$mapPromise.then((map) => {
          const centerButton = createButton(
            'Center view',
            'Click to center the view to the last city',
            () => {
              const { lat, lon } = markers.value.at(-1).coord;
              console.log(lat, lon);
              map.setCenter({ lat, lng: lon });
            }
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
      lat: props.city.coord.lat,
      lng: props.city.coord.lon,
    }));

    // Emit an event to update the location to the clicked marker
    const updateLocation = (city) => {
      // When clicking on a marker different than the last one, remove it from history.
      // When the city change gets processed it will get added back to last position
      const markerIndex = markers.value.findIndex((m) => m.id === city.id);
      if (markerIndex >= 0 && markerIndex !== markers.value.length - 1) {
        markers.value.splice(markerIndex, 1);
      }
      emit('updateLocation', city);
    };

    return { center, markers, map, updateLocation };
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
