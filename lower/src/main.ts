import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { setupStore } from '@/stores';
import 'element-plus/theme-chalk/src/index.scss';
// iconfont
import '@/assets/iconfont/iconfont.css';
import '@/assets/iconfont/iconfont';
import 'animate.css/animate.min.css';
import '@/assets/styles/global.scss';


const app = createApp(App);

setupStore(app)
app.use(router);

app.mount('#app');
