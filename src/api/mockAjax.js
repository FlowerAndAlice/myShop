// 对axios进行二次封装
import axios from 'axios';
// 引入nprogress插件
import nProgress from 'nprogress';
// 引入进度条样式
import "nprogress/nprogress.css";
//  start进度条开始 , done进度条结束

// console.log(nProgress);

// 利用axios对象的方法create,来创建一个axios实例
const requests = axios.create({
    // 配置对象
    baseURL: "/mock",
    // 请求超时时间
    timeout: 5000,
});


// 请求拦截器 : 发请求之前,监测到,并做一些事,/处理逻辑之类的
requests.interceptors.request.use((config) => {
    // config: 配置对象,对象里的header请求头属性很重要
    // 进度条开始
    nProgress.start();
    return config
})

requests.interceptors.response.use((res) => {
    // promise成功,进度条结束
    nProgress.done();
    return res.data
}, () => {
    return Promise.reject(new Error("failed"))
})


// 对外暴露
export default requests