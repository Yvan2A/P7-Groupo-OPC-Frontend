import { createRouter, createWebHistory } from "vue-router";
import HomeAuthPage from "../views/HomeAuthPage.vue";
import FeedPage from "../views/FeedPage.vue";
import EditPostPage from "../views/EditPostPage.vue";

const routes = [
  {
    path: "/",
    name: "homeAuth",
    component: HomeAuthPage,
  },
  {
    path: "/feed/:userId",
    name: "feed",
    component: FeedPage,
    meta: { requireAuth: true },
  },
  {
    path: "/modifyPost/:idPost",
    name: "modifyPost",
    component: EditPostPage,
    meta: { requireAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Sécurite d'acces au pages
router.beforeEach((to, from, next) => {
  const publicPages = ['/'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('userId');
  if (authRequired && !loggedIn) {
    next('/');
  } else {
    next();
  }
});

export default router;
