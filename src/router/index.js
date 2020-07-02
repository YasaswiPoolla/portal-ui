import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";

Vue.use(VueRouter);

function loadView(view) {
  return () =>
    import(/* webpackChunkName: "view-[request]" */ `&views/${view}.vue`);
}
const routes = [
  {
    path: "/login",
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
          requireLogin: true
        }
      },
      {
        path: "/profile/",
        component: loadView("Profile"),
        meta: {
          title: "My Profile",
          requireLogin: true
        }
      },
      {
        path: "/trips/",
        component: loadView("MyTrips"),
        meta: {
          title: "My Trips",
          requireLogin: true
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
  let token = sessionStorage.getItem("t");
  if (authRequired) {
    if (token) {
      store
        .dispatch("user/inspectToken")
        .then(() => {
          document.title = to.meta.title;
          next();
        })
        .catch(() => {
          return next("/login");
        });
    } else {
      return next("/login");
    }
  } else {
    document.title = to.meta.title;

    next();
  }
});

router.afterEach((to, from) => {
  if (to.path !== "/login") {
    sessionStorage.setItem("lastPath", to.path);
  }
});

export default router;
