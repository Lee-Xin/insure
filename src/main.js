import Vue from 'vue'
import App from './App.vue'
import router from './router'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from "@/store";
// import E from 'wangeditor'

import '@/assets/css/normalize.css';
import '@/assets/css/border.css';

// import Mock from '@/mock';

Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
