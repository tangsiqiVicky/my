<template>
    <div class="kefu" ref="kefu">
        <hdTitle :go="back" title="客服"></hdTitle>
        <div class="phone">
            <img width="100%" height="100%" :src="imgUrl1" @click="cPhone">
            <span>客服电话</span>
        </div>
        <div class="fuwu">
            <a @click="go">
                <img width="100%" height="100%" :src="imgUrl2">
            </a>
            <span>服务管家</span>
        </div>
    </div>
</template>

<script>
import hdTitle from "@/components/component/hdTitle";
import { url_9 } from "../../serviceAPI.config";
import store from "../../../vuex/store";
import { mapState, mapMutations } from "vuex";
export default {
  components: {
    hdTitle
  },
  data() {
    return {
      back: false,
      imgUrl1: require("../../../static/images/kefuanniu.png"),
      imgUrl2: require("../../../static/images/fuwuguanjiaaniu.png"),
      phone: ""
    };
  },
  store,
  computed: mapState(["idx"]),
  created() {
    this.setIdx(2);
    this.axios({
      method: "get",
      url: url_9
    }).then(res => {
      if (res.data.code == 100) {
        this.phone = res.data.data.phone;
      }
    });
  },
  methods: {
    ...mapMutations(["setIdx"]),
    go() {
      if (localStorage["Token"]) {
          window.location.href = "../../../static/html/index.html"
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
    cPhone() {
      this.$dialog.confirm({
        title: "客服电话",
        message: this.phone
      });
    }
  },
  mounted() {
    var heig = document.documentElement.getBoundingClientRect().height;
    // console.log(heig)
    this.$nextTick(res => (this.$refs.kefu.style.minHeight = `${heig}px`));
  }
};
</script>

<style scoped lang="less">
.kefu {
  padding-bottom: 70px;
  background-color: #f6f6f7;
  .phone {
    position: relative;
    width: 3.08rem;
    height: 3.08rem;
    // border: 2px solid #ECECED;
    border-radius: 50%;
    background-color: white;
    margin: 1.2rem auto 0;
    span {
      position: absolute;
      left: 50%;
      bottom: 0.6rem;
      transform: translateX(-50%);
    }
  }
  .fuwu {
    position: relative;
    width: 3.08rem;
    height: 3.08rem;
    // border: 2px solid #ECECED;
    border-radius: 50%;
    background-color: white;
    margin: 1rem auto;
    span {
      position: absolute;
      left: 50%;
      bottom: 0.6rem;
      transform: translateX(-50%);
    }
  }
}
</style>