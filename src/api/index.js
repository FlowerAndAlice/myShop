//  该模块的作用是对所有的api接口进行统一管理
import requests from "./ajax";
import mockRequests from "./mockAjax";

// 三级联动接口
//  api/product/getBaseCategoryList  , GET,无参数

export const reqCategoryList = () =>
    // 发请求,返回的是promise对象
    requests({
        url: '/product/getBaseCategoryList',
        method: 'get',
    })


// 获取home首页轮播图banner
export const reqGetBannerList = () =>
    // 发请求,返回的是promise对象
    mockRequests.get('/banner');

// 获取floor数据
export const reqGetFloorList = () =>
    // 发请求,返回的是promise对象
    mockRequests.get("/floor");

// 获取搜索模块的数据
export const reqSearchInfo = (params) =>
    requests({
        url: "/list",
        method: "post",
        data: params,
    })