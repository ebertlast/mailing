import { USUARIO_STORAGE } from "../../../common/globals";
export default {
    setUsuario: (state, usuario) => {
        state.usuario = usuario;
        localStorage.removeItem(USUARIO_STORAGE);
        localStorage.setItem(USUARIO_STORAGE, JSON.stringify({ usuario: usuario }));
    },
    initUsuario: state => {
        if (!localStorage.getItem(USUARIO_STORAGE)) {
            state.usuario = {};
        } else {
            state.usuario = JSON.parse(localStorage.getItem(USUARIO_STORAGE))[
                "usuario"
            ];
        }
    },
    setToken: (state, token) => {
        var usuario = null;
        if (JSON.parse(localStorage.getItem(USUARIO_STORAGE))) {
            usuario = JSON.parse(localStorage.getItem(USUARIO_STORAGE))["usuario"];
        }
        if (usuario) {
            state.usuario = JSON.parse(localStorage.getItem(USUARIO_STORAGE))[
                "usuario"
            ];
            state.usuario.TOKEN = token;
            localStorage.removeItem(USUARIO_STORAGE);
            localStorage.setItem(
                USUARIO_STORAGE,
                JSON.stringify({ usuario: state.usuario })
            );
        }
    },
    clearUsuario: state => {
        state.usuario = {};
        if (JSON.parse(localStorage.getItem(USUARIO_STORAGE))) {
            localStorage.removeItem(USUARIO_STORAGE);
            // router.push('/ingresar')
        }
    }
};
