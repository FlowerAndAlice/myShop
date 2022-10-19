import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
// 引入小仓库
import homeAbout from "./home"
import searchAbout from "./search"
import detailAbout from "./detail"

// 存数据
const state = {};
// 书写业务逻辑/处理异步
const actions = {};
// 修改state的唯一手段
const mutations = {};
// 理解为计算属性,用于简化仓库数据,组件获取数据更方便
const getters = {};
export default new Vuex.Store({
    modules: {
        homeAbout,
        searchAbout,
        detailAbout
    }
})