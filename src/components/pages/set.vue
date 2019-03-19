<template>
    <div class="set" ref="set">
        <hdTitle go="true" title="设置"></hdTitle>
        <!-- 设置头像 -->
        <div class="setava clearFix" :style="bg" @click="callSyn(this)">
            <img class="fl " :src="avatar">
        </div>
        <!-- 昵称 -->
        <div class="nickName clearFix" @click="$router.push('/nickName')">
            <p class="fl">昵称</p>
            <img class="fr" src="../../../static/images/jiantou.png">
        </div>
        <!-- 个性签名 -->
        <div class="nickName clearFix" @click="$router.push('/changeSign')">
            <p class="fl">个性签名</p>
            <img class="fr" src="../../../static/images/jiantou.png">
        </div>
        <!-- 更改密码 -->
        <div class="nickName clearFix" @click="$router.push('/changePass')">
            <p class="fl">更改密码</p>
            <img class="fr" src="../../../static/images/jiantou.png">
        </div>
        <!-- 更改密码 -->
        <!-- <div class="nickName clearFix" @click="$router.push('/bank')">
            <p class="fl">银行卡管理</p>
            <img class="fr" src="../../../static/images/jiantou.png">
        </div> -->
        <!-- 退出登录 -->
        <div class="logout clearFix" @click="logout">
            退出登录
        </div>
    </div>
</template>

<script>
import hdTitle from "@/components/component/hdTitle";
import { url,url_5,url_30 } from "../../serviceAPI.config.js";
import store from "../../../vuex/store";
import { imgUrl, getTimeS } from "@/filter/filter.js";
import { mapState, mapMutations } from "vuex";
export default {
  components: {
    hdTitle
  },
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
      avatar: "../../../static/images/touxiang.png",
      bg: {
        backgroundImage:
          "url(" + require("../../../static/images/jiantou.png") + ")",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "7rem 0.7rem",
        backgroundSize: "0.16rem 0.27rem"
      }
    };
  },
  store,
  created(){
        this.gengxin()
  },
  computed: mapState(["idx"]),
  methods: {
    ...mapMutations(["setIdx"]),
    gengxin(){
        this.axios({
            method:"get",
             params:{
                 userId:JSON.parse(localStorage["user"]).id
             },
            url:url_30
         }).then(res=>{
             if(res.data.code ==100){
                 if(res.data.data.userInfo.photo){
                    this.avatar =url + res.data.data.userInfo.photo

                 } 
             }
         })
    },
    callSyn() {
      var params = {
        userId: JSON.parse(localStorage["user"]).id,
        token: localStorage.getItem("Token")
      };
      dsBridge.call("changeAvatar", params);
      dsBridge.register("addValue", (res)=> {
        this.avatar = url + res
      });
      
    //   alert(this.avatar)
    },
    logout() {
      this.axios({
        method: "post",
        data: {
          userId: JSON.parse(localStorage["user"]).id
        },
        url: url_5
      }).then(res => {
        if (res.data.code == 100) {
          this.$toast({
            message: "退出成功",
            duration: 500
          });
          localStorage.removeItem("Token");
          localStorage.removeItem("user");
          setTimeout(res => {
            this.setIdx("0");
            this.$router.push({
              name: "moyu1"
            });
          }, 500);
        } else {
          this.$toast({
            message: "退出失败"
          });
        }
      });
    }
  },
  mounted() {
    var heig = document.documentElement.getBoundingClientRect().height;
    // console.log(heig)
    this.$nextTick(res => (this.$refs.set.style.height = `${heig}px`));
  }
};
</script>

<style rel="stylesheet/less" scoped lang="less">
@whi: white;
div.set {
  background-color: #f6f6f7; // height: 100%;
  .setava {
    margin-top: 10px;
    height: 1.68rem;
    background-color: @whi;
    img {
      width: 1.28rem;
      height: 1.28rem;
      padding-top: 0.23rem;
      padding-left: 0.26rem;
    }
  }
  .nickName {
    margin-top: 10px;
    background-color: @whi;
    p {
      padding-left: 0.26rem;
      height: 0.9rem;
      line-height: 0.9rem;
    }
    img {
      width: 0.16rem;
      height: 0.27rem;
      padding-top: 0.3rem;
      padding-right: 0.3rem;
    }
  }
  .logout {
    margin-top: 0.6rem;
    margin-bottom: 0.6rem;
    background-color: white;
    height: 0.9rem;
    line-height: 0.9rem;
  }
}
</style>