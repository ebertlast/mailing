const Home = resolve => {
    require.ensure(
        ["./home/Index.vue"],
        () => {
            resolve(require("./home/Index.vue"));
        },
        "ppal"
    );
};
const Ingresar = resolve => {
    require.ensure(
        ["./ingresar/Index.vue"],
        () => {
            resolve(require("./ingresar/Index.vue"));
        },
        "ppal"
    );
};
const Mails = resolve => {
    require.ensure(
        ["./mails/MailList.vue"],
        () => {
            resolve(require("./mails/MailList.vue"));
        },
        "mails"
    );
};
const CargarArchivos = resolve => {
    require.ensure(
        ["./mails/Index.vue"],
        () => {
            resolve(require("./mails/Index.vue"));
        },
        "mails"
    );
};
const ConfigurarEmail = resolve => {
    require.ensure(
        ["./mails/Configuracion.vue"],
        () => {
            resolve(require("./mails/Configuracion.vue"));
        },
        "mails"
    );
};
const GenerarCodigo = resolve => {
    require.ensure(
        ["./cgen/Index.vue"],
        () => {
            resolve(require("./cgen/Index.vue"));
        },
        "cgen"
    );
};
const Terceros = resolve => {
    require.ensure(
        ["./tercero/List.vue"],
        () => {
            resolve(require("./tercero/List.vue"));
        },
        "tercero"
    );
};
const Plantillas = resolve => {
    require.ensure(
        ["./plantilla/Index.vue"],
        () => {
            resolve(require("./plantilla/Index.vue"));
        },
        "plantilla"
    );
};
// console.log(GenerarCodigo)
export default {
    Home, Ingresar, Mails, ConfigurarEmail, GenerarCodigo, Terceros, CargarArchivos, Plantillas
};