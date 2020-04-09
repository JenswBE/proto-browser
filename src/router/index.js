import Vue from "vue";
import VueRouter from "vue-router";
import Load from "../views/Load.vue";
import Render from "../views/Render.vue";

Vue.use(VueRouter);

const routes = [{
        path: "/",
        name: "Load",
        component: Load,
    },
    {
        path: "/render",
        name: "Render",
        component: Render,
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;