// Getters Vuex Superior
export default {
    appname: state => {
        return state.appname;
    },
    companyname: state => {
        return state.companyname;
    },
    yearscopyrigth: state => {
        return state.yearscopyrigth;
    },
    isUpperCase: state => str => {
        let result = str
            .split("")
            .map(letter => /[A-Z]/.test(letter))
            .reduce((a, b) => a + b);

        return result === str.length;
    },
    getColumnsName: state => arr => {
        var columnas = [];
        for (var i = 0; i < 1; i++) {
            for (let key in arr[i]) {
                columnas.push(key);
            }
        }
        return columnas;
    },
    getColumnsNameTitles: state => arr => {
        var columnas = [];
        for (var i = 0; i < 1; i++) {
            for (let key in arr[i]) {
                var result = key
                    .split("")
                    .map(letter => /[A-Z]/.test(letter))
                    .reduce((a, b) => a + b);
                var titulo = key;
                if (result === key.length) {
                    // console.log('Todas son mayusculas: ', key)
                    titulo = key.toLowerCase().replace(/(^|\s)[a-z]/g, function (a) {
                        return a.toUpperCase();
                    });
                } else if (result > 0) {
                    titulo = key[0];
                    // console.log('Hay letras mayusculas: ', key)
                    for (let i = 1; i < key.length; i++) {
                        const letra = key[i];
                        if (
                            letra
                                .split("")
                                .map(letter => /[A-Z]/.test(letter))
                                .reduce((a, b) => a + b)
                        ) {
                            // console.log(letra)
                            // key.splice(i, 0, ' ')
                            titulo += " ";
                        }
                        titulo += letra;
                    }
                }
                columnas.push(titulo);
            }
        }
        return columnas;
    },
    logo: state => {
        return state.logo;
    },
    logo_white: state => {
        return state.logo_white;
    },
    webpage: state => {
        return state.webpage;
    },
    version: state => {
        return state.version;
    },
    current: state => {
        return state.current;
    },
    nav: state => {
        return state.nav;
    },
    currentRoutes: state => {
        return state.currentRoutes;
    }
};
