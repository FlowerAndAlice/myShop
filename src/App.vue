<template>
  <div id="app">
    <myHeader />
    <!-- 路由组件展示处 -->
    <router-view></router-view>
    <!-- 在Home、Search显示,在登录,注册隐藏 -->
    <myFooter v-show="$route.meta.showFooter" />
  </div>
</template>

<script>
import myHeader from "./components/myHeader";
import myFooter from "./components/myFooter";
export default {
  name: "App",
  components: { myHeader, myFooter },
  computed: {},
  // 组件挂载完毕,可以向服务器发请求
  mounted() {
    // 通知Vuex发请求,获取数据,存储于仓库中
    this.$store.dispatch("homeAbout/categoryList");
    console.log(1);
  },
};
</script>

<style>
/* body {
  background: url("./assets/images/shooter.jpg") no-repeat;
  background-size: cover;
  background-attachment: fixed;
} */
</style>
