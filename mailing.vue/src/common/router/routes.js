import { default as modules } from "../../modules";

export const routes = [];

modules.ppal.routes.forEach(route => {
    routes.push(route);
});

