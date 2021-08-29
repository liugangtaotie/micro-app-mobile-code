export default [
  // router redirect
  {
    path: "/",
    redirect: "/home",
  },
  // home
  {
    path: "/home",
    meta: {
      requiresAuth: true,
      keepAlive: false,
      title: "home",
    },
    component: () => import("@VIE/home/index.vue"),
  },
  {
    // 👇👇 非严格匹配，/sub-first/* 都将匹配到 SubFirst组件
    path: "/sub-first",
    name: "sub-first",
    component: () => import(/* webpackChunkName: "sub-first" */ "@VIE/sub-first.vue"),
  },
  {
    path: "/vite",
    name: "vite",
    component: () => import(/* webpackChunkName: "vite" */ "@VIE/vite.vue"),
  },
  // about
  {
    path: "/about",
    meta: {
      requiresAuth: true,
      keepAlive: false,
      title: "about",
    },
    component: () => import("@VIE/about/index.vue"),
  },
  // tabs-two
  {
    path: "/tabTwo",
    meta: {
      requiresAuth: true,
      keepAlive: false,
      title: "tabTwo",
    },
    component: () => import("@VIE/tabs/tabTwo.vue"),
  },
  // tabs-three
  {
    path: "/tabThree",
    meta: {
      requiresAuth: true,
      keepAlive: false,
      title: "tabThree",
    },
    component: () => import("@VIE/tabs/tabThree.vue"),
  },
  // tabs-four
  {
    path: "/tabFour",
    meta: {
      requiresAuth: true,
      keepAlive: false,
      title: "tabFour",
    },
    component: () => import("@VIE/tabs/tabFour.vue"),
  },
];
