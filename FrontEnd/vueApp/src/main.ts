import { createApp } from 'vue'
import { createRouter,createWebHistory } from 'vue-router'
import App from './App.vue'
import CollectionGrid from './components/CollectionGrid.vue';
import Create from './Admin/Create.vue'

//Import Pinia into your config file
import { createPinia } from 'pinia'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path:'/collection',name: 'collection', component: CollectionGrid },
        { path:'/admin/create',name: 'createCollection', component: Create }
    ]
})
createApp(App)
//Add the line below to the file to instantiate it
.use(createPinia()).use(router)
.mount('#app')