<template>
  <div class="search-bar-wrapper">
    <input
      class="search-bar"
      type="text"
      placeholder="Search city"
      v-model="searchTerm"
      @focus="onFocus"
      @blur="onBlur"
    />
    <div class="suggestions-wrapper">
      <div v-if="focused && searchResults.length" class="city-list">
        <div
          v-for="item in searchResults"
          :key="item"
          class="city-option"
          @mousedown="selectCity(item)"
        >
          {{ `${item.name}, ${item.countryCode}` }}
        </div>
      </div>
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

<style scoped lang="scss">
.search-bar-wrapper {
  padding-bottom: 0.6em;

  .search-bar {
    font-size: 18px;
    text-align: center;
    box-shadow: 0 4px 5px rgba(0, 0, 0, 0.7);
    outline: none;
  }

  .suggestions-wrapper {
    position: absolute;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    z-index: 2;
    width: max-content;

    .city-list {
      border: 1px solid black;
      border-radius: 2px;
      background-color: white;

      .city-option {
        line-height: 2em;
        padding: 0 1em;

        &:hover {
          cursor: pointer;
          background-color: lightblue;
        }
      }
    }
  }
}
</style>
