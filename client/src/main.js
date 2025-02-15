import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedState from 'pinia-plugin-persistedstate';
import router from './router';
import App from './App.vue';

//bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

//Custem Styles
import './assets/css/colors.css';
import './assets/css/style.css';
import './assets/css/navimenu.css';
import './assets/css/table.css';
import './assets/css/footer.css';

import './stores/moderated.js'

const app = createApp(App);
const pinia = createPinia();

pinia.use(piniaPluginPersistedState);

app.use(pinia);
app.use(router);
app.mount('#app');