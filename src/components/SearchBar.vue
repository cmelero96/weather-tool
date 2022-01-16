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
    <transition name="results">
      <div class="suggestions-wrapper" v-if="focused && searchResults.length">
        <ul class="city-list">
          <li
            v-for="item in searchResults"
            :key="item"
            class="city-option"
            @mousedown="selectCity(item)"
          >
            {{ `${item.name}, ${item.countryCode}` }}
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
import ALL_CITIES from '../utils/history.city.list.json';
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
@import '../utils/variables';

.search-bar-wrapper {
  padding-bottom: 0.6em;

  .results-enter-active,
  .results-leave-active {
    height: 0;
    transition: all 0.18s linear;
  }

  .results-enter-from,
  .results-leave-to {
    transform: scaleY(0);
    transform-origin: bottom;
    opacity: 0.5;
  }

  .search-bar {
    @include rounded-card;
    font-size: 18px;
    text-align: center;
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
      margin: 0;
      padding: 0;
      border: 1px solid black;
      border-radius: 2px;
      background-color: $primary-color-light;

      .city-option {
        list-style: none;
        line-height: 2em;
        padding: 0 1em;
        background-color: $primary-color-light;

        &:hover {
          cursor: pointer;
          background-color: $primary-color-highlight;
        }
      }
    }
  }
}
</style>
