import Vue from "vue";
import VueRouter from "vue-router";
import { USUARIO_STORAGE } from "../globals";
Vue.use(VueRouter);

import { routes } from "./routes";
export const router = new VueRouter({
    routes,
    // mode: "history",
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        }
        if (to.hash) {
            return { selector: to.hash };
        }
        return { x: 0, y: 0 };
    }
});

import store from "../store";
router.beforeEach((to, from, next) => {
    // console.log('from: ', from);
    // console.log('to: ', to);
    // #region Actualizando las rutas actuales
    var routeNames = []
    to.matched.forEach(route => {
        // console.log(route.name)
        if (route.name !== '') {
            routeNames.push(route.name);
        }
    });
    store.dispatch('setCurrentRoutes', routeNames)
    // #endregion

    if (to.name !== "ingresar") {
        var usuario = null;
        if (JSON.parse(localStorage.getItem(USUARIO_STORAGE))) {
            usuario = JSON.parse(localStorage.getItem(USUARIO_STORAGE))["usuario"];
        }
        // console.log("Usuario: ", usuario);

        if (!usuario || usuario === "") {
            return next("/ingresar");
        }
    }

    next(true);
});
