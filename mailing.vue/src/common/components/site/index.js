const Sidebar = resolve => {
    require.ensure(['./Sidebar.vue'], () => {
        resolve(require('./Sidebar.vue'))
    }, 'common')
}
const HeaderContent = resolve => {
    require.ensure(['./Header.vue'], () => {
        resolve(require('./Header.vue'))
    }, 'common')
}
const Navbar = resolve => {
    require.ensure(['./Navbar.vue'], () => {
        resolve(require('./Navbar.vue'))
    }, 'common')
}
const SidebarRight = resolve => {
    require.ensure(['./SidebarRight.vue'], () => {
        resolve(require('./SidebarRight.vue'))
    }, 'common')
}
const FooterView = resolve => {
    require.ensure(['./Footer.vue'], () => {
        resolve(require('./Footer.vue'))
    }, 'common')
}

export default {
    Sidebar, HeaderContent, Navbar, SidebarRight, FooterView
}