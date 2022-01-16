import Vue from 'vue'
import Router from 'vue-router'
import store from "../store";

Vue.use(Router)
const router = new Router({
    mode: 'history',
    routes: [
        // {
        //     path: '/',
        //     component: function () {
        //         return '@/components/layout'
        //     },
        //     children: [
        //         {
        //             path: '/login',
        //             component: function () {
        //                 return '@/views/auth/login'
        //             }
        //         },
        //     ]
        // }
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