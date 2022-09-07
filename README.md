# shop

### Footer组件的显示隐藏

* 在Home、Search显示Footer组件,在登录、注册时隐藏
* 方法: v-if / v-show

***

### 总结

* 路由传递参数( 对象写法 ) path是否可以结合params参数一起使用?

  答: 单独写path不写name时, 不能使用params参数

* 已在index.js的路由配置中进行接收params参数占位后,若不传params参数,跳转后,路径会出问题

  答: 在占位时,在参数后添加一个问号,代表可传可不传
  
* 在params中传入空串时,也会有路径问题

  答: 使用undefined,即传参时传入 \'xxx\' \|\|  undefined 

* 路由组件如何传递**props数据**?     答: 可以

  * 布尔值写法 : 在index.js中,添加props:true配置,即可在路由组件中用props:[\'xx\']获取外部的params属性,该方法只能传params参数

  * 对象写法: 配置props为对象,进行额外传参,如props:{a:1,b:2}

  * 函数写法 : 可以把params参数和query参数传递给路由组件

    ```
    props:($route)=>{
       return {bigMsg:$route.query.Msg, Msg:$route.params.Msg} 
    }
    ```

* 进度条

  * 结构 : 下载＋引入nprogress, 
  * 样式: 引入nprogress/nprogress.css
  * 调用: 引入后 , nprogress.start()代表进度条开始, nprogress.done()代表结束

* Vuex模块化开发

  * 在/store中分别新建不同的模块的状态管理文件,如home/index.js
  * 在/store/index.js引入各模块的小仓库,并将暴露的配置对象改为modules:{home,search...}
