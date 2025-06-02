import { defineStore } from 'pinia'

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
        initializeFromLocalStorage() {
            const storedToken = localStorage.getItem('token')
            const storedUser = localStorage.getItem('user')

            if (storedToken && storedUser) {
                this.token = storedToken
                this.user = JSON.parse(storedUser)
            }
        },
        setAuthData(token, user) {
            this.token = token
            this.user = user
            localStorage.setItem('token', token)
            localStorage.setItem('user', JSON.stringify(user))
        },
        logout() {
            this.token = null
            this.user = null
            localStorage.removeItem('token')
            localStorage.removeItem('user')
        }
    }
})
