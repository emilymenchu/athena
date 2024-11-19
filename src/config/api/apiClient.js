import axios from 'axios';
import { BASE_URL } from './constants/apiRoutes';

const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
});

apiClient.interceptors.request.use(
    (config) => {
        if (!config.url.includes('/auth/login')) {
            const tokenString = sessionStorage.getItem('token');
            if (tokenString) {
                try {
                    const token = JSON.parse(tokenString)?.jwt;

                    if (token) {
                        config.headers['Authorization'] = `Bearer ${token}`;
                    }
                } catch (error) {
                    console.error('Error parsing token from sessionStorage:', error);
                }
            }
        }
        console.log('Axious Request Config: ', config)
        return config;
    },
    (error) => Promise.reject(error)
);

export default apiClient;