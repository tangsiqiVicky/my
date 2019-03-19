<template>
    <div class="orderDetail" ref="orderDetail">
        <order-back titLeft="订单"></order-back>
        <div class="info">
            <div class="con">
                <div class="img">
                    <img :src="info.titleImg |picUrl">
                </div>
                <div class="txt">
                    <h3>{{info.title}}</h3>
                    <div class="dec">
                        {{info.info}}
                    </div>
                    <p class="price">
                        ￥{{info.price}}
                    </p>
                </div>
            </div>
            <div class="rating clearFix" v-if="type == 2">
                <span class="fl">评价：</span>
                <div class="v-r fl">
                    <div class="v-rat">
                        <el-rate v-model="rating"></el-rate>
                    </div>
                </div>
            </div>
             <div class="rating clearFix" v-if="type == 4">
                <span class="fl">评价：</span>
                <div class="v-r fl">
                    <div class="v-rat">
                        <el-rate :disabled="isRe" v-model="rated"></el-rate>
                    </div>
                </div>
            </div>
            <div class="count clearFix">
                <p class="allp fr">
                    小计:&nbsp;<span>{{info.price*info.num}}</span>
                </p>
                <p class="alln fr">共<span>{{info.num}}</span>件商品</p>
            </div>
        </div>
        <div class="orderNum">
            <p class="p1">
                订单编号：<span>{{info.orderCode}}</span>
            </p>
            <p class="p2" v-if="type != 1">
                付款时间：<span>{{info.createTime |getTimeStyle}}</span>
            </p>
        </div>
        <div class="person">
            <p class="p1">
                所选套餐:<span>{{info.startCombo}}</span>
            </p>
            <p class="p2">
                出发时间:<span>{{info.startDate |getTimeStyleS}}</span>
            </p>
            <p class="p3">
                出发地:<span>{{info.startPlace}}</span>
            </p>
        </div>
        <div class="person" v-for="(item,index) in info.orderUser" :key="index">
            <p class="p1">
                收货人:<span>{{item.userName}}</span>
            </p>
            <p class="p2">
                证件号码:<span>{{item.userCard.substr(0,item.userCard.length-4)+"****"}}</span>
            </p>
            <p class="p3" v-if="index ==(info.orderUser.length-1)">
                手机号:<span>{{phone}}</span>
            </p>
        </div>
        <div class="wrap5">

        </div>
        <div class="ifShow">
            <div class="pay" v-if="type == 0">
                <p class="pay1">
                    合计：<span>{{info.price*info.num}}</span>
                </p>
                <p class="pay2" @click="cancel">
                    取消订单
                </p>
                <p class="pay3" @click="paying">
                    立即付款
                </p>
            </div>
            <div class="pay clearFix" v-if="type == 1">
                <p class="pay4">
                    合计：<span>{{info.price*info.num}}</span>
                </p>
                <p class="pay3 fr" @click="backMoney">
                    立即退款
                </p>
            </div>
            <div class="evl" v-if="type == 2" @click="evl">
                确定
            </div>
            <div class="pay" v-if="type == 3">
                <p class="pay4">
                    合计：<span>{{info.price*info.num}}</span>
                </p>
                <p class="pay5">
                    已退款
                </p>
            </div>
            <div class="pay" v-if="type == 4">
                <p class="pay4">
                    合计：<span>{{info.price*info.num}}</span>
                </p>
                <p class="pay5">
                    已完成
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import orderBack from "@/components/component/orderBack";
import { url_35, url_36, url_37, url_45,url_47 } from "../../serviceAPI.config.js";
import { imgUrl, getTimeS,getTimeSS } from "@/filter/filter.js";
export default {
  components: {
    orderBack
  },
  filters: {
    picUrl(url) {
      return imgUrl(url);
    },
    getTimeStyle(time) {
      return getTimeS(time);
    },
    getTimeStyleS(times) {
      return getTimeSS(times);
    }
  },
  data() {
    return {
      id: null,
      type: null,
      info: {},
      rating: null, //未评价
      rated: null, //已评价
      isRe: true,
      phone: JSON.parse(localStorage["user"]).phone,
      zhifu: null
    };
  },
  created() {
    this.$toast.loading({
      mask: true,
      message: "加载中...",
      // duration: "50000"
      duration: "50000"
    });
    if (this.$route.params.id) {
      this.id = this.$route.params.id;
      this.type = this.$route.params.type;
      localStorage.setItem("evlId", this.$route.params.id);
      localStorage.setItem("evlType", this.$route.params.type);
    } else {
      this.id = localStorage["evlId"];
      this.type = localStorage["evlType"];
    }
    this.axios({
      method: "get",
      url: url_36,
      params: {
        id: this.id
      }
    }).then(res => {
      if (res.data.code == 100) {
        console.log(res);
        this.$toast.clear();
        res.data.data.titleImg = res.data.data.titleImg.split(",")[0];
        this.info = res.data.data;
        this.rated = res.data.data.level;
        this.zhifu = res.data.data.payFrom;
      }
    });
  },
  methods: {
    paying() {
      this.$router.push({ name: "payStyle", params: { id: this.id } });
    },
    cancel() {
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
              id: this.info.id
            },
            url: url_37
          }).then(res => {
            if (res.data.code == 100) {
              this.$toast.success({
                message: "取消成功",
                duration: 1000
              });
              setTimeout(res => {
                this.$router.push({ name: "all" });
              }, 1000);
            }else{
               this.$toast.fail({
                message:res.data.msg,
                duration: 1000
              });
            }
          });
        })
        .catch(() => {});
    },
    backMoney() {
      this.$dialog
        .confirm({
          message: "确定退款？",
          showCancelButton: true,
          confirmButtonText: "确定"
        })
        .then(() => {
          if (this.zhifu == "支付宝") {
            this.axios({
              method: "post",
              data: {
                id: this.id
              },
              url: url_45
            }).then(res => {
              if (res.data.code == 100) {
                this.$toast.success({
                  message: "退款成功",
                  duration: 1000
                });
                this.$router.push({ name: "cancel" });
              }else{
                 this.$toast.fail({
                  message: res.data.msg,
                  duration: 1000
                });
              }
            });
          }else {
             this.axios({
              method: "post",
              data: {
                id: this.id
              },
              url: url_47
            }).then(res => {
              if (res.data.code == 100) {
                this.$toast.success({
                  message: "退款成功",
                  duration: 1000
                });
                this.$router.push({ name: "cancel" });
              }else{
                 this.$toast.fail({
                  message: res.data.msg,
                  duration: 1000
                });
              }
            });
          }
        })
        .catch(() => {});
    },
    //评价
    evl() {
      if (this.rating) {
        console.log(this.rating);
        this.axios({
          method: "post",
          data: {
            id: this.id,
            level: this.rating
          },
          url: url_35
        }).then(res => {
          if (res.data.code == 100) {
            this.$toast({
              message: "评价成功",
              duration: 800
            });
            setTimeout(res => {
              this.$router.push({ name: "all" });
            }, 800);
          }
        });
      } else {
        this.$toast({
          message: "请选择评价等级",
          duration: 800
        });
      }
    }
  },
  mounted() {
    var heig = document.documentElement.getBoundingClientRect().height;
    // console.log(heig)
    this.$nextTick(
      res => (this.$refs.orderDetail.style.minHeight = `${heig}px`)
    );
  }
};
</script>

<style scoped lang="less">
@wid71: 7.1rem;
.orderDetail {
  background-color: #f6f6f7;
  .info {
    width: @wid71;
    margin: 0.2rem auto 0;
    padding-top: 0.25rem;
    border-radius: 0.2rem;
    background-color: white;
    .con {
      // height: 1.47rem;
      display: flex;
      padding: 0.21rem 0.35rem 0.17rem 0.23rem;
      border-top: 1px solid rgb(238, 238, 238);
      border-bottom: 1px solid rgb(238, 238, 238);
      .img {
        width: 1.51rem;
        height: 1.47rem;
        margin-right: 0.2rem;
        img {
          display: block;
          width: 1.51rem;
          height: 1.47rem;
        }
      }
      .txt {
        position: relative;
        width: 4.8rem;
        text-align: left;
        h3 {
          font-family: PingFang-SC-Regular;
          font-size: 0.24rem;
          color: #1b1b1b;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .dec {
          font-family: PingFang-SC-Medium;
          font-size: 0.2rem;
          line-height: 1.2;
          color: #717171;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          display: -moz-box;
          -moz-line-clamp: 2 !important;
          -moz-box-orient: vertical;
        }
        @media screen and(max-width:299px) {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          -webkit-line-clamp: 1;
        }
        .price {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          font-family: PingFang-SC-Medium;
          font-size: 0.3rem;
          color: #ff4f4f;
        }
      }
    }
    .count {
      height: 0.69rem;
      line-height: 0.69rem;
      font-family: PingFang-SC-Medium;
      font-size: 0.3rem;
      .allp {
        margin-right: 0.21rem;
        span {
          color: #ff5555;
        }
      }
      .alln {
        margin-right: 0.33rem;
      }
    }
    .rating {
      height: 0.69rem;
      line-height: 0.69rem;
      font-family: PingFang-SC-Medium;
      font-size: 0.3rem;
      color: #010101;
      border-bottom: 1px solid #eee;
      span {
        padding-left: 0.52rem;
        padding-right: 0.4rem;
      }
      .v-r {
        position: relative;
        width: 4rem;
        height: 0.69rem;
        .v-rat {
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%); //    height: 20px;
        }
      }
    }
  }
  .orderNum {
    width: @wid71;
    line-height: 0.8rem;
    margin: 0.2rem auto 0;
    background-color: white;
    border-radius: 0.2rem;
    font-family: PingFang-SC-Medium;
    font-size: 0.24rem;
    color: #010101;
    text-indent: 0.31rem;
    text-align: left;
    p {
      height: 0.8rem;
      box-sizing: border-box;
      border-bottom: 1px solid #eee;
    }
    p.p2 {
      border: none;
    }
  }
  .person {
    width: @wid71;
    margin: 0.2rem auto 0.2rem;
    background-color: white;
    line-height: 0.8rem;
    font-family: PingFang-SC-Regular;
    font-size: 0.24rem;
    text-indent: 0.31rem;
    text-align: left;
    color: #1b1b1b;
    border-radius: 0.2rem;
    p {
      height: 0.8rem;
      span {
        padding-left: 0.2rem;
      }
    }
    .p1 {
      border-bottom: 1px solid rgb(238, 238, 238);
      box-sizing: border-box;
    }
    .p2 {
      border-bottom: 1px solid rgb(238, 238, 238);
      box-sizing: border-box;
    }
  }
  .wrap5 {
    height: 1rem;
  }
  .ifShow {
    .pay {
      display: flex;
      position: fixed;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 1rem;
      line-height: 1rem;
      text-align: center;
      font-family: PingFang-SC-Medium;
      font-size: 0.36rem;
      border-top: 1px solid #eee;
      background-color: white;
      .pay1 {
        flex: 1;
        color: black;
        span {
          color: #f55;
        }
      }
      .pay2 {
        width: 2.18rem;
        color: white;
        background-color: #ccc;
      }
      .pay3 {
        width: 2.18rem;
        background-color: #f55;
        color: white;
      }
      .pay4 {
        flex: 1;
        color: black;
        text-align: left;
        text-indent: 0.4rem;
        span {
          color: #f55;
        }
      }
      .pay5 {
        width: 2.18rem;
        background-color: #ccc;
        color: white;
      }
    }
    .tvl {
      position: fixed;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 1rem;
      line-height: 1rem;
      text-align: center;
      font-family: PingFang-SC-Medium;
      font-size: 0.36rem;
      border-top: 1px solid #eee;
      background-color: white;
      .tv3 {
        width: 2.18rem;
        height: 100%;
        background-color: #f55;
        color: white;
      }
    }
    .evl {
      position: fixed;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 1rem;
      line-height: 1rem;
      text-align: center;
      font-family: PingFang-SC-Medium;
      font-size: 0.36rem;
      border-top: 1px solid #eee;
      color: black;
      background-color: white;
    }
  }
}
</style>