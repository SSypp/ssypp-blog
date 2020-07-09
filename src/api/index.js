// let base_url = 'http://150.158.182.131:8080/'
import axios from 'axios'
import qs from 'qs'
import store from "@/store/store"
import * as types from "@/store/types"
import router from "@/router/index"

//封装一个tip
const Tip = msg => {
    this.$message({
        showClose:true,
        message:msg,
        type:"warning"
    })
}
let api = "/api/";
if(process.env.NODE_ENV === 'production'){
   api = "http://150.158.182.131:8080/"  
}
//创建一个axios
const serve = axios.create({
    baseURL: api,
    timeout: 4000,
})


//设置post请求头
serve.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

//请求拦截
serve.interceptors.request.use(
    config => {
        const token = store.state.token;
        token && (config.headers.token = token);
        return config
    },
    error => Promise.error(error)
)

//封装不同类型的错误状态码对应不同的提示
const errorHandle = (status,message) => {
    switch (status) {
        //401:未登录
        case 401:
            store.commit(types.LOGOUT);
            router.currentRoute.path !== 'login' && router.replace({path:"login",query:{redirect:router.currentRoute.fullPath}})
            break;
        case 403:
            Tip("登录过期，请重新登录");
            localStorage.removeItem("token");
            store.commit(types.LOGIN,null);
            setTimeout(()=>{
                router.replace({
                    path:"login",
                    query:{
                        redirect:router.currentRoute.fullPath
                    }
                })
            },1000);
            break;
        case 404:
            Tip("请求的资源不存在")
            break;
        default:
            Tip(message)
            break;
    }
}

//响应拦截
serve.interceptors.response.use(
    res => (res.status === 200 ? Promise.resolve(res) : Promise.reject(res)),
    error => {
        const { response } = error;
        if(response){
            errorHandle(response.status,response.data.message);
            return Promise.reject(response)
        }
    }
)

export const get = (url,...params) => {
    return new Promise((resolve,reject) => {
        serve.get(url,{
            params:params
        }).then(res => {
            switch (res.data.code) {
                case 401:
                    store.commit(types.LOGOUT);
                    router.currentRoute.path !== 'login' && router.replace({path:"login",query:{redirect:router.currentRoute.fullPath}})
                    break;
                default:
                    resolve(res.data)
                    break;
            }
        }).catch(err => {
            reject(err.data)
        })
    })
}

export const post = (url, ...params) => {
    return new Promise((resolve,reject) => {
        serve.post(url,qs.stringify(...params)).then(res => {
            switch (res.data.code) {
                case 401:
                    store.commit(types.LOGOUT);
                    router.currentRoute.path !== 'login' && router.replace({path:"login",query:{redirect:router.currentRoute.fullPath}})
                    break;
                default:
                    resolve(res.data)
                    break;
            }
        }).catch(err => reject(err))
    })
}

export const put = (url, ...params) => {
    return new Promise((resolve,reject) => {
        serve.put(url,qs.stringify(...params)).then(res => {
            resolve(res.data)
        }).catch(err => reject(err))
    })
}

export const deleted = (url,...params) => {
    return new Promise((resolve,reject) => {
        serve.delete(url,{
            params:params
        }).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err.data)
        })
    })
}