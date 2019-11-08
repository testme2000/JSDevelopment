import Vue from 'vue'
import Bootstrapvue from 'bootstrap-vue/dist/bootstrap-vue.esm'
import App from './App.vue'

// Inject bootstrap style
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
