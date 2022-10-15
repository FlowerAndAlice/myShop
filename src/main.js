import Vue from 'vue'
import App from './App.vue'


// 引入路由
import router from "@/router"
// 引入store
import store from './store';
// 注册全局组件
import TypeNav from "@/components/TypeNav";
import Carousel from "@/components/Carousel"
import Pagination from "@/components/Pagination"

Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)
Vue.component(Pagination.name, Pagination)


// 引入mockServer.js的数据
import '@/mock/mockServe.js'

// 引入swiper包
import 'swiper/css/swiper.css';

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
    //注册路由(ES6简写),组件就有了$route和$router属性
    router,
    // 注册store仓库,组件就有了$store属性
    store,
    beforeCreate() {
        Vue.prototype.$bus = this;
    },
}).$mount('#app')