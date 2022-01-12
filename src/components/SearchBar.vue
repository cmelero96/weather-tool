<template>
  <input type="text" v-model="searchTerm" />
  <div v-for="item in searchResults" :key="item" class="country-option" @click="select(item)">
    {{ item }}
  </div>
</template>

<script>
import ALL_CITIES from '../assets/history.city.list.json';
import useSuggestions from '../composables/useSuggestions';

export default {
  setup() {
    const { searchTerm, searchResults } = useSuggestions(ALL_CITIES);

    const select = (item) => {
      console.log(item);
    };

    return { searchTerm, searchResults, select };
  },
};
</script>

<style></style>
