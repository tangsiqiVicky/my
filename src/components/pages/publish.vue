<template>
    <div class="pub">
        <h111 goo="true" title="发布"></h111>
        <div class="wrap" @click="uploadImg" v-show="up">
            <img src="../../../static/images/shangchuanshipintupian.png">
        </div>
        <div v-show="!up">
           <div v-show="this.wty ==1">
            <div class="img">
                <img class="max" :src="imgPath">
            </div>
        </div>
        <div v-show="this.wty ==0" class="video">
            <player :poster="imgPath" :url="videoPath"></player>
        </div>
        </div>
        <div class="tit">
            <input type="text" placeholder="#标题" v-model.trim="title">
        </div>
        <div class="con">
            <textarea @keyup="lencount" v-model.trim="content" placeholder="说点什么吧(100字以内)" maxlength="100"></textarea>
            <p class="length">{{len}}/100</p>
        </div>
        <!-- 推荐 -->
        <div class="locat clearFix" v-if="!!vip" @click="goVip">
            <img class="fl img1" src="../../../static/images/tuijian.png">
            <span class="fl tt" v-if="recomLx == null">推荐</span>
            <span class="fl tt" v-else>{{recomT?recomT:'推荐'}}</span>
            <img class="fr img2" src="../../../static/images/jiantou.png">
        </div>
          <!-- 定位 -->
        <div class="locat clearFix" @click="locat">
            <img class="fl img1" src="../../../static/images/dingwei.png">
            <span class="fl">{{location}}</span>
            <img class="fr img2" src="../../../static/images/jiantou.png">
        </div>
        <div class="upload" @click="upload">
            发布
        </div>
        <div class="ub">
        </div>
    </div>
</template>

<script>
import h111 from "@/components/component/h1";
import player from "@/components/component/player";
import store from "../../../vuex/store";
import { mapState, mapMutations } from "vuex";
import { url_15, url } from "../../serviceAPI.config.js";
export default {
  components: {
    h111,
    player
  },
  data() {
    return {
      title: "",
      content: "",
      len: "0",
      vip: JSON.parse(localStorage["user"]).type, //1是会员
      tip: false,
      location: "定位",
      address:"",
      recom: null,
      recomT: "推荐",
      type: null,
      up: true,
      wty: null,
      videoPath: null,
      imgPath: null,
      videoPath1: null,
      imgPath1: null
    };
  },
  store,
  created() {
    if (this.recomLx != null) {
      this.recomT = this.recomLxT;
    } else {
      this.recomT = "推荐";
    }
//如果vip路线有值，则自动隐藏上传
    if (localStorage["pushInfo2"]) {
      let info11 = JSON.parse(localStorage["pushInfo2"]);
      this.title = info11.title;
      this.content = info11.info;
      this.len = info11.len;
      this.location = info11.address;
      if(info11.imgUrl || info11.pathUrl){
        this.up = false
      }else{
        this.up = true
      }     
      this.imgPath = info11.imgUrl,
      this.videoPath = info11.pathUrl
      this.imgPath1 = info11.imgUrl1,
      this.videoPath1 = info11.pathUrl1
      this.wty = info11.type
      this.type = info11.type
    }
  },
  computed: mapState(["recomLx", "recomLxT"]),
  destroyed() {
    // this.setRecomLx(null);
    // this.recomT = "推荐";
    // this.setRecomLxT("推荐");
  },
  methods: {
    ...mapMutations(["setRecomLx", "setRecomLxT"]),
    lencount() {
      this.len = this.content.length;
    },
    locat() {
       let d1 = {
        title: this.title,
        info: this.content,
        address: this.location,
        type: this.type,
        pathUrl: this.videoPath,
        pathUrl1:this.videoPath1,
        imgUrl: this.imgPath,
        imgUrl1: this.imgPath1,
        len: this.len
      };
      let d2 = JSON.stringify(d1);
      localStorage.setItem("pushInfo2", d2);
      this.$router.push({name:'map2',params:{type:1}})
    },
    goVip() {
      let d1 = {
        title: this.title,
        info: this.content,
        address: this.location,
        type: this.type,
        pathUrl: this.videoPath,
        pathUrl1:this.videoPath1,
        imgUrl: this.imgPath,
        imgUrl1: this.imgPath1,
        len: this.len
      };
      let d2 = JSON.stringify(d1);
      localStorage.setItem("pushInfo2", d2);
      this.$router.push({ name: "recomLine" });
    },
    
    remove() {
      localStorage.removeItem("pushInfo2");
    },
    uploadImg() {
      if(localStorage["videoInfo2"]){
        localStorage.removeItem("videoInfo2")
      }
      var para = {
        token: localStorage.getItem("Token")
      };
      dsBridge.call("upload2", para);
      dsBridge.register("addValue5", res => {
        this.up = false;
        localStorage.setItem("videoInfo2", res);
        this.wty = parseInt(JSON.parse(res).type);
        this.type = parseInt(JSON.parse(res).type);
        this.videoPath = url + JSON.parse(res).data.videoPath;
        this.imgPath = url + JSON.parse(res).data.img;
        this.videoPath1 = JSON.parse(res).data.videoPath;
        this.imgPath1 = JSON.parse(res).data.img;
      });
    },
    upload() {
      this.recom = this.recomLx
      // if (this.recom == "") {
      //   this.recom = null;
      // }
      if (this.title.length == 0) {
        this.$toast({
          message: "请填写标题",
          duration: 1000
        });
        return false;
      }
      if (this.content.length == 0) {
        this.$toast({
          message: "请填写内容",
          duration: 1000
        });
        return false;
      }
      if(this.location == "定位"){
        this.address = null
      }else{
        this.address = this.location
      }
      this.axios({
        method: "post",
        data: {
          title: this.title,
          info: this.content,
          address: this.address,
          userId: JSON.parse(localStorage["user"]).id,
          type: this.type,
          pathUrl:this.videoPath1,
          imgUrl:this.imgPath1,
          pathId:this.recom
        },
        url: url_15
      }).then(res => {
        if (res.data.code == 100) {
          localStorage.removeItem("pushInfo2");
          localStorage.removeItem("videoInfo2");
          this.$toast({
            message:"上传成功",
            duration: 1000
          });
          setTimeout(() => {
             this.setRecomLx(null);
             this.setRecomLxT("推荐");
            this.$router.push({ name: "moyu1" });
          }, 1000);
        }
      });
    },
    toastI() {
      this.$toast({
        message: "获取您当前位置失败！",
        duration: 1000
      });
    }
  }
};
</script>

<style rel="stylesheet/less" scoped lang="less">
.pub {
  background-color: #f6f6f7;
  #container {
    height: 0;
  }
  .wrap {
    padding: 0.2rem 0.13rem;
    background-color: white;
    img {
      display: block;
      width: 7.24rem;
      height: 4.07rem;
    }
  }
  .video {
    position: relative;
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
  .tit {
    margin-top: 0.15rem;
    height: 0.87rem;
    input {
      display: block;
      width: 100%;
      height: 100%;
      outline: none;
      border: none;
      text-indent: 0.3rem;
      font-family: PingFang-SC-Regular;
      font-size: 0.3rem; // color: #b8b8b9;
    }
  }
  .con {
    margin-top: 0.15rem;
    textarea {
      display: block;
      width: 100%;
      height: 1.61rem;
      padding-top: 0.1rem;
      resize: none;
      border: none;
      outline: none;
      text-indent: 0.3rem;
      font-family: PingFang-SC-Regular;
      font-size: 0.3rem; // color: #b8b8b9;
    }
    .length {
      background-color: white;
      font-size: 0.24rem;
      text-align: right;
      color: #b8b8b9;
    }
  }
  .locat {
    margin-top: 0.15rem;
    background-color: white;
    height: 0.9rem;
    .img1 {
      width: 0.37rem;
      height: 0.45rem;
      padding: 0.22rem 0.1rem 0.22rem 0.31rem;
    }
    span {
      display: inline-block;
      width: 5rem;
      height: 0.9rem;
      text-align: left;
      line-height: 0.9rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .img2 {
      width: 0.16rem;
      height: 0.27rem;
      padding-top: 0.31rem;
      padding-right: 0.3rem;
    }
  }
  .upload {
    width: 6.68rem;
    height: 0.8rem;
    line-height: 0.8rem;
    margin: 0.9rem auto 0;
    background-color: #1296db;
    border-radius: 0.4rem;
    font-family: PingFang-SC-Regular;
    font-size: 0.36rem;
    color: #fefefe;
  }
  .ub {
    height: 0.9rem;
    background-color: #f6f6f7;
  }
}
</style>