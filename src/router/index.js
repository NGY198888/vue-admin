import Vue from "vue";
import Router from "vue-router";

//引入layout级别的组件
// import HelloWorld from '../components/HelloWorld';
// import store from '../store';
import LoginView from 'views/LoginView';
import LogoutView from 'views/LogoutView';
import WebView from 'views/WebView';
import AdminView from 'views/AdminView';
import NoFoundView from 'views/NoFoundView';
import TableView from '@/views/components/TableView';
import FormView from '@/views/components/FormView';
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
         children: [ 
          {
            path: "/rest/:resource",
            component: TableView, 
          },
          {
            path: "/form/:resource",
            component: FormView, 
          },
          {
            path: "/logout",
            component: LogoutView, 
          },
          {
            path: "/webview/:resource",//嵌套外部网址
            component: WebView, 
          },
          {
            path: "*",
            component: NoFoundView,
          }
        ]
      },
      {
        path: "*",
        component: NoFoundView,
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
  // 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
export default router;