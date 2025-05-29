import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ContactPage from '../views/ContactPage.vue'
import ReserveTable from '../views/ReserveTable.vue'
import AboutUs from '../views/AboutUs.vue'  // <-- імпорт нової сторінки

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

export default router
