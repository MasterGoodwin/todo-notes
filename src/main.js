import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import routes from './routes'
import './app.scss'

import { library } from '@fortawesome/fontawesome-svg-core'
import {faTrashAlt, faCheck, faLevelUpAlt, faShare} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faTrashAlt, faCheck, faLevelUpAlt, faShare)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(VueRouter)

const router = new VueRouter({routes});

var vm = new Vue({
    render: h => h(App),
    router
}).$mount('#app');