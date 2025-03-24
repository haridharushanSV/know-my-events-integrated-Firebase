import { createApp } from 'vue';
import App from './App.vue';
import { createVuetify } from 'vuetify';
//import 'vuetify/styles'; // Import Vuetify styles
//import '@mdi/font/css/materialdesignicons.css'; // Import Material Design Icons
import router from './router'; // Import Vue Router

const vuetify = createVuetify();

const app = createApp(App);
app.use(router); // Use Vue Router
app.use(vuetify); // Use Vuetify
app.mount('#app');
export default createVuetify();
