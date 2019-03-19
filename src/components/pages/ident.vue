<template>
    <div class="ident">
        <hdTitle go="true" title="认证"></hdTitle>
        <div class="wrap" @click="ident1">
            <p class="tit">上传</p>
            <div class="pic">
                <img :src="pic1">
            </div>
            <transition enter-active-class="animated bounceInRight" leave-active-class="animated bounceOut">
                <p v-if="anishow" class="tips">
                    身份证正面
                </p>
            </transition>
        </div>
        <div class="wrap w2" @click="ident2">
            <p class="tit">上传</p>
            <div class="pic">
                <img :src="pic2">
            </div>
            <transition enter-active-class="animated bounceInLeft" leave-active-class="animated bounceOut">
                <p v-if="anishow" class="tips">
                    身份证反面
                </p>
             </transition>    
        </div>
        <div class="upload" @click="upload">
            上传认证
        </div>
    </div>
</template>

<script>
import hdTitle from "@/components/component/hdTitle";
import { url, url_38 } from "../../serviceAPI.config.js";
export default {
  components: {
    hdTitle
  },
  data() {
    return {
      pic1: require("../../../static/images/ident.png"),
      pic2: require("../../../static/images/ident.png"),
      anishow: false,
      pic5: null,
      pic6: null
    };
  },
  mounted() {
    this.anishow = !this.anishow;
  },
  methods: {
    upload() {
      if (this.pic5 && this.pic6) {
        this.axios({
          method: "post",
          data: {
            userId: JSON.parse(localStorage["user"]).id,
            cardF: this.pic5,
            cardR: this.pic6
          },
          url: url_38
        }).then(res => {
          if (res.data.code == 100) {
            this.$toast.success({
              message: "上传成功",
              duration: "1200"
            });
            setTimeout(res =>{
              this.$router.push({name:"user"})
            },1200) 
          } else {
            this.$toast.fail({
              message: "上传失败",
              duration: 1500
            });
          }
        });
      } else {
        this.$toast({
          message: "请上传正反2张照片",
          duration: 1500
        });
      }
    },
    ident1() {
      var para = {
        token: localStorage.getItem("Token")
      };
      dsBridge.call("ident1", para);
      dsBridge.register("addValue3", res => {
        this.pic5 = res;
        this.pic1 = url + res;
      });
    },
    ident2() {
      var para = {
        token: localStorage.getItem("Token")
      };
      dsBridge.call("ident2", para);
      dsBridge.register("addValue4", res => {
        this.pic6 = res;
        this.pic2 = url + res;
      });
    }
  }
};
</script>

<style scoped lang="less">
.ident {
  background-color: #f6f6f7;
  padding-bottom: 1.15rem;
  .wrap {
    position: relative;
    width: 7.1rem;
    height: 3.9rem;
    margin: 0.3rem auto;
    background-color: white;
    .tit {
      padding-top: 0.2rem;
      font-size: 0.44rem;
      color: #1296db;
    }
    .pic {
      width: 3.09rem;
      height: 2.1rem;
      margin: auto;
      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
    .tips {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 0.82rem;
      line-height: 0.82rem;
      color: white;
      background-color: #1296db;
    }
  }
  .upload {
    width: 6.68rem;
    height: 0.8rem;
    margin: 1.15rem auto 0;
    line-height: 0.8rem;
    background-color: #1296db;
    border-radius: 0.1rem;
    font-family: PingFang-SC-Regular;
    font-size: 0.36rem;
    color: #fefefe;
  }
  .w2 {
    margin: 0.6rem auto 0;
  }
}
</style>