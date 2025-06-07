import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
    state: () => ({
        token: null,
        user: null,
    }),
    getters: {
        isLoggedIn: (state) => !!state.token,
        isAdmin: (state) => state.user?.role === 'admin',
    },
    actions: {
        initializeFromStorage() {
            const storedToken = sessionStorage.getItem('token');
            const storedUser = sessionStorage.getItem('user');
            if (storedToken && storedUser) {
                this.token = storedToken;
                this.user = JSON.parse(storedUser);
            }
        },
        setAuthData(token, user) {
            this.token = token;
            this.user = user;
            sessionStorage.setItem('token', token);
            sessionStorage.setItem('user', JSON.stringify(user));
        },
        logout() {
            this.token = null;
            this.user = null;
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('user');
        },
    },
});
