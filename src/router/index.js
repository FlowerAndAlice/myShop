// 引入插件
import Vue from "vue";
import VueRouter from "vue-router";
// 引入配置项
import routes from "./routes"

// 使用插件
Vue.use(VueRouter);

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
    routes,
    scrollBehavior(to, from, savedPosition) {
        // 返回的y:0 代表滚动条在最上方,默认单位px
        return { y: 0 }
    }
})