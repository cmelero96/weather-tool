<template>
  <input type="text" v-model="searchTerm" @focus="onFocus" @blur="onBlur" />
  <div v-if="focused" class="country-list">
    <div
      v-for="item in searchResults"
      :key="item"
      class="country-option"
      @mousedown="selectCity(item)"
    >
      {{ item }}
    </div>
  </div>
</template>

<script>
import ALL_CITIES from '../assets/history.city.list.json';
import useSuggestions from '../composables/useSuggestions';
import { ref } from 'vue';

export default {
  emits: ['selectCity'],
  setup(_, { emit }) {
    const focused = ref(false);

    const lastOkValue = ref('');

    const { searchTerm, searchResults } = useSuggestions(ALL_CITIES);

    const selectCity = (city) => {
      lastOkValue.value = city;
      emit('selectCity', city);
    };

    const onFocus = () => {
      focused.value = true;
    };

    // Restore the input value to the previous correct value if blurring without selecting
    const onBlur = () => {
      if (searchTerm.value !== lastOkValue.value.name) {
        searchTerm.value = lastOkValue.value.name;
      }
      focused.value = false;
    };

    return { focused, searchTerm, searchResults, selectCity, onFocus, onBlur };
  },
};
</script>

<style></style>
