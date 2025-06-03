import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ContactPage from '../views/ContactPage.vue'
import ReserveTable from '../views/ReserveTable.vue'
import AboutUs from '../views/AboutUs.vue'
import { useUserStore } from '@/store/user'

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/contact',
        name: 'contact',
        component: ContactPage
    },
    {
        path: '/reserve',
        name: 'reserve',
        component: ReserveTable
    },
    {
        path: '/about',
        name: 'about',
        component: AboutUs
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/LoginPage.vue')
    },
    {
        path: '/admin',
        name: 'AdminPanel',
        component: () => import('@/views/AdminPanel.vue'),
        meta: { requiresAuth: true, requiresAdmin: true }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to) {
        if (to.hash) {
            return {
                el: to.hash,
                behavior: 'smooth'
            }
        }
        return { top: 0 }
    }
})

router.beforeEach((to, from, next) => {
    const userStore = useUserStore()
    const { isLoggedIn, isAdmin } = userStore

    if (to.meta.requiresAuth && !isLoggedIn) {
        return next('/login')
    }
    if (to.meta.requiresAdmin && !isAdmin) {
        return next('/')
    }
    if (to.path === '/login' && isLoggedIn && isAdmin) {
        return next('/admin')
    }
    if (to.path === '/login' && isLoggedIn && !isAdmin) {
        return next('/')
    }
    next()
})

export default router