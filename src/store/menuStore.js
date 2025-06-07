import { defineStore } from 'pinia';
import api from '@/api';

export const useMenuStore = defineStore('menu', {
    state: () => ({
        allDishes: [],
        isLoading: false,
        error: null,
    }),
    getters: {
        getDishesByCategory: (state) => (categoryId) => {
            if (categoryId === 1) {
                return state.allDishes.filter((dish) => dish.is_special === true);
            }
            return state.allDishes.filter((dish) => dish.category_id === categoryId);
        },
        getSpecialDishes: (state) => {
            return state.allDishes.filter((dish) => dish.is_special === true);
        },
    },
    actions: {
        async fetchMenu() {
            this.isLoading = true;
            this.error = null;
            try {
                const response = await api.get('/api/menu');
                this.allDishes = response.data.map((dish) => ({
                    ...dish,
                    price: Number(dish.price),
                }));
            } catch (err) {
                this.error = err.response?.data?.message || 'Failed to fetch menu';
                console.error('Помилка при завантаженні меню:', err);
            } finally {
                this.isLoading = false;
            }
        },
        async addDish(newDish) {
            try {
                const response = await api.post('/api/menu', newDish);
                this.allDishes.push(response.data);
            } catch (err) {
                this.error = err.response?.data?.message || 'Failed to add dish';
                throw err;
            }
        },
        async updateDish(id, updatedDish) {
            try {
                const response = await api.put(`/api/menu/${id}`, updatedDish);
                const index = this.allDishes.findIndex((d) => d.id === id);
                if (index !== -1) {
                    this.allDishes[index] = { ...this.allDishes[index], ...response.data };
                }
            } catch (err) {
                this.error = err.response?.data?.message || 'Failed to update dish';
                throw err;
            }
        },
        async addDishWithFile(formData) {
            try {
                const response = await api.post('/api/menu/menu-items/upload', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
                this.allDishes.push(response.data);
            } catch (err) {
                this.error = err.response?.data?.message || 'Failed to add dish with file';
                throw err;
            }
        },
        async updateDishWithFile(id, formData) {
            try {
                const response = await api.put(`/api/menu/menu-items/upload/${id}`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
                const index = this.allDishes.findIndex((d) => d.id === id);
                if (index !== -1) {
                    this.allDishes[index] = { ...this.allDishes[index], ...response.data };
                }
            } catch (err) {
                this.error = err.response?.data?.message || 'Failed to update dish with file';
                throw err;
            }
        },
        async deleteDish(id) {
            try {
                await api.delete(`/api/menu/${id}`);
                this.allDishes = this.allDishes.filter((d) => d.id !== id);
            } catch (err) {
                this.error = err.response?.data?.message || 'Failed to delete dish';
                throw err;
            }
        },
    },
});