import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ContactPage from '../views/ContactPage.vue' 

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
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
