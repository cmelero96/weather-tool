import { debouncedWatch } from '@vueuse/core';
import { ref, onMounted } from 'vue';
import Fuse from 'fuse.js';

const SEARCH_OPTIONS = {
  threshold: 0.35,
  keys: ['city.name'],
};

export default (searchValues) => {
  // Create Fuse instance to perform fuzzy search
  const fuse = ref(new Fuse(searchValues, SEARCH_OPTIONS));

  // Create method to fuzzy search and handle the results
  const searchTerm = ref('');
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

  // Perform a new search on user input, after a short delay
  const searchResults = ref([]);
  debouncedWatch(
    searchTerm,
    () => {
      searchResults.value = getSuggestions(searchTerm);
    },
    { debounce: 150 }
  );

  return { searchTerm, searchResults };
};
