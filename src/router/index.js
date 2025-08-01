import { createRouter, createWebHistory } from 'vue-router';
import {Auth} from "../store/Auth/index.js";
const routes = [
    {
        name: 'CurrentDay',
        path: '/current-day',
        component: () => import('../pages/CurrentDay/CurrentDay.vue'),
        meta: {
            requiredAuth: true
        }
    },
    {
        name: 'Categories',
        path: '/categories',
        component: () => import('../pages/Categories/Categories.vue'),
        meta: {
            requiredAuth: true
        }
    },
    {
        name: 'History',
        path: '/history',
        component: () => import('../pages/History/History.vue'),
        meta: {
            requiredAuth: true
        }
    },
    {
        path: '/',
        redirect: '/current-day'
    }
];

const router = createRouter({
    mode: 'history',
    history: createWebHistory(),
    routes,
});

router.beforeEach(async (to, from, next) => {
    if(to.meta.requiredAuth) {
        const {getUser, login} = Auth()
        if(!getUser) {
            // todo: Костыль на время пока не готова авторизация
            if(!localStorage.getItem('token')) {
                await login()
            }
            return next()

            // todo: Готовая проверка
            // return next({name: 'Login'})

        }
    }
    return next()
})

export default router;