import axios from "axios";
import join from "url-join";
import { URL_API } from "../globals";
import { default as store } from "../store";
import { router } from "../router";
// #region Incrustar Token en las solicitudes
var isAbsoluteURLRegex = /^(?:\w+:)\/\//;
axios.interceptors.request.use(function (config) {
    if (!isAbsoluteURLRegex.test(config.url)) {
        config.url = join(URL_API, config.url);
    }
    // alert(config.url);
    // console.log(config.url);
    var token = store.getters.usuario.token || null;
    // console.log(token)
    if (token) {
        config.headers["authorization"] = "Bearer " + token;
    }
    config.headers["Expires"] = "-1";
    return config;
});
// #endregion

// #region interceptar las Respuestas
axios.interceptors.response.use(
    response => {
        // console.log(
        //     "*************************************************************"
        // );

        // console.log("Ebert: ", response);
        if (response.data.success === false && response.data.message) {
            store.dispatch("notificacion", {
                message: response.data.message,
                type: "info"
            });
        }
        if (response.data.logout && response.data.logout === true) {
            router.push({ name: "ingresar" });
        }
        if (response.data.token && response.data.token !== "") {
            // console.log(store.getters.usuario.usuario)
            // alert(response.data.token);
            store.dispatch("setToken", response.data.token || response.data.TOKEN);
            // alert('')
        }
        return response.data;
    },
    error => {
        // alert("ezerpa");
        if (error.response) {
            if (error.response.status === 401 || error.response.status === 403) {
                // dispatch('logOut')
                // notify('Session expired')
                // alert('Session expired')

                store.dispatch("notificacion", {
                    message: "Session expired",
                    type: "info"
                });
                if (error.response.data.logout) {
                    router.push({ name: "ingresar" });
                }
            } else if (error.response.status === 404) {
                store.dispatch("notificacion", {
                    message: `El servidor web responsable de aceptar las peticiones a la URL (${
                        error.response.config.url
                        }) no está en funcionamiento o hay problemas de conexión ó la URL se enlazó de forma incorrecta`,
                    type: "error"
                });
                // alert(`El servidor web responsable de aceptar las peticiones a la URL (${error.response.config.url}) no está en funcionamiento o hay problemas de conexión ó la URL se enlazó de forma incorrecta`)
            } else if (error.response.status === 500) {
                console.log(error.response);
                var errorCode = error.response.data.error.code || "500";
                var errorMessage = undefined;
                try {
                    if (error.response.data.error.originalError.info.message) {
                        var errorMessage = error.response.data.error.originalError.info.message
                    }
                } catch (ex) {
                    errorMessage = undefined;
                }
                if (!errorMessage)
                    errorMessage =
                        (error.response.data.error.originalError
                            ? error.response.data.error.originalError.message
                            : undefined) ||
                        error.response.data.error.message ||
                        error.response.data.error || error.response.data.error.originalError.info.message;
                // alert(errorMessage);
                store.dispatch("notificacion", {
                    message: `Error en el servidor ([${errorCode}] - ${errorMessage})`,
                    type: "error"
                });
            } else {
                // console.log(error.response.data)
                if (
                    (error.response.data.success === false &&
                        error.response.data.message) ||
                    error.response.data.error
                ) {
                    store.dispatch("notificacion", {
                        message: error.response.data.message || error.response.data.error,
                        type: "error"
                    });
                } else {
                    store.dispatch("notificacion", {
                        message: error.response,
                        type: "error"
                    });
                    console.log(error.response);
                    return Promise.reject(error.response);
                }
            }
        } else if (error.request) {
            // console.log('error: ', error)
            // notify('Server down')
            // alert('Server down')
            store.dispatch("notificacion", {
                message: "Server down",
                type: "error"
            });
        } else {
            // notify('Unexpected error')
            // alert('Unexpected error')
            store.dispatch("notificacion", {
                message: `Unexpected error: ${error}`,
                type: "error"
            });
        }
    }
);
// #endregion

export const http = axios;
