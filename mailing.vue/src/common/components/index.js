const Datatable = resolve => {
    require.ensure(['./Datatable.vue'], () => {
        resolve(require('./Datatable.vue'))
    }, 'common')
}
const Delete = resolve => {
    require.ensure(['./Delete.vue'], () => {
        resolve(require('./Delete.vue'))
    }, 'common')
}

import { default as site } from './site';
export default {
    Sidebar: site.Sidebar,
    HeaderContent: site.HeaderContent,
    Navbar: site.Navbar,
    SidebarRight: site.SidebarRight,
    SidebarRight: site.FooterView,
    Datatable, Delete
}