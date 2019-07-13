import Vue from 'vue'
import App from './App.vue'

import Vuetify from 'vuetify'
import VueRouter from 'vue-router'

import 'material-design-icons-iconfont/dist/material-design-icons.css'
import 'vuetify/dist/vuetify.min.css'

import routes from './routes'

Vue.config.productionTip = false

Vue.use(Vuetify,{
  iconfont: 'mdi'
})
Vue.use(VueRouter)

const router = new VueRouter({
  routes : routes,
  mode: 'history'
})

new Vue({
  router: router,
  render: h => h(App),
}).$mount('#app')
