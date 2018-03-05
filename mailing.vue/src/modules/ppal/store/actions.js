export default {
    setUsuario: ({ commit }, usu) => {
        commit("setUsuario", usu);
    },
    initUsuario: ({ commit }) => {
        commit("initUsuario");
    },
    setToken: ({ commit }, token) => {
        // alert(token)
        commit("setToken", token);
    },
    clearUsuario: ({ commit }) => {
        commit("clearUsuario");
    }
}