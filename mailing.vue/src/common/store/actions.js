export default {
    animarDiv: ({ commit }, idDiv, animation = "shake") => {
        $("#" + idDiv)
            .removeClass()
            .addClass(animation + " animated")
            .one(
                "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
                function () {
                    $(this).removeClass();
                }
            );
    },
    /**
     * Despliegue de mensajes tipo notificaciones >> https://notifyjs.com/
     * @param message Mensaje que se mostrará en el cuerpo de la notificación
     * @param type Tipo de notificación: success [default] (verde), error (rojo), warning (amarillo), info (azul))
     * @param positionClass Posición de la pantalla donde se desplegará la notificación: top-right, bottom-right  (Default), bottom-left,
     * top-full-width, bottom-full-width, top-center, bottom-center
     */
    notificacion({ commit }, payload) {
        var noty = this._vm.$root.$noty;
        payload.type = payload.type || "success";
        switch (payload.type) {
            case "success":
                noty.success(payload.message);
                break;
            case "error":
                noty.error(payload.message);
                break;
            case "warning":
                noty.warning(payload.message);
                break;
            case "info":
                noty.info(payload.message);
                break;
            default:
                // Basic
                noty.show(payload.message);
                break;
        }
    },
    setCurrentRoutes: ({ commit }, payload) => {
        commit("setCurrentRoutes", payload);
    },
    setCurrent: ({ commit }, payload) => {
        commit("setCurrent", payload);
    },
    setNav: ({ commit }, payload) => {
        commit("setNav", payload);
    },
};
