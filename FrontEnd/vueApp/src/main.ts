import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";
import CollectionGrid from "./components/CollectionGrid.vue";
import Create from "./Admin/Create.vue";
import LoginForm from "./Login/LoginForm.vue";
import SignUp from "./Login/SignUp.vue";
import ProductPage from "./components/ProductPage.vue";
import HomePage from "./components/HomePage.vue";

//Import Pinia into your config file
import { createPinia } from "pinia";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/collection", name: "collection", component: CollectionGrid },
    { path: "/admin/create", name: "createCollection", component: Create },
    { path: "/login", name: "LoginForm", component: LoginForm },
    { path: "/signup", name: "signUp", component: SignUp },
    {
      path: `/product/${window.location.href.split("/product/")[1]}`,
      name: "ProductPage",
      component: ProductPage,
    },
    { path: "", name: "home", component: HomePage },
  ],
});
createApp(App)
  //Add the line below to the file to instantiate it
  .use(createPinia())
  .use(router)
  .mount("#app");
