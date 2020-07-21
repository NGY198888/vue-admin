import Vue from 'vue'
import App from './App.vue'
//使用vuex
import store from './store'


import 'reset-css';

import router from './router';

//使用element-ui库
import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';//element全局样式
import   'rest';

//国际化
import VueI18n from 'vue-i18n'
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
Vue.use(VueI18n)
const messages = {
  en: {
    message: 'hello',
    ...enLocale // 或者用 Object.assign({ message: 'hello' }, enLocale)
  },
  zh: {
    message: '你好',
    ...zhLocale // 或者用 Object.assign({ message: '你好' }, zhLocale)
  }
}
// Create VueI18n instance with options
const i18n = new VueI18n({
  locale: 'zh', // set locale
  messages, // set locale messages
})

Vue.use(Element, { 
   size: 'medium',
   zIndex: 3000 ,
   i18n: (key, value) => i18n.t(key, value)
  });


// Vue.prototype.$message = Element.Message;
Vue.config.productionTip = false
new Vue({
  render: h => h(App),
  store,
  router,
  i18n,
}).$mount('#app')
