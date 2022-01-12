<template>
  <input type="text" ref="input" v-model.lazy="searchTerm" v-debounce="300" />
  <div v-for="item in searchResults" :key="item">
    {{ item }}
  </div>
</template>

<script>
import Fuse from 'fuse.js';
import ALL_CITIES from '../assets/history.city.list.json';

const SEARCH_OPTIONS = {
  threshold: 0.35,
  keys: ['city.name'],
};

export default {
  data() {
    return {
      fuse: null,
      searchResults: [],
      searchTerm: '',
    };
  },
  mounted() {
    this.fuse = new Fuse(ALL_CITIES, SEARCH_OPTIONS);
  },
  watch: {
    searchTerm(n) {
      this.displaySuggestions(n);
    },
  },
  methods: {
    displaySuggestions() {
      const input = this.$refs.input.value;

      const search = this.fuse
        .search(input)
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

      this.searchResults = search;
    },
  },
};
</script>

<style></style>
