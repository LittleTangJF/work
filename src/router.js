import Vue from "vue";
import Router from "vue-router";
import Home from './views/home'
Vue.use(Router);
export default new Router({
  // base: '/discovery/',
  routes: [
    {
      path: "/",
      redirect: "/list"
    },
    {
      path: "/",
      name: "home",
      component: Home,
      children: [
        {
          path: "/list",
          name: "list",
          component: () => import("./views/information/List"),
            // meta: { keepAlive: true }
        }
      ]
    }
  ]
});