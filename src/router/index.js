import Vue from 'Vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import HelloWorld from './../components/HelloWorld.vue'

const router = new VueRouter({
    mode: 'history',
    routes: configRoutes()
})

function configRoutes () {
    return [
        {
            path: '/',
            component: HelloWorld,
            name: 'HelloWord'
        }
    ]
}

export default router


