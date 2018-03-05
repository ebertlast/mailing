export default {
    usuario: state => {
        return state.usuario;
    },
    nombreUsuario: state => {
        return state.usuario.nombre.substr(0, state.usuario.nombre.indexOf(" "));
    },
    avatar: state => {
        var url = "src/assets/global/img/avatars/user-default.jpg";
        // if (state.usuario.IDIMAGEN != "") {
        //     var byteArray = new Uint8Array(state.usuario.IMAGEN.data);
        //     var blob = new Blob([byteArray]);
        //     url = window.URL.createObjectURL(blob);
        // }
        return url;
    }
}
