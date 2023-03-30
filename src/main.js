import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import store from './store';
import router from './router';
import Paginate from 'vuejs-paginate-next';

const app = createApp(App);
app.component('Paginate', Paginate);
app.use(store).use(router).mount('#app');
