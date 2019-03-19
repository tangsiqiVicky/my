<template>
    <div>
        <div class="top">
            <img class="pic" :src="[info.titleImg ? info.titleImg[0]:''] | picUrl" @click="showImage">
            <img class="topback" src="../../../static/images/jifenback.png" @click="$router.back()">
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
                {{info.needNum?info.needNum:""}}积分
            </p>
            <button @click="showPop">
                                    立即兑换
                        </button>
        </div>
        <van-popup class="pop" v-model="showPop1" position="bottom">
            <div class="contain"></div>
            <div class="top-p">
                <img :src="pic | picUrl">
                <div class="info">
                    <p>积分: <span>{{info.needNum?info.needNum:""}}</span></p>
                    <p>已选: {{info.title}}</p>
                </div>
            </div>
            <div class="duihuan2" @click="duihuan2" position="bottom">
                立即兑换
            </div>
        </van-popup>
        <van-popup class="pop" v-model="showPop2" position="bottom">
            <div class="contain"></div>
            <div class="top-p">
                <img :src="pic | picUrl">
                <div class="info">
                    <p>积分: <span>{{info.needNum?info.needNum:""}}</span></p>
                    <p>已选: {{info.title}}</p>
                    <div class="adderss">
                        <i>填写地址：</i><input type="text" v-model.trim.lazy="address" placeholder="请填写详细地址">
                    </div>
                    <div class="phone">
                        <i>填写联系电话：</i><input type="text" v-model.trim.lazy="phone" placeholder="请填写联系电话">
                    </div>
                </div>
            </div>
            <div class="duihuan2" @click="duihuan2" position="bottom">
                立即兑换
            </div>
        </van-popup>
        <!-- 兑换完毕 -->
        <van-popup v-model="over" position="top" class="over">
            <div class="con" v-if="over">
                <p class="p1">兑换完毕</p>
                <p>请及时联系客服</p>
                <div @click="over = false">确认</div>
            </div>
        </van-popup>
    </div>
</template>

<script>
import { url_28, url_25, url } from "../../serviceAPI.config.js";
import { ImagePreview } from "vant";
import { imgUrl, getTimeS } from "@/filter/filter.js";
export default {
  components: {},
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
      info: {},
      pic: "",
      title:
        "马来西亚七日游马来西亚七日游马来西亚七日游马来西亚七日游马来西亚七日游",
      imgUrl: [],
      showPop1: false,
      showPop2: false,
      over: false,
      address: null,
      phone: null,
      id: null
    };
  },
  created() {
    // console.log(JSON.parse(localStorage["user"]))
    this.$toast.loading({
      mask: true,
      message: "加载中...",
      // duration: "50000"
      duration: "50000"
    });
    if (this.$route.params.id) {
      this.id = this.$route.params.id;
      localStorage.setItem("integId", this.$route.params.id);
    } else {
      this.id = localStorage["integId"];
    }
    this.axios({
      method: "get",
      params: {
        id: this.id
      },
      url: url_25
    }).then(res => {
      if (res.data.code == 100) {
        res.data.data.img = res.data.data.img.split(",");
        res.data.data.titleImg = res.data.data.titleImg.split(",");
        this.info = res.data.data;
        this.pic = this.info.titleImg[0]
        this.$toast.clear();
      }
    });
  },
  methods: {
    // 展示图片
    showImage() {
      for (let item of this.info.titleImg) {
        item = url + item;
        this.imgUrl.push(item);
      }
      let showI = ImagePreview(this.imgUrl);
    },
    showPop() {
      if (localStorage["Token"]) {
        if (this.info.type == 1) {
          //路线
          this.showPop1 = true;
        } else if (this.info.type == 0) {
          //物品
          this.showPop2 = true;
        }
      } else {
        this.$dialog
          .confirm({
            message: "登录才能兑换",
            showCancelButton: true,
            confirmButtonText: "去登陆"
          })
          .then(() => this.$router.push("/login"))
          .catch(() => {});
      }
    },
    duihuan2() {
      if (this.info.type == 1) {
        this.axios({
          method: "post",
          data: {
            userId: JSON.parse(localStorage["user"]).id,
            exchangeId: this.info.id,
            exchangeTitle: this.info.title,
            needNum: 1,
            needInt: this.info.needNum,
            address: null,
            phone: JSON.parse(localStorage["user"]).phone,
            img: this.info.titleImg[0]
          },
          url: url_28
        }).then(res => {
          this.showPop1 = false;
          if (res.data.code == 100) {
            this.over = true;
          } else if (res.data.code == 200) {
            this.$toast.fail({
              message: res.data.msg,
              duration: 2500
            });
          }
        });
      } else {
        if (!this.address) {
          this.$dialog.alert({
            message: "请输入地址"
          });
          return false;
        }
        if (!this.phone) {
          this.$dialog.alert({
            message: "请输入正确手机号"
          });
          return false;
        }
        if (
          !this.phone.match(
            /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/
          )
        ) {
          this.$dialog.alert({
            message: "手机格式错误"
          });
          this.phone = "";
          return false;
        }
        this.axios({
          method: "post",
          data: {
            userId: JSON.parse(localStorage["user"]).id,
            exchangeId: this.info.id,
            exchangeTitle: this.info.title,
            needNum: 1,
            needInt: this.info.needNum,
            address: this.address,
            phone: this.phone,
            img: this.info.titleImg[0]
          },
          url: url_28
        }).then(res => {
          this.showPop2 = false;
          if (res.data.code == 100) {
            this.over = true;
          } else if (res.data.code == 200) {
            this.$toast.fail({
              message: res.data.msg,
              duration: 2500
            });
          }
        });
      }
    }
  }
};
</script>

<style scoped lang="less">
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
}
h3 {
  width: 6.63rem;
  padding: 5px;
  font-family: PingFang-SC-Medium;
  font-size: 0.3rem;
  margin: auto;
  text-align: left;
  color: black;
  border-bottom: 2px solid #eee;
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
    color: #f09300;
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
    background-color: #f09300;
    border: none;
    outline: none;
  }
}
.pop {
  background-color: transparent;
}
.contain {
  height: 0.4rem;
  background-color: transparent;
}
.top-p {
  display: flex;
  background-color: white;
  img {
    width: 1.66rem;
    height: 1.64rem;
    margin-left: 0.2rem;
    border-radius: 0.2rem;
    transform: translateY(-0.4rem);
  }
  .info {
    margin-left: 0.2rem;
    text-align: left;
    font-family: PingFang-SC-Regular;
    font-size: 0.24rem;
    span {
      color: #ff9242;
      font-size: 0.3rem;
    }
    p {
      padding-top: 0.2rem;
    }
    .adderss {
      padding-top: 0.2rem;
      input {
        margin-top: -0.05rem;
        width: 4rem;
        border: none;
        outline: none;
        color: #b8b8b9;
        line-height: 0.3rem;
      }
    }
    .phone {
      padding-top: 0.2rem;
      padding-bottom: 0.2rem;
      input {
        margin-top: -0.05rem;
        width: 3rem;
        border: none;
        outline: none;
        color: #b8b8b9;
        line-height: 0.3rem;
      }
    }
  }
}
.duihuan2 {
  height: 1rem;
  line-height: 1rem;
  background-color: #ff9242;
  font-family: PingFang-SC-Medium;
  font-size: 0.36rem;
  color: white;
}
.over {
  width: 100%;
  height: 100%;
  background-color: transparent;
  .con {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    margin: auto;
    width: 5.85rem;
    height: 3.3rem;
    background-color: white;
    border-radius: 0.2rem;
    p {
      font-family: PingFang-SC-Regular;
      font-size: 0.36rem;
      margin-bottom: 0.3rem;
    }
    .p1 {
      width: 3rem;
      height: 1rem;
      line-height: 1rem;
      border-bottom: 1px solid black;
      margin-bottom: 0.2rem;
    }
    div {
      width: 1.31rem;
      height: 0.58rem;
      line-height: 0.58rem;
      border-radius: 0.1rem;
      border: 0.03rem solid #000000;
    }
  }
}
</style>