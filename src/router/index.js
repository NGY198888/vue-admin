import Vue from "vue";
import Router from "vue-router";

//引入layout级别的组件
// import HelloWorld from '../components/HelloWorld';
// import store from '../store';
import LoginView from 'views/LoginView';
import AdminView from 'views/AdminView';
import NoFoundView from 'views/NoFoundView';

import LocalStore from '@/utils/LocalStore';

Vue.use(Router);

const router = new Router({
    // scrollBehavior() {
    //   return { x: 0, y: 0 };
    // },
    //routes数组
    routes: [
        {
            path: "/login",
            name: "login",
            component: LoginView,
            meta: {
                isPublic: true
            }
        },
    //   {
    //     path: "/login",
    //     name: "login",
    //     component: Login,
    //   },
      {
        path: "/",
        component: AdminView,
        children: [ ]
      },
      {
        path: "*",
        component: NoFoundView,
        children: [ ]
      }
    ]
  });
  //拦截
  router.beforeEach((to, from, next) => {
    if (! LocalStore.get("token",null) && !to.meta.isPublic) {
      return next({path: '/login'})
    }
    next()
  })
  
  export default router;