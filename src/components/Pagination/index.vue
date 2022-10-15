<template>
  <div class="pagination">
    <!-- 上方部分 -->
    <button :disabled="pageNo == 1" @click="sendPageNo(pageNo - 1)">
      上一页
    </button>
    <button
      v-show="startNumAndEndNum.start > 1"
      @click="sendPageNo(1)"
      :class="{ active: pageNo == 1 }"
    >
      1
    </button>
    <button v-show="startNumAndEndNum.start > 2">···</button>

    <!-- 中间部分 -->
    <button
      v-for="(page, index) in startNumAndEndNum.end"
      :key="index"
      v-show="page >= startNumAndEndNum.start"
      @click="sendPageNo(page)"
      :class="{ active: pageNo == page }"
    >
      {{ page }}
    </button>

    <!-- 下方部分 -->
    <button v-show="startNumAndEndNum.end < totalPage - 1">···</button>
    <button
      v-show="startNumAndEndNum.end < totalPage"
      @click="sendPageNo(totalPage)"
      :class="{ active: pageNo == totalPage }"
    >
      {{ totalPage }}
    </button>
    <button :disabled="pageNo == totalPage" @click="sendPageNo(pageNo + 1)">
      下一页
    </button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
    <!-- <div style="font-size: 26px; font-weight: bold">
      {{
        "start:" +
        startNumAndEndNum.start +
        ", end:" +
        startNumAndEndNum.end +
        "--------当前页码" +
        pageNo
      }}
    </div> -->
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ["pageSize", "pageNo", "total", "continues"],
  data() {
    return {};
  },
  computed: {
    // 总共多少页
    totalPage() {
      return Math.ceil(this.total / this.pageSize);
    },

    // 计算出连续页码的起始与结束数字
    startNumAndEndNum() {
      let { continues, pageNo } = this;
      let start = 0,
        end = 1;

      // 连续页码数字5,即至少要5页,若不够5页即不正常情况
      if (continues > this.totalPage) {
        start = 1;
        end = this.totalPage;
      } else {
        let between = parseInt(continues / 2);
        start = pageNo - between;
        end = pageNo + between;

        // 纠正不正常的页码
        if (start < 1) {
          start = 1;
          end = continues;
        }
        if (end > this.totalPage) {
          start = this.totalPage - continues + 1;
          end = this.totalPage;
        }
      }
      return { start, end };
    },
  },
  methods: {
    sendPageNo(pageNo) {
      this.$emit("getPageNo", pageNo);
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    border: 0;
    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }
    &.active {
      cursor: not-allowed;
      background-color: pink;
      color: #fff;
    }
  }
}
</style>