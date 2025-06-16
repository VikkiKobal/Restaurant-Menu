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
            this.allDishes = [];
            try {
                const response = await api.get(`/api/menu?_t=${Date.now()}`);
                this.allDishes = response.data.map((dish) => ({
                    ...dish,
                    price: Number(dish.price),
                    portion: dish.portion_size !== null ? Number(dish.portion_size) : null, // Map to number
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
                const payload = {
                    ...newDish,
                    portion_size: newDish.portion !== null ? Number(newDish.portion) : null, // Map to number
                    portion: undefined, // Remove portion
                };
                if (payload.portion_size !== null && (isNaN(payload.portion_size) || payload.portion_size < 0)) {
                    throw new Error('Portion size must be a positive number');
                }
                const response = await api.post('/api/menu', payload);
                this.allDishes.push({
                    ...response.data,
                    portion: response.data.portion_size !== null ? Number(response.data.portion_size) : null,
                });
            } catch (err) {
                this.error = err.response?.data?.message || 'Failed to add dish';
                console.error('Error in addDish:', err);
                throw err;
            }
        },
        async updateDish(id, updatedDish) {
            try {
                const payload = {
                    ...updatedDish,
                    portion_size: updatedDish.portion !== null ? Number(updatedDish.portion) : null, // Map to number
                    portion: undefined, // Remove portion
                };
                if (payload.portion_size !== null && (isNaN(payload.portion_size) || payload.portion_size < 0)) {
                    throw new Error('Portion size must be a positive number');
                }
                const response = await api.put(`/api/menu/${id}`, payload);
                const index = this.allDishes.findIndex((d) => d.id === id);
                if (index !== -1) {
                    this.allDishes[index] = {
                        ...this.allDishes[index],
                        ...response.data,
                        portion: response.data.portion_size !== null ? Number(response.data.portion_size) : null,
                    };
                }
            } catch (err) {
                this.error = err.response?.data?.message || 'Failed to update dish';
                console.error('Error in updateDish:', err);
                throw err;
            }
        },
        async addDishWithFile(formData) {
            try {
                console.log('FormData in addDishWithFile:', Object.fromEntries(formData));
                const response = await api.post('/api/menu/menu-items/upload', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
                console.log('Response from addDishWithFile:', response.data);
                this.allDishes.push({
                    ...response.data,
                    portion: response.data.portion_size !== null ? Number(response.data.portion_size) : null,
                });
            } catch (err) {
                this.error = err.response?.data?.message || 'Failed to add dish with file';
                console.error('Error in addDishWithFile:', err);
                throw err;
            }
        },
        async updateDishWithFile(id, formData) {
            try {
                console.log('FormData in updateDishWithFile:', Object.fromEntries(formData));
                const response = await api.put(`/api/menu/menu-items/upload/${id}`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
                const index = this.allDishes.findIndex((d) => d.id === id);
                if (index !== -1) {
                    this.allDishes[index] = {
                        ...this.allDishes[index],
                        ...response.data,
                        portion: response.data.portion_size !== null ? Number(response.data.portion_size) : null,
                    };
                }
                await this.fetchMenu();
            } catch (err) {
                this.error = err.response?.data?.message || 'Failed to update dish with file';
                console.error('Error in updateDishWithFile:', err);
                throw err;
            }
        },
        async deleteDish(id) {
            try {
                await api.delete(`/api/menu/${id}`);
                this.allDishes = this.allDishes.filter((d) => d.id !== id);
            } catch (err) {
                this.error = err.response?.data?.message || 'Failed to delete dish';
                console.error('Error in deleteDish:', err);
                throw err;
            }
        },
    },
});