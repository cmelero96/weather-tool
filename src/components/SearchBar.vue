<template>
  <input type="text" v-model="searchTerm" />
  <div v-for="item in searchResults" :key="item" class="country-option" @click="select(item)">
    {{ item }}
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import { debouncedWatch } from '@vueuse/core';
import Fuse from 'fuse.js';
import ALL_CITIES from '../assets/history.city.list.json';

const SEARCH_OPTIONS = {
  threshold: 0.35,
  keys: ['city.name'],
};

export default {
  setup() {
    const searchTerm = ref('');
    const searchResults = ref([]);
    const fuse = ref();

    const getSuggestions = () => {
      const search = fuse.value
        .search(searchTerm.value)
        .slice(0, 10)
        .map((city) => {
          let id = city.item.id;
          if (typeof id !== 'number') {
            id = Number(id['$numberLong']);
          }

          return {
            id,
            name: city.item.city.name,
            countryCode: city.item.city.country,
            coord: city.item.city.coord,
          };
        });
      return search;
    };

    const select = (item) => {
      console.log(item);
    };

    onMounted(() => (fuse.value = new Fuse(ALL_CITIES, SEARCH_OPTIONS)));

    debouncedWatch(
      searchTerm,
      () => {
        searchResults.value = getSuggestions(searchTerm);
      },
      { debounce: 150 }
    );

    return { searchTerm, searchResults, select };
  },
};
</script>

<style></style>
