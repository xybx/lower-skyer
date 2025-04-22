import { createRouter, createWebHashHistory } from 'vue-router';
import { useUserStore } from '@/stores/modules/user'
import { checkLoginApi } from '@/views/login/api/loginApi';
import Layout from '@/layout/index/index.vue';
const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'Root',
            redirect: '/home',
        },
        {
            path: '/login',
            name: 'Login',
            component: () => import('../views/login/login.vue'),
        },
        {
            path: '/index',
            name: 'Index',
            component: Layout,
            children: [
                {
                    path: '/home',
                    name: 'Home',
                    component: () => import('../views/home/Home.vue'),
                },
            ],
        }
        // {
        //     path: '/skyhome',
        //     name: 'SkyHome',
        //     component: () => import('../views/skyhome/skyHome.vue')
        // }
    ]
});

export default router;

/* 路由拦截 */
router.beforeEach( async (to, from, next) => {
    const {token,userdata} = useUserStore()
    if(token && token !=''){
        if(to.path === '/login'){
            const { data: res } = await checkLoginApi(token as string);
            if (res.code !== 200) {
                ElMessage({
                    message: res.msg,
                    grouping: true,
                    type: 'warning',
                });
                return false;
            }
            sessionStorage.setItem('userdata', JSON.stringify(res.data));
            next('/');
        } else {
            next();
        }
    }else {
        if(to.path !== '/login') {
            ElMessage.warning('未获取到token信息');
            window.history.back();
            next('/login')
        } else {
            ElMessage.warning('未获取到token信息');
            window.history.back();
            next()
        }
    }
});