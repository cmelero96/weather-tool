import { ref, watch } from 'vue';

export default (city, callback) => {
  const weather = ref();
  const isLoading = ref(false);
  const error = ref();

  watch(
    () => city,
    (city) => {
      if (!city) return;

      isLoading.value = true;
      error.value = false;

      callback(city.coord)
        .then((data) => {
          weather.value = data;
        })
        .catch((e) => {
          error.value = e;
        })
        .finally(() => {
          isLoading.value = false;
        });
    },
    { immediate: true }
  );

  return { weather, isLoading, error };
};
