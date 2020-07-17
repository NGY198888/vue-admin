import axios from 'axios';
import Vue from 'vue'
import  store from "../store";
import  types from "../store/types";
const API_URI = process.env.VUE_APP_API_URL || '/admin/api/'
global.API_URI = API_URI
axios.defaults.baseURL = API_URI
console.log('axios',store,types);
axios.interceptors.request.use( (config)=> {
    //令牌，加载中
    // config.headers.Authorization = 'Bearer ' + store.state.auth.token
    console.log('设置请求参数',config);
    store.commit(types.START_LOADING)
    return config;
}, function (error) {
    return Promise.reject(error);
});

axios.interceptors.response.use( (response)=> {
    console.log("response",response);
    store.commit(types.STOP_LOADING)
    return response;
}, 
 ({response}) =>{
    console.log("response err",response);
    store.commit(types.STOP_LOADING)
    Vue.prototype.$message.error(response.statusText);
    switch(response.status){
        case 401:
            //未授权，去登录
            break;
        default:
            //提示错误
            break;
    }
    
    return Promise.reject(response);
});
Vue.prototype.$http = axios
export default axios