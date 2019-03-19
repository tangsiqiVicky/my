<template>
    <div>
        <van-popup v-model="show" position="bottom">
            <div class="con">
                <div class="title">
                    分享：
                </div>
                <div class="share">
                    <div v-for="(item,index) in info1" :key="index" @click="sh(index)">
                        <img :src="item.pic">
                        <p>{{item.text}}</p>
                    </div>
                    
                </div>
                 <div class="share">
                    <div v-for="(item,index) in info2" :key="index" @click="sl(index)">
                        <img :src="item.pic">
                        <p>{{item.text}}</p>
                    </div>  
                </div>
            </div>
        </van-popup>
    </div>
</template>

<script>
import { ip } from "../../serviceAPI.config.js";
export default {
  props: ["path"],
  data() {
    return {
      info1: [
        {
          pic: require("../../../static/images/1qq.png"),
          text: "QQ好友"
        },
        {
          pic: require("../../../static/images/1qqkongjian.png"),
          text: "QQ空间"
        },
        {
          pic: require("../../../static/images/1weixin.png"),
          text: "微信好友"
        },
        {
          pic: require("../../../static/images/1pengyouquan.png"),
          text: "朋友圈"
        }
        // {
        //   pic: require("../../../static/images/1weibo.png"),
        //   text: "微博"
        // }
      ],
      info2: [
        // {
        //   pic: require("../../../static/images/1shoucang.png"),
        //   text: "收藏"
        // },
        {
          pic: require("../../../static/images/1fuzhilianjie.png"),
          text: "复制链接"
        },
        {
          pic: require("../../../static/images/1paocunzhibendi.png"),
          text: "保存至本地"
        }
      ],
      show: false
    };
  },
  methods: {
    change2() {
      this.show = !this.show;
    },
    sh(index) {
      var params1 = {
        address: ip + "login",
        index: 1
      };
      var params2 = {
        address: ip + "login",
        index: 2
      };
      var params3 = {
        address: ip + "login",
        index: 3
      };
      var params4 = {
        address: ip + "login",
        index: 4
      };
      if (localStorage["Token"]) {
        if (index == 2) {
          dsBridge.call("takeShare", params1);
        } else if (index == 3) {
          dsBridge.call("takeShare", params2);
        } else if (index == 0) {
          //qq
          dsBridge.call("takeShare", params3);
        } else if (index == 1) {
          //qq空间
          dsBridge.call("takeShare", params4);
        }
      } else {
        this.$dialog
          .confirm({
            message: "登录才能分享",
            showCancelButton: true,
            confirmButtonText: "去登陆"
          })
          .then(() => this.$router.push("/login"))
          .catch(() => {});
      }
    },
    sl(index) {
      var locat = window.location.href.split("?")[0];
      var params1 = {
        address: locat
      };
      if (this.path.video) {
        var params2 = {
          address: this.path.video
        };
      }else {
         var params2 = {
          address: this.path.img
        };
      }
      
      if (index == 0) {
        dsBridge.call("takeCopy", params1);
      } else if (index == 1) {
        dsBridge.call("downloadvideo", params2);

      }
    }
  }
};
</script>

<style scoped lang="less">
.con {
  .title {
    text-align: left;
    padding: 7px 15px 0 15px;
    // text-indent: 1em;
  }
  .share {
    display: flex;
    padding: 0.15rem 0;
    border-bottom: 0.03rem solid #f4f4f4;
    div {
      flex: 1;
      img {
        // display: block;
        width: 0.62rem;
        height: 0.62rem;
      }
      p {
        font-family: PingFang-SC-Regular;
        font-size: 0.24rem;
      }
    }
  }
}
</style>