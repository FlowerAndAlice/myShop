// 引入mlckjs
import Mock from 'mockjs';
// 引入json数据
import banner from "./banner.json"
import flower from "./floor.json"

Mock.mock("/mock/banner", { code: 200, data: banner })
Mock.mock("/mock/flower", { code: 200, data: flower })