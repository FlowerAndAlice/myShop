import { reqCategoryList, reqGetBannerList, reqGetFlowerList } from "../../api";


// home的小仓库

// const state = {
//     categoryList: []
// };

// const actions = {
//     // 调用/api里的接口函数,向服务器发起请求,获取服务器数据
//     async categoryList({ commit }) {
//         let result = await reqCategoryList();
//         if (result.code == 200) {
//             commit("CATEGORYLIST", result.data);
//         }
//     }
// };

// const mutations = {
//     CATEGORYLIST(state, categoryList) {
//         state.categoryList = categoryList
//     }
// };

// const getters = {};

// export default {
//     state,
//     mutations,
//     actions,
//     getters
// }


const homeAbout = {
    namespaced: true,
    state: {
        categoryList: [],
        bannerList: []
    },

    actions: {
        // 调用/api里的接口函数,向服务器发起请求,获取服务器数据
        async categoryList({ commit }) {
            let result = await reqCategoryList();
            if (result.code == 200) {
                commit("CATEGORYLIST", result.data);
            }
        },
        async getBannerList({ commit }) {
            let result = await reqGetBannerList();
            if (result.code == 200) {
                commit("GETBANNERLIST", result.data);
            }
        },

    },

    mutations: {
        CATEGORYLIST(state, categoryList) {
            state.categoryList = categoryList.slice(0, 16)
        },
        GETBANNERLIST(state, bannerList) {
            state.bannerList = bannerList
        }
    },

    getters: {},

}
export default homeAbout