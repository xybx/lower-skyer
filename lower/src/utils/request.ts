import axios from 'axios';
import router from '@/router';
import { stringify } from 'qs';
import { useUserStore } from "@/stores/modules/user";

const request = axios.create({ baseURL: window.apiURL });

// 请求拦截
request.interceptors.request.use(
    (config: any) => {
        const {token} = useUserStore();
        if (token) config.headers.Authorization = `${token}`;
        if (config.data && config.headers["Content-Type"] === "application/x-www-form-urlencoded;charset=UTF-8")
            config.data = stringify(config.data);
        return config;
    },
    (error) => {
       return Promise.reject(error);
    }
);

const handleData = (response):Promise<any> =>{
    const { resetAll } = useUserStore();
    let code = response.data && response.data.code ? response.data.code : response.status
    switch (code){
        case 200:
            return response.data
        case 401:
            resetAll().then(() =>{
                router.push('/login');
            })
        case 403:
            resetAll().then(() =>{
                router.push('/login');
            })
    }
}

// 响应拦截
request.interceptors.response.use(
    (res) => handleData(res),
    (error) => {
        const { response } = error;
        if (response === undefined) {
            ElMessage.error("网络连接异常");
            return {};
        } else return handleData(response);
        // Promise.reject(error);
    }
);
export default request;
