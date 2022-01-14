import { createApp } from 'vue';
import App from './App.vue';
import VueGoogleMaps from '@fawmi/vue-google-maps';
import { GMAPS_API_KEY } from './utils/api-key';

const app = createApp(App);

app.use(VueGoogleMaps, {
  load: {
    key: GMAPS_API_KEY,
  },
});

app.mount('#app');
