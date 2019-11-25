import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/countRoll",
      name: "countRoll",
      component: () => import('@/components/countRoll')
    },
    {
      path: "/antV7",
      name: "ant-v7",
      component: () => import('@/components/antV7')
    },
    {
      path: "/antg2",
      name: "ant-g2",
      component: () => import('@/components/antg2test')
    },
    {
      path: "/amap",
      name: "amap",
      component: () => import('@/components/amap')
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    }
  ]
});
