import { createApp } from 'vue';
// iconfont
import './assets/iconfont/iconfont.css';
import './assets/iconfont/iconfont';
import 'animate.css/animate.min.css';

import App from './App.vue';
import router from './router';
import { setupStore } from '@/stores';

const app = createApp(App);

setupStore(app)
app.use(router);

app.mount('#app');
