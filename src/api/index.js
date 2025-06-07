import axios from 'axios';
import { useUserStore } from '@/store/user';

const api = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
});

api.interceptors.request.use(
    (config) => {
        const userStore = useUserStore();
        const token = userStore.token;
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            const userStore = useUserStore();
            userStore.logout();
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;