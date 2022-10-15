<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 分类的面包屑 -->
            <li class="with-x" v-if="searchParams.categoryName">
              {{ searchParams.categoryName }}
              <i @click="removeCategoryName">x</i>
            </li>
            <!-- 关键字的面包屑 -->
            <li class="with-x" v-if="searchParams.keyword">
              {{ searchParams.keyword }}
              <i @click="removeKeyword">x</i>
            </li>
            <!-- 品牌名的面包屑 -->
            <li class="with-x" v-if="searchParams.trademark">
              {{ searchParams.trademark.split(":")[1] }}
              <i @click="removeTrademark">x</i>
            </li>
            <!-- 售卖属性的面包屑 -->
            <li
              class="with-x"
              v-for="(attrValue, index) in searchParams.props"
              :key="index"
            >
              {{ attrValue.split(":")[1] }}
              <i @click="removeAttrInfo(index)">x</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector
          @getTrademark="getTrademark"
          @getAttrInfo="getAttrInfo"
        />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <!-- 排序, asc:升序,desc:降序 -->
              <ul class="sui-nav">
                <li
                  :class="{ active: isActive1 }"
                  @click.prevent="toggleOrder('1')"
                >
                  <a href="#"
                    >综合
                    <span
                      v-show="isActive1"
                      class="iconfont"
                      :class="{
                        'icon-arrowup': isAsc,
                        'icon-arrowdown': !isAsc,
                      }"
                    ></span>
                  </a>
                </li>
                <li
                  :class="{ active: !isActive1 }"
                  @click.prevent="toggleOrder('2')"
                >
                  <a href="#"
                    >价格
                    <span
                      v-show="!isActive1"
                      class="iconfont"
                      :class="{
                        'icon-arrowup': isAsc,
                        'icon-arrowdown': !isAsc,
                      }"
                    ></span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 销售产品列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li
                class="yui3-u-1-5"
                v-for="(good, index) in goodsList"
                :key="good.id"
              >
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link
                      :to="{ name: 'detail', params: { skuid: good.id } }"
                      target="_blank"
                      ><img :src="good.defaultImg"
                    /></router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥ </em>
                      <i>{{ good.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                      >{{ good.title }}</a
                    >
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器 -->
          <Pagination
            :pageSize="searchParams.pageSize"
            :pageNo="searchParams.pageNo"
            :total="total"
            :continues="5"
            @getPageNo="getPageNo"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import SearchSelector from "./SearchSelector/SearchSelector";
export default {
  name: "Search",

  components: {
    SearchSelector,
  },
  data() {
    return {
      // 带给服务器的参数
      searchParams: {
        // 一级分类id
        category1Id: "",
        // 二级分类id
        category2Id: "",
        // 三级分类id
        category3Id: "",
        // 分类名
        categoryName: "",
        // 关键字
        keyword: "",
        // 排序,初始状态应该是 综合| 降序
        order: "1:desc",
        // 代表分页器是当前第几页
        pageNo: 1,
        // 每页展示数据的个数
        pageSize: 3,
        //  其他售卖属性的参数
        props: [],
        // 品牌
        trademark: "",
      },
    };
  },
  // 组件挂载完毕之前执行一次
  beforeMount() {
    Object.assign(this.searchParams, this.$route.query, this.$route.params);
  },
  mounted() {
    // 发起请求之前将searchParams参数改为要传的值
    this.getData();
  },
  computed: {
    // ...mapState("searchAbout", ["searchList"]),
    // ...mapState("searchAbout", []),
    ...mapGetters("searchAbout", [
      "attrsList",
      "goodsList",
      "trademarkList",
      "total",
    ]),
    isActive1() {
      return this.searchParams.order.split(":")[0] == "1";
    },
    isAsc() {
      return this.searchParams.order.split(":")[1] == "asc";
    },
  },
  methods: {
    // 向服务器发请求获取search模块数据(根据参数不同返回不同的数据进行展示)
    // 将请求封装为函数,需要时调用即可
    getData() {
      this.$store.dispatch("searchAbout/getSearchInfo", this.searchParams);
    },
    removeCategoryName() {
      this.searchParams.categoryName = undefined;
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
      // 路由跳转后,route变化,已经调用getData函数
      // this.getData();
      // 地址栏location需要修改,进行路由跳转(现在暂时跳自己)
      // 只需删除qyery,因此如有params参数,需带上
      this.$router.push({ name: "search", params: this.$route.params });
    },
    removeKeyword() {
      this.searchParams.keyword = undefined;
      this.$bus.$emit("clear");
      this.$router.push({ name: "search", query: this.$route.query });
    },
    // 接收品牌参数
    getTrademark(trademark) {
      this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`;
      this.getData();
    },
    // 删除品牌面包屑并重发请求
    removeTrademark() {
      this.searchParams.trademark = undefined;
      this.getData();
    },
    // 接收售卖属性参数
    getAttrInfo(args) {
      let props = `${args[0].attrId}:${args[1]}:${args[0].attrName}`;
      if (this.searchParams.props.indexOf(props) == -1) {
        this.searchParams.props.push(props);
        this.getData();
      }
    },
    // 删除某个售卖属性面包屑
    removeAttrInfo(index) {
      this.searchParams.props.splice(index, 1);
      this.getData();
    },
    // 排序操作
    toggleOrder(flag) {
      // flag形参,标记用户点击的是综合(1),价格(2)
      // let originOrder = this.searchParams.order;
      let tempFlag = this.searchParams.order.split(":")[0];
      let tempSort = this.searchParams.order.split(":")[1];
      // 当前的 排列依据 和 排列顺序
      // if (flag == "1") {
      //   if (tempFlag == 1) {
      //     if (tempSort == "asc") {
      //       this.searchParams.order = "1:desc";
      //     } else {
      //       this.searchParams.order = "1:asc";
      //     }
      //   } else {
      //     this.searchParams.order = this.searchParams.order.replace("2", "1");
      //   }
      // } else {
      //   if (tempFlag == 2) {
      //     if (tempSort == "asc") {
      //       this.searchParams.order = "2:desc";
      //     } else {
      //       this.searchParams.order = "2:asc";
      //     }
      //   } else {
      //     this.searchParams.order = this.searchParams.order.replace("1", "2");
      //   }
      // }
      let newOrder = "";
      if (flag == tempFlag) {
        newOrder = `${flag}:${tempSort == "asc" ? "desc" : "asc"}`;
      } else {
        newOrder = `${flag}:${tempSort}`;
      }
      this.searchParams.order = newOrder;
      this.getData();
    },
    // 接收分页器参数
    getPageNo(pageNo) {
      this.searchParams.pageNo = pageNo;
      this.getData();
    },
  },
  watch: {
    $route(v1, v2) {
      Object.assign(this.searchParams, this.$route.query, this.$route.params);
      this.getData();
      // 每次请求后,置空相应的分类id
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>