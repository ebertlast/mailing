import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import { default as actions } from "./actions";
import { default as getters } from "./getters";
import { default as mutations } from "./mutations";
import { default as states } from "./states";

// #region Módulos
import { default as modules } from "../../modules";
// #endregion
export default new Vuex.Store({
    actions: actions,
    getters: getters,
    mutations: mutations,
    state: states,
    modules: {
        ppal: modules.ppal.store,
        // kcentral: modules.kcentral.store,
        // kseg: modules.kseg.store
        // principal: principal.store
    }
});
