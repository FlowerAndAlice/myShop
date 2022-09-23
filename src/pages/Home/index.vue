<template>
  <div>
    <!-- 三级联动全局组件 -->
    <TypeNav />
    <ListContainer />
    <Recommand />
    <Rank />
    <Like />
    <Floor v-for="(floor, index) in floorList" :key="floor.id" :floor="floor" />
    <Brand />
  </div>
</template>

<script>
import ListContainer from "./ListContainer";
import Recommand from "./Recommand";
import Rank from "./Rank";
import Like from "./Like";
import Floor from "./Floor";
import Brand from "./Brand";
import { mapState } from "vuex";
export default {
  name: "Home",
  components: { ListContainer, Recommand, Rank, Like, Floor, Brand },
  data() {
    return {};
  },
  methods: {},
  mounted() {
    this.$store.dispatch("homeAbout/GetFloorList");
  },
  computed: {
    ...mapState("homeAbout", ["floorList"]),
  },
};
</script>

<style>
</style>