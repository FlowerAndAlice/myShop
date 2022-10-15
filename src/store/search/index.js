// search的小仓库

import { reqSearchInfo } from "../../api"


const searchAbout = {
    namespaced: true,
    state: {
        searchList: {}
    },
    actions: {
        // params默认值为空对象
        async getSearchInfo({ commit }, params) {
            let result = await reqSearchInfo(params)
            if (result.code == 200) {
                commit('GETSEARCHINFO', result.data)
            }
        }
    },
    mutations: {
        GETSEARCHINFO(state, searchList) {
            state.searchList = searchList;
        }
    },
    getters: {
        attrsList(state) {
            //假如没拿到数据,或者用户没网,前者是undefined,则使用默认值空数组
            return state.searchList.attrsList || []
        },
        goodsList(state) {
            return state.searchList.goodsList || []
        },
        trademarkList(state) {
            return state.searchList.trademarkList || []
        },
        total(state) {
            return state.searchList.total
        }

    },
}
export default searchAbout