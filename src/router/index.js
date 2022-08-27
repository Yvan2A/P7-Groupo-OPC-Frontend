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
router.beforeEach((to, from, next) =>
{
  // console.log('pas init');
  console.log(to);
  console.log(from);
  const  token  = localStorage.getItem('token');
  console.log(token);
  if ((to.path == '/homeAuth') && token) {
    next('/feed/:userId');
  }
  if ((to.path == '/feed/:userId') && !token) {
    next('/homeAuth');
  }
  
  next();
  
});
export default router;
