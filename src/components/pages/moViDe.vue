<template>
    <div ref="detail" class="detail">
        <div v-if="this.wty==1">
            <order-back titLeft="图片详情" share="true" @alert="jubao" @share1="showSh">
            </order-back>
            <div class="img">
                <img class="max" :src="demo1.imgUrl" @click="showImage">
                <img class="min" :src="demo1.isLike?love[1]:love[0]" @click="dianzan(demo1.isLike)">
            </div>
        </div>
        <div v-if="this.wty==0" class="video">
            <div class="top"></div>
            <player :poster="demo1.imgUrl?demo1.imgUrl:''" :url="demo1.pathUrl?demo1.pathUrl:''"></player>
            <div class="bottom"></div>
            <img class="back" src="../../../static/images/2fanhuibai.png" @click="$router.go(-1)">
            <div class="more">
                <img class="more2" src="../../../static/images/2gengduo.png" @click="more = !more">
                <transition enter-active-class="animated flip" leave-active-class="animated bounceOut">
                    <div class="jubao" v-if="!more">
                        <img class="s1" src="../../../static/images/2fenxiang (1).png" @click="showSh">
                        <img class="j1" src="../../../static/images/2fenxiang (2).png" @click="jubao">
                        <img class="d1" :src="demo1.isLike?love[1]:love[0]" @click="dianzan(demo1.isLike)">
                    </div>
                </transition>
            </div>
        </div>
        <!-- 作者信息 -->
        <div class="author">
            <h3 class="tit">{{demo1.title?demo1.title:''}}</h3>
            <div class="content">{{demo1.info}}</div>
            <div class="info">
                <div class="avatar">
                    <img :src="demo1.user.photo">
                </div>
                <div class="nickName">
                    <p class="p1">{{demo1.user?demo1.user.userName:""}}</p>
                    <!-- <p class="p2"><img :src="gkrs">{{info.yuedu}}</p> -->
                </div>
                <div class="attention" @click="care(demo1.isRelation)">
                    <p v-if="demo1.isRelation">已关注</p>
                    <p v-else class="wp">关注</p>
                </div>
            </div>
            <p class="sign">个性签名：{{demo1.user?demo1.user.signature:''}}</p>
            
        </div>
        <!-- 推荐 -->
        <div class="recom" v-if="demo1.path" @click="goPath(demo1.path.type,demo1.path.id)">
            <div class="imgL">
                <img :src="[demo1.path?demo1.path.titleImg:''] |picUrl">
            </div>
            <div class="txt">
                <div class="txt-top">
                    <div class="txt-top-p">
                        <p class="p1">{{demo1.path?demo1.path.title:""}}</p>
                        <p class="p2">{{demo1.path?demo1.path.info:""}}</p>
                    </div>
                    <div class="txt-top-img">
                        <img :src="recom">
                    </div>
                </div>
                <div class="txt-bottom">
                    <span class="s1">￥{{demo1.path?demo1.path.price:""}}/人</span>
                    <!-- <span class="s2">{{info.recom.num}}已购买</span> -->
                </div>
            </div>
        </div>
        <reply :comment="demo2" @change1="changCommmer"></reply>
        <print :printNa="printNa" @submit1="addComment" @submit2="canComment" ref="inp"></print>
        <popup1 :report="isReport" @changeIsre='changeIs' :id="id"></popup1>
        <share1 ref='share' :path="path"></share1>
    </div>
</template>
<script>
import store from "../../../vuex/store";
// import { getTimeS } from '@/filter/filter.js'
import { mapState, mapMutations } from "vuex";
import { imgUrl } from "@/filter/filter.js";
import {
  url,
  url_11,
  url_12,
  url_13,
  url_16,
  url_17,
  url_18
} from "../../serviceAPI.config.js";
import orderBack from "@/components/component/orderBack";
import reply from "@/components/component/reply";
import print from "@/components/component/print";
import popup1 from "@/components/component/popup-1";
import share1 from "@/components/component/share-1";
import player from "@/components/component/player";
import qs from "qs";
import { ImagePreview } from "vant";
export default {
  components: {
    orderBack,
    print,
    reply,
    popup1,
    share1,
    player
  },
  data() {
    return {
      more: false,
      videotype: 0,
      isReport: false,
      type: 0, //判断是回复谁
      love: [
        require("../../../static/images/weidianzan.png"),
        require("../../../static/images/yidianzan.png")
      ],
      gkrs: require("../../../static/images/guankanrenshu.png"),
      recom: require("../../../static/images/tuijian.png"),
      demo1: {}, //作品
      uid: null,
      id: null, //作品id
      wty: null, //作品类型
      demo2: [],
      info: {}, //回复信息资料,
      printNa: "回复楼主",
      louzhuId: null, //发布人id,
      timer: null,
      isOK: true,
      path:null,
      photo:require("../../../static/images/touxiang.png"),
    };
  },
  filters: {
    picUrl(url) {
      return imgUrl(url);
    }
  },
  mounted() {
    var heig = document.documentElement.getBoundingClientRect().height;
    this.$nextTick(res => (this.$refs.detail.style.minHeight = `${heig}px`));
  },
  created() {
    this.$toast.loading({
      mask: true,
      message: "加载中...",
      // duration: "50000"
      duration: "50000"
    });
    if (!!localStorage["user"]) {
      this.uid = JSON.parse(localStorage["user"]).id;
    }
    if (this.$route.params.id) {
      this.id = this.$route.params.id;
      this.wty = this.$route.params.type;
      localStorage.setItem("videoId", this.$route.params.id);
      localStorage.setItem("videoType", this.$route.params.type);
      this.setWid(this.$route.params.id);
      this.setWtype(this.$route.params.type);
    } else {
      this.id = this.wid ? this.wid : localStorage["videoId"];
      this.wty = this.wtype ? this.wtype : localStorage["videoType"];
    }
    this.axios({
      method: "get",
      url: url_16,
      params: {
        id: this.id,
        userId: this.uid
      }
    }).then(res => {
      if (res.data.code == 100) {
        console.log(res)
        this.$toast.clear();
        this.wty = res.data.data.cis.type;
        res.data.data.cis.imgUrl = url + res.data.data.cis.imgUrl.split(",")[0];
        res.data.data.cis.pathUrl = url + res.data.data.cis.pathUrl;
        this.path = {
          video:res.data.data.cis.pathUrl,
          img:res.data.data.cis.imgUrl
        }
        // res.data.data.cis.path.titleImg = res.data.data.cis.path.titleImg.split(",")
        // // res.data.data.cis.path.titleImg[0] = res.data.data.cis.path.titleImg[0];
        if(res.data.data.cis.user.photo){
          res.data.data.cis.user.photo = url + res.data.data.cis.user.photo
        }else {
          res.data.data.cis.user.photo = this.photo
        }
        this.demo1 = res.data.data.cis;
        if(this.demo1.path){
           this.demo1.path.titleImg = this.demo1.path.titleImg.split(",")[0]
        }
        
        this.louzhuId = res.data.data.cis.userId;
        this.demo2 = res.data.data.comments;
      }
    });
  },
  store,
  computed: mapState(["wid", "wtype"]),
  methods: {
    ...mapMutations(["setWid", "setWtype"]),
    // 展示图片
    showImage() {
      let showI = ImagePreview([this.demo1.imgUrl]);
    },
    goPath(type,idx){
      if(type==0){
        this.$router.push({name:'recomDetail',params:{id:idx}})
      }else if(type ==1){
        this.$router.push({name:'seckillDetail',params:{id:idx}})
      }
       
    },
    // 显示分享
    showSh(data) {
      this.$refs.share.change2();
    },
    // 显示举报
    changeIs(data) {
      if (!data) {
        this.isReport = !this.isReport;
      }
    },
    // 举报
    jubao(data) {
      if (!!localStorage["Token"]) {
        this.isReport = true;
      } else {
        this.$dialog
          .confirm({
            message: "登录才能举报",
            showCancelButton: true,
            confirmButtonText: "去登陆"
          })
          .then(() => this.$router.push("/login"))
          .catch(() => {});
      }
    },
    // 关注
    care(bool) {
      if (localStorage["Token"]) {
        if (bool) {
          this.axios({
            method: "post",
            data: {
              userId: JSON.parse(localStorage["user"]).id,
              byUserId: this.demo1.userId
            },
            url: url_12
          }).then(res => {
            if (res.data.code == 100) {
              this.demo1.isRelation = false;
              this.$toast({
                mask: true,
                message: res.data.msg,
                // duration: "50000"
                duration: "500"
              });
            }
          });
        } else {
          this.axios({
            method: "post",
            data: {
              userId: JSON.parse(localStorage["user"]).id,
              byUserId: this.demo1.userId
            },
            url: url_11
          }).then(res => {
            if (res.data.code == 100) {
              this.demo1.isRelation = true;
              this.$toast({
                mask: true,
                message: res.data.msg,
                // duration: "50000"
                duration: "500"
              });
            }else if(res.data.code ==200){
              this.demo1.isRelation = false;
              this.$toast({
                mask: true,
                message: res.data.msg,
                // duration: "50000"
                duration: "500"
              });
            }
          });
        }
      } else {
        this.$dialog
          .confirm({
            message: "登录才能关注",
            showCancelButton: true,
            confirmButtonText: "去登陆"
          })
          .then(() => this.$router.push("/login"))
          .catch(() => {});
      }
    },
    // 点赞
    dianzan(bool) {
      if (localStorage["Token"]) {
        if (bool) {
          console.log(1);
          this.$toast({
            mask: true,
            message: "您已经点过赞了",
            // duration: "50000"
            duration: "500"
          });
        } else {
          this.axios({
            method: "post",
            data: {
              userId: JSON.parse(localStorage["user"]).id,
              issueId: this.$route.params.id
            },
            url: url_13
          }).then(res => {
            if (res.data.code == 100) {
              this.demo1.isLike = true;
              this.$toast({
                mask: true,
                message: res.data.msg,
                // duration: "50000"
                duration: "500"
              });
            }else{
              this.$toast({
                mask: true,
                message: res.data.msg,
                // duration: "50000"
                duration: "1000"
              });
            }
          });
        }
      } else {
        this.$dialog
          .confirm({
            message: "登录才能点赞",
            showCancelButton: true,
            confirmButtonText: "去登陆"
          })
          .then(() => this.$router.push("/login"))
          .catch(() => {});
      }
    },
    //添加评论
    addComment(data) {
      // 是否登录
      if (!!localStorage["user"]) {
        if (!!this.isOK) {
          if (data.length == 0) {
            this.$toast({
              message: "回复不能为空",
              duration: 1000
            });
            return false;
          }
          if (this.type == 0) {
            this.axios({
              method: "post",
              url: url_17,
              data: {
                userId: JSON.parse(localStorage["user"]).id,
                userName: JSON.parse(localStorage["user"]).userName,
                issueId: this.id,
                content: data,
                toUserId: this.louzhuId,
                issueType: this.wty
              }
            }).then(res => {
              if (res.data.code == 100) {
                this.isOK= false;
                setTimeout(() => {
                  this.isOK = true;
                }, 10000);
                this.axios({
                  method: "get",
                  url: url_16,
                  params: {
                    id: this.id,
                    userId: this.uid
                  }
                }).then(res => {
                  if (res.data.code == 100) {
                    this.demo2 = res.data.data.comments;
                  }
                });
                this.$toast({
                  message: res.data.msg,
                  duration: 1000
                });
              }
            });
          } else {
            this.axios({
              method: "post",
              url: url_18,
              data: {
                commentId: this.info.id,
                fromUserId: JSON.parse(localStorage["user"]).id,
                fromUserName: JSON.parse(localStorage["user"]).userName,
                toUserId: this.info.userId,
                toUserName: this.info.name,
                content: data,
                issueType: this.wty,
                issueId: this.id
              }
            })
              .then(res => {
                if (res.data.code == 100) {
                  this.isOK = false;
                  this.$toast({
                    message: res.data.msg,
                    duration: 1000
                  });
                  this.type = 0;
                  this.printNa = "回复楼主";
                  return new Promise((resolve, reject) => {
                    resolve(data);
                  });
                }
              })
              .then(res => {
                setTimeout(() => {
                  this.isOK = true;
                }, 10000);
                this.axios({
                  method: "get",
                  url: url_16,
                  params: {
                    id: this.id,
                    userId: this.uid
                  }
                }).then(res => {
                  if (res.data.code == 100) {
                    this.demo2 = res.data.data.comments;
                  }
                });
              });
          }
        } else{
            this.$toast({
                message:"10s后才能评论",
                duration:800
            })
        }
      } else {
        this.$dialog
          .confirm({
            message: "登录才能评论",
            showCancelButton: true,
            confirmButtonText: "去登陆"
          })
          .then(() => this.$router.push("/login"))
          .catch(() => {});
      }
    },
    canComment(data) {
      this.type = 0;
      this.printNa = "回复楼主";
    },
    // 检测到点击了别人的评论
    changCommmer(comId, useId, useName, type) {
      this.type = 1;
      this.info.id = comId;
      this.info.userId = useId;
      this.info.name = useName; //被评论者名字
      this.$refs.inp.auto();
      this.printNa = `回复：${this.info.name}`;
      // this.chosedIndex = index
      // this.type = 1;
    }
    // cancelCommit(data){
    //     this.type=0
    // }
  }
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.detail {
  background-color: #f6f6f7;
  .video {
    position: relative;
    .top {
      width: 100%;
      height: 1rem;
      background-color: black;
    }
    .bottom {
      width: 100%;
      height: 1rem;
      background-color: black;
    }
    .back {
      position: absolute;
      left: 0.2rem;
      top: 0.3rem;
      width: 0.22rem;
      height: 0.39rem;
      z-index: 2000;
    }
    .more {
      position: absolute;
      width: 0.7rem;
      height: 0.88rem;
      right: 0;
      top: 0;
      z-index: 9999999999000;
      .more2 {
        position: absolute;
        right: 0.3rem;
        top: 0.25rem;
        width: 0.1rem;
        height: 0.49rem;
        z-index: 9999999999000 !important;
      }
      .jubao {
        position: absolute;
        right: 0.04rem;
        bottom: -3.66rem;
        width: 0.66rem;
        height: 3.66rem;
        background-color: transparent;
        border-radius: 0 0 0.33rem 0.33rem;
        .s1 {
          display: block;
          margin: 0.1rem auto 0;
          width: 0.38rem;
          height: 0.43rem;
          z-index: 9999999999000;
        }
        .j1 {
          display: block;
          margin: 0.3rem auto 0;
          width: 0.39rem;
          height: 0.42rem;
          z-index: 9999999999000;
        }
        .d1 {
          display: block;
          margin: 0.3rem auto 0;
          width: 0.41rem;
          height: 0.36rem;
          z-index: 9999999999000;
        }
      }
    }
  }
  .img {
    position: relative;
    width: 7.5rem;
    max-height: 6.86rem;
    margin: 0.1rem auto;
    overflow: hidden;
    .max {
      width: 7.5rem;
      height: auto;
      margin: auto;
    }
    .min {
      position: absolute;
      width: 0.41rem;
      height: 0.36rem;
      bottom: 0.3rem;
      right: 0.2rem;
      z-index: 99;
    }
  }
  .author {
    padding: 0.2rem;
    background-color: white;
    .tit {
      font-family: PingFang-SC-Regular;
      font-size: 0.3rem;
      color: black;
      font-weight: bold;
      text-align: left;
      text-indent: 0.18rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .content {
      margin: 2px auto 5px;
      padding: 3px;
      font-family: PingFang-SC-Regular;
      font-size: 0.26rem;
      color:black;
      // font-weight: bold;
      text-align: left;
      text-indent: 0.18rem;
      border: 1px solid #ccc;
      // overflow: hidden;
      // text-overflow: ellipsis;
      // white-space: nowrap;
    }
    .sign {
      margin-top: 0.12rem;
      font-family: PingFang-SC-Regular;
      font-size: 0.24rem;
      color: #b8b8b9;
      text-align: left;
      text-indent: 0.18rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .info {
      display: flex;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-top: 0.1rem;
      .avatar {
        width: 0.54rem;
        height: 0.54rem;
        overflow: hidden;
        img {
          display: block;
          width: 0.54rem;
          height: auto;
        }
      }
      .nickName {
        width: 5rem;
        text-align: left;
        margin-left: 0.2rem;
        p {
          height: 0.24rem;
          margin-top: 0.15rem;
          line-height: 0.24rem;
        }
        .p1 {
          font-family: PingFang-SC-Light;
          font-size: 0.24rem;
        }
        .p2 {
          display: none;
          font-family: PingFang-SC-Light;
          font-size: 0.24rem;
          vertical-align: middle;
          img {
            width: 0.33rem;
            height: 0.18rem;
            vertical-align: middle;
            margin-right: 3px;
          }
        }
      }
      .attention {
        // width: 0.95rem;
        // height: 0.42rem;
        p {
          padding: 0.11rem 0.28rem;
          background-color: #0394d3;
          border-radius: 0.1rem;
          font-family: PingFang-SC-Regular;
          font-size: 0.2rem;
          line-height: 1;
          color: white;
        }
        .wp {
          border: 1px dashed#0394d3;
          color: #0394d3;
          background-color: #fff;
        }
      }
    }
  }
  .recom {
    display: flex;
    margin-top: 0.1rem;
    padding: 0.1rem;
    background-color: white;
    .imgL {
      width: 1.22rem;
      margin-right: 0.2rem;
      img {
        display: block;
        width: 1.22rem;
        height: 1.22rem;
      }
    }
    .txt {
      flex: 1;
      .txt-top {
        display: flex;
        .txt-top-p {
          width: 5rem;
          text-align: left;
          .p1 {
            font-size: 0.24rem;
          }
          .p2 {
            font-size: 0.21rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
        .txt-top-img {
          flex: 1;
          img {
            width: 0.41rem;
            height: 0.46rem;
          }
        }
      }
      .txt-bottom {
        text-align: right;
        .s1 {
          font-family: PingFang-SC-Regular;
          font-size: 0.24rem;
          color: #ff5342;
          margin-right: 0.3rem;
        } // .s2 {
        //     height: 0.18rem;
        //     font-family: PingFang-SC-Light;
        //     font-size: 0.18rem;
        //     color: #b8b8b9;
        //     margin-left: 0.6rem;
        //     padding-right: 0.15rem;
        // }
      }
    }
  }
}
</style>