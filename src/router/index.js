import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    // {
    //   path: "/:pseudo",
    //   name: "nav",
    //   props: true,
    //   component: () => import("@/components/Nav.vue"),
    // },
    {
      path: "/inscription",
      name: "inscription",
      component: () => import("@/views/Inscription.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/Login.vue"),
    },
    {
      path: "/vente-article",
      name: "vente-article",
      component: () => import("@/views/VenteArticle.vue"),
    },
    {
      path: "/profil/:id",
      name: "profil",
      props: true,
      component: () => import("@/views/Profil.vue"),
    },
    {
      path: "/admin",
      name: "admin",
      component: () => import("@/views/Admin.vue"),
    },
    {
      path: "/articles/:id",
      name: "ArticleById",
      props: true,
      component: () => import("@/views/ArticleById.vue"),
    },
    {
      path: "/categories",
      name: "categories",
      component: () => import("@/views/Categorie.vue"),
    },
    // Redirect 404
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: () => import("@/views/NotFound.vue"),
    },
  ],
});

export default router;
