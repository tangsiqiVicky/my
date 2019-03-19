<template>
    <div ref="payStyle" class="payStyle">
        <goback></goback>
        <div class="cen">
            <P>选择支付方式</P>
            <div @click="pay(2)">
                <img src="../../../static/images/wxpay.png">
                <span>微信</span>
            </div>
            <div @click="pay(1)">
                <img src="../../../static/images/zfbpay.png">
                <span>支付宝</span>
            </div>
            <!-- <div>
                <img src="../../../static/images/ylpay.png">
                <span>银行卡</span>
            </div> -->
        </div>
    </div>
</template>

<script>
import goback from "@/components/component/goback";
import { url_44,url_46 } from "../../serviceAPI.config.js";
export default {
  components: {
    goback
  },
  data() {
    return {
      id: null
    };
  },
  created() {
    if (this.$route.params.id) {
      localStorage.setItem("aliPay", this.$route.params.id);
      this.id = this.$route.params.id;
    } else {
      this.id = localStorage["aliPay"];
    }
  },
  mounted() {
    var heig = document.documentElement.getBoundingClientRect().height;
    // console.log(heig)
    this.$nextTick(res => (this.$refs.payStyle.style.height = `${heig}px`));
  },
  methods: {
    pay(type) {
      if (type == 1) {
        this.axios({
          method: "post",
          data: {
            id: this.id
          },
          url: url_44
        }).then(res => {
          if (res.data.code == 100) {
            dsBridge.call("toPay", { type: 1 ,data:res.data.data});
            dsBridge.register("alipay", res =>{
                this.$toast.success({
                    message:"支付成功",
                    duration:1000
                })
                this.$router.push({name:"traving"})
            })
          }
        });
      }
      if (type == 2) {
        this.axios({
          method: "post",
          data: {
            id: this.id
          },
          url: url_46
        }).then(res => {
          if (res.data.code == 100) {
            let data1 = JSON.stringify(res.data.data)
            dsBridge.call("toPay", { type: 2 ,data:data1});
            dsBridge.register("wxpay", res =>{
                this.$toast.success({
                    message:"支付成功",
                    duration:1000
                })
                this.$router.push({name:"traving"})
            })
          }
        });
      }
    }
  }
};
</script>

<style scoped lang="less">
.payStyle {
  background-color: #f6f6f7;
  .cen {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    width: 5.7rem;
    height: 3rem;
    background-color: white;
    border-radius: 0.2rem;
    p {
      box-sizing: border-box;
      height: 1rem;
      line-height: 1rem;
      text-align: center;
      border-bottom: 1px solid #eee;
      font-family: PingFang-SC-Regular;
      font-size: 0.36rem;
    }
    div {
      box-sizing: border-box;
      height: 1rem;
      line-height: 1rem;
      text-align: center;
      border-bottom: 1px solid #eee;
      font-family: PingFang-SC-Regular;
      font-size: 0.36rem;
      text-align: left;
      img {
        width: 0.64rem;
        margin-left: 0.5rem;
      }
      span {
        padding-left: 0.4rem;
      }
    }
  }
}
</style>