import Vue from 'vue'
import App from './App.vue'
import VueLazyload from 'vue-lazyload'
import loading from '@/assets/images/loading.gif'
// 在图片界面没有进入到可视范围前不加载, 在没有得到图片前先显示loading图片
Vue.use(VueLazyload, { // 内部自定义了一个指令lazy
    loading, // 指定未加载得到图片之前的loading图片
})


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