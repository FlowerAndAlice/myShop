import Vue from 'vue'
import App from './App.vue'

// 注册TypeNav全局组件
import TypeNav from "@/components/TypeNav";
Vue.component(TypeNav.name, TypeNav)

// 引入路由
import router from "@/router"
// 引入store
import store from './store';


Vue.config.productionTip = false

new Vue({
    render: h => h(App),
    //注册路由(ES6简写),组件就有了$route和$router属性
    router,
    // 注册store仓库,组件就有了$store属性
    store,
}).$mount('#app')