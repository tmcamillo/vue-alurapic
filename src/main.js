import Vue from 'vue'
import App from './App.vue'
// importando o módulo
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
import {routes} from './routes';

// registrando o módulo/plugin no global view object
Vue.use(VueResource);
Vue.use(VueRouter);

const router = new VueRouter({
  routes,
  mode: 'history'
})

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
