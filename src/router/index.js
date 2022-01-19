import Vue from 'vue'
import Router from 'vue-router'
import store from "../store";

Vue.use(Router)
const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '',
            component: function (){
                return import('@/components/layout')
            },
            children: [
                {
                    path: '/',
                    component: function (){
                        return import('@/views/auth/login')
                    },
                },
                {
                    path: '/refresh',
                    component: function (){
                        return import('@/views/auth/refresh')
                    },
                },
                {
                    path: '/logout',
                    component: function (){
                        return import('@/views/auth/logout')
                    },
                },
            ]
        },
    ]
})

// router interceptor
router.beforeEach((to, from, next) => {
    if (to.path === '/logout') {
        store.dispatch('UserLogout', to.query.redirectURL)
    } else {
        next()
    }
})


export default router