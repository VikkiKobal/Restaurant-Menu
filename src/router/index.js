import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ContactPage from '../views/ContactPage.vue'
import ReserveTable from '../views/ReserveTable.vue'

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
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
