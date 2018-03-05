import Vue from 'vue'
import App from './App.vue'
/*
  npm install --save vuex
  npm install --save vue-router
  npm install --save url-join
  npm install --save axios
  npm install --save vuejs-noty
  npm install --save vee-validate
*/
// #region Store
import store from "./common/store";
// #endregion
// #region Router
import { router } from "./common/router";
// #endregion
// #region Http
import { http } from "./common/http";
Vue.prototype.$http = http;
// #endregion
// #region Noty https://github.com/renoguyon/vuejs-noty
import VueNoty from "vuejs-noty";
Vue.use(VueNoty);
// #endregion
// #region Validaciones en formularios https://github.com/baianat/vee-validate, http://vee-validate.logaretm.com/examples.html
import VeeValidate from 'vee-validate';
// import messagesEs from './common/locale/messages/es';
Vue.use(VeeValidate);
// Vue.use(VeeValidate, {
//   locale: 'es',
//   dictionary: {
//     es: { messages: messagesEs, attributes: messagesEs }
//   }
// });
// #endregion
// #region Directives
import directives from "./common/directives";
// #endregion
// #region Filters
import filters from "./common/filters";
// #endregion
new Vue({
  el: '#app',
  store: store,
  router: router,
  // directives,
  // filters,
  render: h => h(App)
})
