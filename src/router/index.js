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
        path: '/',
        redirect: '/current-day'
    }
];

const router = createRouter({
    mode: 'history',
    routes,
});

router.beforeEach(async (to, from, next) => {
    if(to.meta.requiredAuth) {
        const {getUser, login} = Auth()
        if(!getUser) {
            // todo: Костыль на время пока не готова авторизация
            await login()
            return next()

            // todo: Готовая проверка
            // return next({name: 'Login'})

        }
    }
    return next()
})

export default router;