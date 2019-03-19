<template>
    <div class="pay">
        <div class="top">
            <img class="pic" :src="[info.titleImg ? info.titleImg[0]:''] | picUrl" @click="showImage">
            <img class="topback" src="../../../static/images/jifenback.png" @click="$router.back()">
            <div class="bot">
                限时秒杀 {{info.newTime}}
            </div>
        </div>
        <h3>
            {{info.title?info.title:""}}
        </h3>
        <div class="fea">
            简介
        </div>
        <div class="imgs" v-for="(item,index) in info.img" :key="index">
            <img :src="item |picUrl">
        </div>
        <div class="duihuan">
            <p>
                ￥{{info.price?info.price:""}}
            </p>
            <button @click="gobuy">
                立即购买
            </button>
        </div>
        <van-popup class="pop" v-model="showPop" position="bottom" :overlay="true">
            <div class="pop-con"></div>
            <div class="wraper">
                <div class="contain2"></div>
                <div class="wrap">
                    <div class="top-p">
                        <img class="shopImg" :src="pop.img |picUrl">
                        <div class="tit">
                            {{info.title?info.title:""}}
                        </div>
                        <img class="close" @click="showPop = false" src="../../../static/images/guanbi.png">
                    </div>
                    <div class="contain"></div>
                    <!-- 日期 -->
                    <div class="time">
                        <p>选择出发日期</p>
                        <el-date-picker @change="sendTime" value-format="yyyy-M-d" :editable="enable" :picker-options="pickerOptions1" v-model="value1" type="date" placeholder="选择出发日期">
                        </el-date-picker>
                    </div>
                    <div class="taocan">
                        <van-collapse v-model="activeNames" accordion>
                            <!-- 套餐 -->
                            <div class="chu">
                                <van-collapse-item title="选择套餐" name="1">
                                    <div class="taocan-wrap">
                                        <span :class="{activeClass:index == idx1}" v-for="(item,index) in pop.taocan" :key="index" @click="selectTaocan(index)">
                                                                                    {{item.comboInfo}}
                                                                                </span>
                                    </div>
                                </van-collapse-item>
                                <i class="bdl"></i>
                            </div>
                            <!-- 出发地 -->
                            <div class="chu">
                                <van-collapse-item title="出发地" name="2">
                                    <div class="taocan-wrap">
                                        <span :class="{activeClass:index == idx2}" v-for="(item,index) in pop.address" :key="index" @click="selectAddress(index)">
                                                            {{item.place}}
                                        </span>
                                    </div>
                                </van-collapse-item>
                                <i class="bdl"></i>
                            </div>
                        </van-collapse>
                        <div class="chu1">
                            <div class="tit" @click="ro = !ro">
                                <p class="p1">出发人</p>
                                <p class="p2">请填写出发人信息</p>
                                <i :class="{ir:ro}" class="i3 van-icon van-icon-arrow van-cell__right-icon"></i>
                            </div>
                            <div class="chu1-wrap" v-for="(item,index) in personNum" :key="index" v-show="!ro">
                                <div class="tit">
                                    <p class="p1">姓名</p>
                                    <input type="text" placeholder="请输入出发人姓名" v-model.trim="personNum[index].userName">
                                </div>
                                <div class="tit">
                                    <p class="p1">证件</p>
                                    <input type="text" placeholder="请输入出发人身份证/护照"  v-model.trim="personNum[index].userCard">
                                </div>
                                <div class="contain"></div>
                            </div>
                            <div class="add">
                                <div @click="addPerson">
                                    <img src="../../../static/images/tianjiachufaren.png"><span class="s1">添加购买人</span>
                                </div>
                                <div @click="decrePerson">
                                    <img class="img2" src="../../../static/images/decre5.png"><span>减少购买人</span>
                                </div>
                            </div>
                            <i class="bdl"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div class="dui-cont"></div>
            <div class="duihuan2">
                <p v-if="!over">
                    ￥{{info.price?info.price:""}}
                </p>
                <p v-else>
                    ￥{{priceEnd*personNum.length | moneyFilter}}
                </p>
                <button @click="payStyle">
                            立即购买
                </button>
            </div>
        </van-popup>
    </div>
</template>

<script>
import { url_23, url, url_29,url_40 } from "../../serviceAPI.config.js";
import { ImagePreview } from "vant";
import { imgUrl, getTimeS, toMoney } from "@/filter/filter.js";
export default {
  components: {},
  filters: {
    picUrl(url) {
      return imgUrl(url);
    },
    getTimeStyle(time) {
      return getTimeS(time);
    },
    moneyFilter(money) {
      return toMoney(money);
    }
  },
  data() {
    return {
      id: "",
      info: {},
      timer: null,
      imgUrl: [],
      showPop: false,
      priceEnd: null,
      dateTime:[],
      // personArrName:[],
      // personArrCode:[],
      pop: {
        img: "",
        taocan: [],
        address: [],
        time: [],
        price: {
          timePrice: [],
          taocanPrice: [],
          addPrice: []
        }
      },
      value1: "",
      enable: false,
      pickerOptions1: {
        disabledDate(time) {
          return (
            time.getTime() < Date.now() ||
            time.getTime() > Date.now() + 3600 * 1000 * 24 * 90
          );
        }
      },
      activeNames: ["1"],
      dateNum: 0,
      idx1: 0,
      idx2: 0,
      ro: false,
      personNum: [{ userName: "", userCard: "" }],
      exist: false,
      over: false //所有选型填完之后true
    };
  },
  destroyed() {
    clearInterval(this.timer);
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
      localStorage.setItem("secId", this.$route.params.id);
    } else {
      this.id = localStorage["secId"];
    }
    this.axios({
      method: "get",
      params: {
        id: this.id
      },
      url: url_23
    }).then(res => {
      if (res.data.code == 100) {
        // console.log(res)
        res.data.data.ctp.img = res.data.data.ctp.img.split(",");
        res.data.data.ctp.titleImg = res.data.data.ctp.titleImg.split(",");
        this.info = res.data.data.ctp;
        this.pop.img = this.info.titleImg[0]
        this.timeDown();
        this.$toast.clear();
        this.pop.taocan = res.data.data.ccList;
        for (let item2 of this.pop.taocan) {
          this.pop.price.taocanPrice.push(item2.price);
        }
        this.pop.address = res.data.data.cpList;
        for (let item1 of this.pop.address) {
          this.pop.price.addPrice.push(item1.price);
        }
        this.dateTime = res.data.data.cdList
        for (let item of res.data.data.cdList) {
          this.pop.time.push(this.selectTime(item.startTime));
          this.pop.price.timePrice.push(item.price);
        }
        this.priceEnd = this.info.price;
      }
    });
  },
  methods: {
    gobuy() {
      if (localStorage["Token"]) {
          this.showPop = !this.showPop;
      } else {
        this.$dialog
          .confirm({
            message: "登录才能购买",
            showCancelButton: true,
            confirmButtonText: "去登陆"
          })
          .then(() => this.$router.push("/login"))
          .catch(() => {});
      }
    },
    selectTime(time) {
      let date = new Date(time);
      let yy = date.getFullYear();
      let MM = date.getMonth() + 1;
      let dd = date.getDate();
      let newTime = String(yy) + String(MM) + String(dd);
      return newTime;
    },
    timeDown() {
      this.timer = setInterval(() => {
        var time = new Date().getTime();
        var chuo;
        chuo = this.info.endTime - time;
        if (chuo >= 0) {
          // let dd = Math.floor(chuo / 1000 /60 / 60 /24)
          let hh = Math.floor(chuo / 1000 / 60 / 60);
          let mm = Math.floor((chuo / 1000 / 60) % 60);
          let ss = Math.floor((chuo / 1000) % 60);
          this.info.newTime =
            this.getTime(hh) + ":" + this.getTime(mm) + ":" + this.getTime(ss);
        } else {
          clearInterval(this.timer);
          this.axios({
            method: "post",
            data: {
              id: this.info.id
            },
            url: url_29
          }).then(res => {
            if (res.data.code == 100) {
              // console.log(res)
            }
          });
          this.info.newTime = "失效";
        }
      }, 1000);
    },
    getTime(time) {
      return time < 10 ? "0" + time : time;
    },
    // 展示图片
    showImage() {
      for (let item of this.info.titleImg) {
        item = url + item;
        this.imgUrl.push(item);
      }
      let showI = ImagePreview(this.imgUrl);
    },
    sendTime() {
      this.exist = false;
      let index = 0;
      this.dateNum = 0;
      let nt = this.value1.split("-").join("");
      for (let item of this.pop.time) {
        index++;
        if (parseInt(item) == parseInt(nt)) {
          this.exist = true;
          this.dateNum = index;
        }
      }
      if (this.exist) {
        this.over = true;
        this.priceEnd =
          (parseFloat(this.pop.price.timePrice[this.dateNum - 1]) * 100 +
            parseFloat(this.pop.price.taocanPrice[this.idx1]) * 100 +
            parseFloat(this.pop.price.addPrice[this.idx2]) * 100) /
          100;
      } else {
        this.exist = false;
        this.priceEnd = 0;
        this.$toast({
          message: "您选择的日期没有行程",
          duration: 1000
        });
      }
    },
    selectTaocan(index) {
      this.idx1 = index;
      this.priceEnd =
        (parseFloat(this.pop.price.timePrice[this.dateNum - 1]) * 100 +
          parseFloat(this.pop.price.taocanPrice[this.idx1]) * 100 +
          parseFloat(this.pop.price.addPrice[this.idx2]) * 100) /
        100;
    },
    selectAddress(index) {
      this.idx2 = index;
      this.priceEnd =
        (parseFloat(this.pop.price.timePrice[this.dateNum - 1]) * 100 +
          parseFloat(this.pop.price.taocanPrice[this.idx1]) * 100 +
          parseFloat(this.pop.price.addPrice[this.idx2]) * 100) /
        100;
    },
    addPerson() {
      this.personNum.push({ userName: "", userCard: "" });
    },
    decrePerson() {
      if (this.personNum.length > 1) {
        this.personNum.pop();
      }
    },
    payStyle() {
      for (let item of this.personNum) {
        if (item.userName && item.userCard) {
        } else {
          this.$toast({
            message: "请填写完整信息",
            duration: 1000
          });
          return false;
        }
      }
      if(!this.exist){
         this.$toast({
            message: "请填写有效出行日期",
            duration: 1000
          });
          return false
      }
      // for(let item1 of this.personNum){
      //    this.personArrName.push(item1.userName)
      //    this.personArrCode.push(item1.userCard)
      // }
    
      this.axios({
        method:"post",
        data:{
          title:this.info.title,
          titleImg:this.info.titleImg[0],
          info:this.info.info,
          num:this.personNum.length,
          price:this.priceEnd,
          totalPrice:this.priceEnd*this.personNum.length,
          pathId:this.info.id,
          placeId:this.pop.address[this.idx2].id,
          comboId:this.pop.taocan[this.idx1].id,
          dateId:this.dateTime[this.dateNum - 1].id,
          userId: JSON.parse(localStorage["user"]).id,
          users:JSON.stringify(this.personNum),
          startPlace:this.pop.address[this.idx2].place,
          startCombo:this.pop.taocan[this.idx1].comboInfo,
          sDate:this.dateTime[this.dateNum - 1].startTime
        },
        url:url_40
      }).then(res =>{
        if(res.data.code ==100){
          // this.$router.push("/payStyle");
          this.$router.push({name:"payStyle",params:{id:res.data.data}})
        }
      })
    }
  }
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.pay {
  // overflow: hidden;
}
.contain {
  width: 100%;
  height: 0.1rem;
  background-color: #f6f6f7;
}
.top {
  position: relative;
  width: 100%;
  max-height: 5rem;
  overflow: hidden;
  .pic {
    display: block;
    width: 100%;
    height: auto;
  }
  .topback {
    position: absolute;
    left: 0.26rem;
    top: 0.11rem;
    width: 0.6rem;
    height: 0.6rem;
  }
  .bot {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 0.6rem;
    background-color: #fee95a;
    border-radius: 0.3rem 0.3rem 0px 0px;
    letter-spacing: 0.06rem;
    text-align: left;
    text-indent: 0.3rem;
    font-size: 0.3rem;
    line-height: 0.6rem;
  }
}
h3 {
  width: 6.63rem;
  padding: 5px;
  font-family: PingFang-SC-Medium;
  font-size: 0.36rem;
  margin: auto;
  text-align: left;
  color: black;
  border-bottom: 2px solid #eee;
text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.fea {
  width: 6.9rem;
  margin: 0.23rem auto;
  border-left: 2px solid #0394d3;
  text-align: left;
  text-indent: 0.2rem;
  font-family: PingFang-SC-Bold;
  font-size: 0.3rem;
}
.imgs {
  width: 6.4rem;
  height: auto;
  margin: 0 auto 0.5rem;
  img {
    display: block;
    width: 100%;
    height: auto;
  }
}
.duihuan {
  display: flex;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  p {
    box-sizing: border-box;
    width: 4.45rem;
    height: 1rem;
    color: #ff5342;
    font-size: 0.48rem;
    line-height: 1rem;
    border-top: 1px solid #eee;
    background-color: white;
  }
  button {
    flex: 1;
    font-family: PingFang-SC-Bold;
    font-size: 0.36rem;
    color: white;
    height: 1rem;
    background-color: #ff5342;
    border: none;
    outline: none;
  }
}
.pop {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  border-radius: 0.2rem 0.2rem 0 0;
  background-color: transparent;
  .pop-con {
    height: 1.7rem;
  }
  .wraper {
    flex: 1;
    overflow: scroll;
    background-color: transparent;
    .contain2 {
      height: 0.55rem;
      background-color: transparent;
    }
    .wrap {
      background-color: white; // overflow: scroll;
      z-index: 100;
      .top-p {
        position: relative;
        height: 1.44rem;
        border-radius: 0.2rem 0.2rem 0 0;
        .shopImg {
          position: absolute;
          left: 0.34rem;
          top: -0.55rem;
          width: 1.93rem;
          height: 1.94rem;
          border-radius: 5px;
        }
        .tit {
          position: absolute;
          left: 2.55rem;
          top: 0.4rem;
          width: 4.18rem;
          white-space: wrap;
          color: #313131;
          font-family: PingFang-SC-Bold;
          font-weight: bold;
          font-size: 0.24rem;
          text-align: left;
        }
        .close {
          position: absolute;
          top: 0.2rem;
          right: 0.2rem;
          width: 0.38rem;
          height: 0.38rem;
        }
      }
      .time {
        display: flex;
        margin: 0.3rem 0.1rem 0.3rem 0.2rem;
        p {
          flex: 1;
          line-height: 40px;
          font-size: 0.3rem;
          color: #313131;
          text-align: left;
        }
      }
      @media screen and (max-width: 319px) {
        .time {
          display: flex;
          justify-content: center;
          margin: 0.3rem 0;
          p {
            display: none;
            flex: 1;
            line-height: 40px;
            font-size: 0.3rem;
            color: #313131;
            text-align: left;
          }
        }
      }
      .chu {
        position: relative;
        text-align: left;
        i.bdl {
          position: absolute;
          left: 0.2rem;
          top: 12px;
          width: 3px;
          height: 18px;
          background-color: #0394d3;
        }
        .taocan-wrap {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          text-align: left; // justify-content: center;
          span {
            margin-right: 0.3rem;
            margin-top: 0.2rem;
            font-family: PingFang-SC-Medium;
            font-size: 0.24rem;
            color: black;
            background-color: #e9e9e9;
            padding: 0.14rem 0.2rem;
            border-radius: 0.2rem;
          }
          .activeClass {
            color: white;
            background-color: #ff5342;
          }
        }
      }
      .chu1 {
        position: relative;
        background-color: white;
        .tit {
          display: flex;
          font-size: 14px;
          height: 44px;
          line-height: 44px;
          text-align: left;
          border-bottom: 1px solid #eee;
          .p1 {
            width: 1.14rem;
            padding-left: 15px;
            text-align: left; // margin-right: 0.3rem;
          }
          .p2 {
            width: 5rem;
            color: #9a9a9a;
          }
          .i3 {
            position: absolute;
            right: 15px;
            top: 10px;
            transform: rotate(90deg);
            transition: 0.5s;
          }
          .ir {
            transform: rotate(-90deg);
          }
          input {
            flex: 1;
            display: block;
            border: none;
            outline: none;
          }
        }
        i.bdl {
          position: absolute;
          left: 0.2rem;
          top: 12px;
          width: 3px;
          height: 18px;
          background-color: #0394d3;
        }
        .chu1-wrap {
          p {
            width: 1.14rem;
          }
        }
        .add {
          display: flex;
          height: 44px;
          line-height: 44px;
          color: #444444;
          font-size: 0.3rem;
          border-bottom: 1px solid #eee;
          div {
            flex: 1;
            img {
              width: 0.33rem;
              height: 0.33rem;
              margin-right: 0.21rem;
              vertical-align: middle;
            }
            .img2 {
              width: 0.3rem;
              height: 0.3rem;
            }
            span {
              vertical-align: middle;
            }
          }
        }
      }
    }
  } // .dui-cont{
  //             height: 1rem;
  //         }
  .dui-cont {
    height: 1rem;
  }
  .duihuan2 {
    display: flex;
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    p {
      box-sizing: border-box;
      width: 4.45rem;
      height: 1rem;
      color: #ff5342;
      font-size: 0.48rem;
      line-height: 1rem;
      border-top: 1px solid #eee;
      background-color: white;
    }
    button {
      flex: 1;
      font-family: PingFang-SC-Bold;
      font-size: 0.36rem;
      color: white;
      height: 1rem;
      background-color: #ff5342;
      border: none;
      outline: none;
    }
  }
}
</style>