import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Products from './views/Products.vue'

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: Products,
            name: 'Products'
        }
    ]
})

export default router


