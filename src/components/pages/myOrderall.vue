<template>
    <div>
        <van-list v-model="loading" :finished="finished" :offset="300" @load="onload">
           <div :class="[item.type == 4 ? 'opc' : '','item']" v-for="(item,index) in info" :key="index" @click="$router.push({name:'payingDetail',params:{id:item.id,type:item.state}})">
            <div class="pic">
                <img :src="item.titleImg |picUrl">
            </div>
            <div class="txt">
                <p class="price">￥{{item.totalPrice}}</p>
                <p class="tit">{{item.title}}</p>
                <p class="con">{{item.info}}</p>
                <p class="orderNum">订单编号:&nbsp;<span>{{item.orderCode}}</span></p>
                <p class="time">{{item.createTime |getTimeStyle}}</p>
                <div class="label clearFix" v-if="item.state == 0">
                    <span :class="[i.type == 2 ? 'cancel' : '', i.type == 3? 'pay' : '','fr']" v-for="(i,n) in tab[0]" :key="n"  @click.stop="cancel(i.type,index)">
                                {{i.label}}
                            </span>
                </div>
                <div class="label clearFix" v-if="item.state == 1">
                    <span :class="[i.type == 2 ? 'cancel' : '', i.type == 3? 'pay' : '','fr']" v-for="(i,n) in tab[1]" :key="n">
                                {{i.label}}
                            </span>
                </div>
                <div class="label clearFix" v-if="item.state == 2">
                    <span :class="[i.type == 2 ? 'cancel' : '', i.type == 3? 'pay' : '','fr']" v-for="(i,n) in tab[2]" :key="n">
                                {{i.label}}
                            </span>
                </div>
                <div class="label clearFix" v-if="item.state == 3">
                    <span :class="[i.type == 2 ? 'cancel' : '', i.type == 3? 'pay' : '','fr']" v-for="(i,n) in tab[3]" :key="n">
                                {{i.label}}
                    </span>
                </div>
                <div class="label clearFix" v-if="item.state == 4">
                    <span :class="[i.type == 2 ? 'cancel' : '', i.type == 3? 'pay' : '','fr']" v-for="(i,n) in tab[4]" :key="n">
                                {{i.label}}
                    </span>
                </div>
            </div>
        </div>
        </van-list>
        
    </div>
</template>

<script>
import { url_34, url_37, url_40 } from "../../serviceAPI.config.js";
import { imgUrl, getTimeS } from "@/filter/filter.js";
export default {
  filters: {
    picUrl(url) {
      return imgUrl(url);
    },
    getTimeStyle(time) {
      return getTimeS(time);
    }
  },
  data() {
    return {
      loading: false,
      finished: false,
      pageNum: 1,
      tab: [
        [
          {
            label: "待付款",
            type: 1
          },
          {
            label: "立即付款",
            type: 3
          },
          {
            label: "取消",
            type: 2
          }
        ],
        [
          {
            label: "待评价",
            type: 1
          },
          {
            label: "待出游",
            type: 1
          },
          {
            label: "退款",
            type: 1
          }
        ],
        [
          {
            label: "待评价",
            type: 1
          }
        ],
        [
          {
            label: "已退款",
            type: 1
          }
        ],
        [
          {
            label: "已完成",
            type: 1
          }
        ]
      ],
      info: []
    };
  },
  methods: {
    cancel(type, idx) {
      if (type == 2) {
        this.$dialog
          .confirm({
            message: "确定取消本次订单？",
            showCancelButton: true,
            confirmButtonText: "确定"
          })
          .then(() => {
            this.axios({
              method: "post",
              data: {
                id: this.info[idx].id
              },
              url: url_37
            }).then(res => {
              if (res.data.code == 100) {
                this.info.splice(idx, 1);
                this.$toast({
                  message: "取消成功",
                  duration: 1000
                });
              }
            });
          })
          .catch(() => {});
      }
      if (type == 3) {
        this.$router.push({
          name: "payStyle",
          params: { id: this.info[idx].id }
        });
      }
    },
    onload() {
      this.axios({
        method: "get",
        params: {
          pageNum: this.pageNum,
          userId: JSON.parse(localStorage["user"]).id,
          state: null
        },
        url: url_34
      }).then(res => {
        if (res.data.code == 100) {
          console.log(res);
          this.pageNum++;
          for (let item of res.data.data) {
            item.titleImg = item.titleImg.split(",")[0];
          }
          this.info = this.info.concat(res.data.data);
          this.loading = false;
          this.$toast.clear();
          if (res.data.data.length < 10) {
            this.$toast({
              message: "官人，没有更多数据啦",
              duration: "500"
            });
            this.finished = true;
          }
        }
      });
    }
  },
  destroyed() {
    localStorage.removeItem("order");
  },
  created() {
    localStorage.setItem("order", "0");
    this.$toast.loading({
      mask: true,
      message: "加载中...",
      // duration: "50000"
      duration: "50000"
    });
  }
  // mounted(){
  // }
};
</script>

<style scoped lang="less">
.opc {
  opacity: 0.2;
}
.item {
  display: flex;
  width: 7.1rem;
  justify-content: center;
  margin: 0.2rem auto 0;
  background-color: white;
  border-radius: 0.2rem;
  .pic {
    width: 1.6rem;
    img {
      width: 1.22rem;
      height: 1.22rem;
      margin-top: 0.2rem;
      border-radius: 0.2rem;
      transform: translateY(0.5rem);
    }
  }
  .txt {
    width: 5rem;
    padding-right: 0.2rem;
    text-align: left; // margin-right: 0.1rem;
    font-family: PingFang-SC-Medium;
    .price {
      padding-top: 0.2rem;
      padding-right: 0.1rem;
      font-family: PingFang-SC-Medium;
      font-size: 0.3rem;
      color: #ff4f4f;
      font-weight: bold;
      text-align: right;
    }
    .tit {
      font-weight: bold;
      font-family: PingFang-SC-Medium;
      font-size: 0.3rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .con {
      margin-top: 0.08rem;
      font-family: PingFang-SC-Medium;
      font-size: 0.24rem;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      display: -moz-box;
      -moz-line-clamp: 2 !important;
      -moz-box-orient: vertical;
    }
    .orderNum {
      margin-top: 0.1rem;
      font-weight: bold;
      font-size: 0.24rem;
      span {
        font-weight: normal;
        font-family: PingFang-SC-Regular;
      }
    }
    .time {
      font-size: 0.24rem;
    }
    .label {
      margin: 0.15rem 0 0.2rem;
      span {
        font-size: 0.24rem;
        font-weight: bold;
        background-color: #dcdcdc;
        padding: 0.08rem 0.12rem;
        border-radius: 0.2rem;
        margin-left: 0.2rem;
      }
      .cancel {
        background-color: #ff7979 !important;
        color: white;
      }
      .pay {
        background-color: #1296db;
        color: white;
      }
    }
  }
}
</style>