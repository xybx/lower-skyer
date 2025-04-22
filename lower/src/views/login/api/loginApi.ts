import request from '@/utils/request';
import axios from 'axios';






// token验证
export const checkLoginApi = (token: string) => {
    const requestToken = axios.create({ baseURL: window.apiURL });
    requestToken.interceptors.request.use(
        (config: any) => {
            config.headers.Authorization = token;
            return config;
        },
        (error) => {
            Promise.reject(error);
        }
    );
    return requestToken({
        method: 'GET',
        url: '/login/fuqing/auth',
    });
};