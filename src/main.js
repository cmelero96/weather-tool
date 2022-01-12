import { createApp } from 'vue';
import App from './App.vue';
import debounce from './directives/debounce';

const app = createApp(App);

app.directive('debounce', (el, binding) => debounce(el, binding));

app.mount('#app');
