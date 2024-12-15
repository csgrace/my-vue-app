import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // 导入路由配置
import store from './store'; // 导入 Vuex store 配置

createApp(App).use(router).use(store).mount('#app');