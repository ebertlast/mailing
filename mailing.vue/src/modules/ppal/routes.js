import { default as components } from "./components";
export const routes = [
    { path: "/ingresar", component: components.Ingresar, name: "ingresar" },
    {
        path: "/",
        component: components.Home,
        name: "ppal",
        children: [
            { path: "mails", component: components.Mails, name: "mails" },
            { path: "cargarArchivos", component: components.CargarArchivos, name: "cargarArchivos" },
            { path: "cnf/cnfmail", component: components.ConfigurarEmail, name: "cnfmail" },
            { path: "cnf/terceros", component: components.Terceros, name: "terceros" },
            { path: "cnf/plantillas", component: components.Plantillas, name: "plantillas" },
            { path: "dev/cgen", component: components.GenerarCodigo, name: "cgen" }
            // { path: "usgruadd", component: components.UsgruAdd, name: "usgruadd" },
        ]
    },
    // { path: "**", redirect: { name: "cartelera" } }
];
