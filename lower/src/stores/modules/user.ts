import { defineStore } from 'pinia';

const getToken = () => {
    return sessionStorage.getItem('token')
}
const setToken = (token: string) => {
    return sessionStorage.setItem('token', token)
}

const getUser = () => {
    return sessionStorage.getItem('userdata')
}
const setUser = (userdata: string) => {
    return sessionStorage.setItem('userdata', userdata)
}


export const useUserStore= defineStore('user',{
    state:()=>({
        token: getToken() as string,
        userdata:getUser() as any,
    }),
    getters:{
        getToken: (state) => state.token,
        getUserData: (state) => state.userdata,
    },
    actions:{
        setToken(token: string) {
            this.token = token;
            setToken(token);
        },
        setUserData(userdata: any) {
            this.userdata = userdata;
            setUser(userdata);
        },


        login(userinfo:any){
            let json = {
                token: "SKJFLJFLJFLF1231YIKNKBKHKLJHLKJLKJLKGKJHHGJKHHGKJvjsljflls",
                username:'系统管理员',
                pid:100010,
                phone:userinfo.phone,
            }
            this.setToken(json.token)
            this.setUserData(JSON.stringify(json))
        },
        resetAll() {
            this.setToken("");
            this.setUserData({});
            sessionStorage.clear();
        },

    }

})