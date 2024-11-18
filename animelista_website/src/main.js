import { createApp } from 'vue'
import { createPinia} from 'pinia'
import App from './App.vue'

//jquery
import jQuery from 'jquery';

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

window.$ = window.jQuery = jQuery

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.mount('#app');