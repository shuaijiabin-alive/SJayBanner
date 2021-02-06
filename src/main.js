import Vue from "vue";
import App from "./App.vue";
import axios from 'axios'
import router from "./router";
import store from "./store";

import ant from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css';
import VueCropper from 'vue-cropper' 

Vue.use(VueCropper)

Vue.use(ant)
Vue.prototype.$axios= axios

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
