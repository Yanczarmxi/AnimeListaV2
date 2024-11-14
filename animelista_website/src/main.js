import { createApp } from 'vue'
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

window.$ = window.jQuery = jQuery

createApp(App).mount('#app')
