import axios from 'axios';
import Vue from 'vue'
import  store from "../store";
import router from '../router';
import  types from "../store/types";
import _ from 'lodash';
const API_URI = process.env.VUE_APP_API_URL || '/admin/api/'
global.API_URI = API_URI
axios.defaults.baseURL = API_URI
console.log('axios',store,types);
axios.interceptors.request.use( (config)=> {
    //令牌，加载中
    config.headers.Authorization = 'Bearer ' + store.state.auth.token
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
    store.commit(types.STOP_LOADING)
    if (!response) {
        Vue.prototype.$message.error(`服务器'${axios.defaults.baseURL}'不可访问，请检查`);
    }else{
        let data =response.data;
        let msg = _.get(data, 'message', _.get(data, 'error.message', _.get(data, '0.message',_.get(response, 'statusText'))))
        if (Array.isArray(msg)) {
          msg = msg[0].message
        }
        switch(response.status){
            case 401:
                //未授权，去登录
                Vue.prototype.$message.error('您尚未登录');
                router.replace('/login');
                break;
            default:
                //提示错误
                Vue.prototype.$message.error(msg);
                break;
        }
    }
    return Promise.reject(response);
});
Vue.prototype.$http = axios
export default axios