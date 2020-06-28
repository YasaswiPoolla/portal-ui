import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

function loadView(view) {
  return () =>
    import(/* webpackChunkName: "view-[request]" */ `&views/${view}.vue`);
}
const routes = [
  {
    path: "/login/",
    component: loadView("Login"),
    meta: {
      title: "Portal Login",
      requireLogin: false
    }
  },
  {
    path: "/register/",
    component: loadView("Registration"),
    meta: {
      title: "Portal Registration",
      requireLogin: false
    }
  },
  {
    path: "/home",
    component: loadView("Navigation"),
    children: [
      {
        path: "/home",
        component: loadView("Home"),
        meta: {
          title: "Worldline Portal",
          requireLogin: false
        }
      },
      {
        path: "/profile/",
        component: loadView("Profile"),
        meta: {
          title: "My Profile",
          requireLogin: false
        }
      },
      {
        path: "/trips/",
        component: loadView("MyTrips"),
        meta: {
          title: "My Trips",
          requireLogin: false
        }
      }
    ]
  },

  { path: "/", redirect: "/login" }
];

const router = new VueRouter({
  mode: "history",
  base: "/",
  routes
});

router.beforeEach((to, from, next) => {
  let authRequired = to.meta.requireLogin;
  if (authRequired) {
    //pass
  } else {
    document.title = to.meta.title;
    next();
  }
});
export default router;
