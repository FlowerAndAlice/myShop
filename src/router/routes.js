// 路由的配置信息

//引入路由组件
import Home from "@/views/Home"
import Search from "@/views/Search"
import Login from "@/views/Login"
import Register from "@/views/Register"
import Detail from "@/views/Detail"


export default [{
    path: "/home",
    component: Home,
    meta: { showFooter: true }
}, {
    path: "/search/:keyword?",
    name: "search",
    component: Search,
    meta: { showFooter: true },
    // props: ($route) => ({ keyword: $route.params.keyword })
}, {
    path: "/login",
    component: Login
}, {
    path: "/register",
    component: Register
}, {
    path: '/detail/:skuid',
    name: 'detail',
    component: Detail,
    meta: { showFooter: true }
}, {
    path: "/",
    redirect: "/home"
}, ]