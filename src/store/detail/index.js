 import { reqGetItemList } from "../../api"

 const detailAbout = {
     namespaced: true,
     state: {
         itemList: {},
     },
     actions: {
         async getItemList({ commit }, skuid) {
             let result = await reqGetItemList(skuid);
             if (result.code == 200) {
                 console.log();
                 commit('GETITEMLIST', result.data)
             }
         }
     },
     mutations: {
         GETITEMLIST(state, itemList) {
             state.itemList = itemList
         }
     },
     getters: {

         categoryView(state) {
             // 没有则返回空对象
             return state.itemList.categoryView || {}
         },
         skuInfo(state) {
             return state.itemList.skuInfo || {}
         },
         spuSaleAttrList(state) {
             return state.itemList.spuSaleAttrList || []
         }
     },
 }

 export default detailAbout