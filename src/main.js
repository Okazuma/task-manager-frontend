import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios';


// axiosのデフォルト設定
axios.defaults.withCredentials = true;
// Vueアプリケーションの作成とマウント
createApp(App).use(store).use(router).mount('#app')