import { createWebHistory, createRouter } from "vue-router";
import Home from "../components/Home.vue";
import Serie from "../components/Series.vue"
import Personajes from "../components/Personajes.vue"
import Create from "../components/Create.vue"
import Update from "../components/Update.vue"

const myRoutes = [
    { path: "/", component: Home},
    { path: "/create", component: Create},
    { path: "/update", component: Update},
    { path: "/series/:serie", component: Serie},
    { path: "/series/:serie/personajes", component: Personajes},
]

const router = createRouter({
    history: createWebHistory(),
    routes: myRoutes
})

export default router