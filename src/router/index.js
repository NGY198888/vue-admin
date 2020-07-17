import Vue from "vue";
import Router from "vue-router";

//引入layout级别的组件
import HelloWorld from '../components/HelloWorld';

Vue.use(Router);

const router = new Router({
    // scrollBehavior() {
    //   return { x: 0, y: 0 };
    // },
    //routes数组
    routes: [
        {
            path: "/",
            name: "indexxx",
            component: HelloWorld,
        },
    //   {
    //     path: "/login",
    //     name: "login",
    //     component: Login,
    //   },
    //   {
    //     path: "/",
    //     component: Layout,
    //     children: [ ]
    //   }
    ]
  });
  //拦截
  // router.beforeEach((to, from, next) => {
  //   // if (!store.state.auth.token && !to.meta.isPublic) {
  //   if (!to.meta.isPublic) {
  //     return next({name: 'login'})
  //   }
  //   next()
  // })
  
  export default router;