import { defineStore } from 'pinia'
import axios from 'axios'

export const useMenuStore = defineStore('menu', {
    state: () => ({
        allDishes: [],
        isLoading: false,
        error: null
    }),
    getters: {
        getDishesByCategory: (state) => (categoryId) =>
            state.allDishes.filter(dish => dish.category_id === categoryId)
    },
    actions: {
        async fetchMenu() {
            this.isLoading = true
            this.error = null
            try {
                const res = await axios.get('/api/menu')
                this.allDishes = res.data
            } catch (err) {
                this.error = err
            } finally {
                this.isLoading = false
            }
        }
    }
})
