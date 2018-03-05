export default {
    setCurrentRoutes: (state, currentRoutes) => {
        state.currentRoutes = currentRoutes;
    },
    setCurrent: (state, current) => {
        state.current = current;
    },
    setNav: (state, navs) => {
        state.nav = navs;
    }
};
