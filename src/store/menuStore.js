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
        },
        async addDish(newDish) {
            try {
                const res = await axios.post('/api/menu', newDish)
                this.allDishes.push(res.data)
            } catch (err) {
                this.error = err
            }
        },
        async updateDish(id, updatedDish) {
            try {
                await axios.put(`/api/menu/${id}`, updatedDish)
                const index = this.allDishes.findIndex(d => d.id === id)
                if (index !== -1) {
                    this.allDishes[index] = { ...this.allDishes[index], ...updatedDish }
                }
            } catch (err) {
                this.error = err
            }
        },
        async deleteDish(id) {
            try {
                await axios.delete(`/api/menu/${id}`)
                this.allDishes = this.allDishes.filter(d => d.id !== id)
            } catch (err) {
                this.error = err
            }
        }
    }
})
