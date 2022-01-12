<template>
  <input type="text" v-model="searchTerm" />
  <div v-for="item in searchResults" :key="item" class="country-option" @click="selectCity(item)">
    {{ item }}
  </div>
</template>

<script>
import ALL_CITIES from '../assets/history.city.list.json';
import useSuggestions from '../composables/useSuggestions';

export default {
  emits: ['selectCity'],
  setup(_, { emit }) {
    const { searchTerm, searchResults } = useSuggestions(ALL_CITIES);

    const selectCity = (city) => {
      console.log(city);
      emit('selectCity', city);
    };

    return { searchTerm, searchResults, selectCity };
  },
};
</script>

<style></style>
