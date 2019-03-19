<template>
    <div>
        <div class="footer">
            <div @click="changeidx(0)">
                <img src="../../../static/images/moyv.png">
                <p :class="{on:0 == idx}">墨鱼</p>
            </div>
            <div @click="changeidx(1)">
                <img src="../../../static/images/faxian.png">
                <p :class="{on:1 == idx}">发现</p>
            </div>
            <div>
                <img @click="ani" src="../../../static/images/fabu.png">
                <!-- <p :class="{on:index == idx}">发布</p> -->
            </div>
            <div @click="changeidx(2)">
                <img src="../../../static/images/kefu.png">
                <p :class="{on:2 == idx}">客服</p>
            </div>
            <div @click="changeidx(3)">
                <img src="../../../static/images/wode.png">
                <p :class="{on:3 == idx}">我的</p>
            </div>
            <div class="publish">
                <transition name="custom-classes-transition" enter-active-class="animated bounceInDown" leave-active-class="animated bounceOut">
                    <div v-if="aniShow">
                        <img src="../../../static/images/shangchuan.png" @click="pub">
                    </div>
                </transition>
                <transition name="custom-classes-transition" enter-active-class="animated bounceInRight" leave-active-class="animated bounceOut">
                    <div v-if="aniShow">
                        <img src="../../../static/images/sheying.png" @click="uploadImg">
                    </div>
                </transition>
            </div>
        </div>
    </div>
</template>
 
<script type="text/javascript">
import store from "../../../vuex/store";
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      push: ["/index", "/find", "/kefu", "/user"],
      // id: "",
      lastidx: "",
      publish: false, //发布
      aniShow: false
    };
  },
  store,
  computed: mapState(["idx"]),
  methods: {
    ...mapMutations(["setIdx"]),
    changeidx(index) {
      // if (!!localStorage["user"]) {
      //     if (this.lastidx == index) {
      //         // 防止重复点击请求数据
      //         return false
      //     }
      // }
      this.setIdx(index);
      this.id = this.idx;
      this.aniShow = false;
      this.$router.push(this.push[index]);
      this.lastidx = this.id;
    },
    uploadImg() {
      this.aniShow = false;
      if (localStorage["Token"]) {
        if(localStorage["videoInfo1"]){
           localStorage.removeItem("videoInfo1");
        }
        var para = {
          token: localStorage.getItem("Token")
        };
        dsBridge.call("upload", para);
        dsBridge.register("addValue2", res => {
          localStorage.setItem("videoInfo1", res);
          if(localStorage["pushInfo1"]){
            localStorage.removeItem("pushInfo1");
          }
          this.$router.push({name: "publish2"});
        });
      } else {
        this.$dialog
          .confirm({
            message: "官人请登录",
            showCancelButton: true,
            confirmButtonText: "去登陆"
          })
          .then(() => this.$router.push("/login"))
          .catch(() => {});
      }
    },
    ani() {
      this.aniShow = !this.aniShow;
    },
    pub() {
      this.aniShow = false;
      this.$router.push("/publish");
    }
  }
};
</script>

<style scoped lang='less'>
.footer {
  display: flex;
  position: fixed;
  left: 0;
  bottom: 0;
  box-sizing: border-box;
  height: 70px;
  width: 100%;
  background-color: white;
  border-top: 1px solid #f6f6f7;
  z-index: 99;
  div {
    flex: 1;
    font-size: 16px;
    img {
      display: block;
      width: 30px;
      height: 30px;
      margin: 10px auto 5px;
    }
    p {
      color: #cccccc;
      font-size: 12px;
    }
  }
  div:nth-child(3) {
    img {
      width: 62px;
      height: 62px;
      transform: translateY(-20px);
    }
  }
  .on {
    color: black;
  }
}
.publish {
  position: absolute;
  left: 50%;
  top: -70px; // width: 100%;
  div:nth-child(1) {
    position: absolute;
    left: 0;
    top: -14px;
    width: 50px;
    height: 50px;
    margin-left: -25px; // background-color: #1296DB;
    border-radius: 50%;
    z-index: 99;
    img {
      display: block;
      margin: 0;
      width: 100%;
      height: 100%;
    }
  }
  div:nth-child(2) {
    position: absolute;
    left: 0.8rem;
    top: 17px;
    width: 50px;
    height: 50px; // margin-left: -15px;
    // background-color: #1296DB;
    border-radius: 50%;
    z-index: 99;
    img {
      display: block;
      width: 100%;
      height: 100%;
      margin: 0;
    }
  }
}
</style>