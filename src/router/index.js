// 引入插件
import Vue from "vue";
import VueRouter from "vue-router";

// 使用插件
Vue.use(VueRouter);

//引入路由组件
import Home from "@/pages/Home"
import Search from "@/pages/Search"
import Login from "@/pages/Login"
import Register from "@/pages/Register"

// 先把vueRouter原型对象的push,先保存下来
let originPush = VueRouter.prototype.push;

//  第一个参数 : 告诉原来的push方法,往哪里跳+传递哪些参数
VueRouter.prototype.push = function(location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject);
    } else {
        originPush.call(this, location, () => {}, (error) => { console.log(error); })
    }
}

let originReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function(location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject);
    } else {
        originReplace.call(this, location, () => {}, (e) => { console.log(e); });

    }
}



// 配置路由
export default new VueRouter({
    // 配置项
    routes: [{
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
        path: "/",
        redirect: "/home"
    }],
})