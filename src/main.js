import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const app = createApp(App);

app.use(createPinia())
app.use(router);

String.prototype.fromCamelToRegularCase = function () {
    console.log(this);
    return this.replace(/([a-z])([A-Z])/g, '$1 $2');
};

app.mount('#app');
