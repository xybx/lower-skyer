import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            redirect: '/skyhome'
        },
        {
            path: '/skyhome',
            name: 'SkyHome',
            component: () => import('../views/skyhome/skyHome.vue')
        }
    ]
});

export default router;
