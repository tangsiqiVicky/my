<template>
    <div class="reg">
        <goback title=""></goback>
        <div class="logo">
            <img src="../../../static/images/moyvtubiao.png">
        </div>
        <div class="regi">
            <img src="../../../static/images/moyvziti.png">
        </div>
        <!-- 注册信息 -->
        <form class="form">
            <transition enter-active-class="animated bounceInRight" leave-active-class="animated bounceOut">
                <div class="wrap" v-if="anishow">
                    <input class="phone" name="phone" type="tel" v-model.lazy.trim="phone" placeholder="手机号" @blur="checkPhone">
                </div>
            </transition>
            <transition enter-active-class="animated bounceInLeft" leave-active-class="animated bounceOut">
                <div class="wrap" v-if="anishow">
                    <input class="mima1" name="pass1" type="password" v-model.lazy.trim="password1" placeholder="密码">
                </div>
            </transition>
            <!-- 禁用form事件 -->
            <transition enter-active-class="animated flip" leave-active-class="animated bounceOut">
                <input v-if="anishow" class="tijiao" type="button" value="登录" @click="upload">
            </transition>
            <div class="wrap2 clearFix">
                <div class="fl" @click="$router.push('/register')">新用户注册</div>
                <div class="fr" @click="$router.push('/forgetPass')">忘记密码</div>
            </div>
        </form>
        <div class="login" :style="backImg">
            <div @click="qqlogin">
                <img src="../../../static/images/qq.png">
                <span>QQ登陆</span>
            </div>
            <div @click="wxlogin">
                <img src="../../../static/images/weixin.png">
                <span>微信登陆</span>
            </div>
        </div>
    </div>
</template>

<script>
    import goback from '@/components/component/goback'
    import {url_4,url_41} from  '../../serviceAPI.config.js'
    import store from '../../../vuex/store'
    import {
        mapState,
        mapMutations
    } from "vuex"
    export default {
        components: {
            goback
        },
        data() {
            return {
                anishow: false,
                phone: '',
                password1: '',
                isPhone: false,
                reg: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z_-]{6,18}$/,
                backImg: {
                    backgroundImage: "url(" + require("../../../static/images/fengexian.png") + ")",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "left top",
                    backgroundSize: "100% 2px"
                },
            }
        },
        // created(){
        //     console.log(localStorage)
        // },
        mounted() {
            this.anishow = !this.anishow
        },
        store,
        computed: mapState(["idx"]),
        methods: {
            ...mapMutations(['setIdx']),
            checkPhone() {
                if (!this.phone) {
                    this.$dialog.alert({
                        message: '请输入正确手机号'
                    })
                    // this.$toast({
                    //     duration:1000,
                    //     message:'请输入正确手机号'
                    // })
                    return false
                }
                if (!this.phone.match(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/)) {
                    this.$dialog.alert({
                        message: '手机格式错误'
                    })
                    this.phone = ""
                    return false
                    // this.$refs.input1.focus();
                    // this.$refs.input1.value = ""  
                }
                this.isPhone = true
            },
            upload() {
                if (!(this.phone && this.password1)) {
                    this.$dialog.alert({
                        message: '请填写完整内容'
                    })
                    return false
                }
                if (!this.reg.test(this.password1)) {
                    this.$dialog.alert({
                        message: '请输入数字、字母混合6-18位密码，不能为特殊字符'
                    })
                    return false
                }
                this.axios({
                    method: 'post',
                    data: {
                        phone: this.phone,
                        password: this.password1,
                    },
                    url: url_4
                }).then(res => {
                    if (res.data.code ==100) {
                        localStorage.setItem("Token", res.data.data.token)
                        localStorage.setItem("user", JSON.stringify(res.data.data))
                        if(!this.$route.params.index){
                            this.$router.go(-1)
                        }else{
                            this.$router.push({name:"moyu1"})
                            this.setIdx(0)
                        }
                        
                    } else {
                        this.$dialog.alert({
                            message: "账号或密码错误"
                        })
                    }
                })
            },
            qqlogin() {
                dsBridge.call("thirdPartyLogin",{type:2});
                dsBridge.register("qqlogin", res => {
                    localStorage.setItem("qqlogin", res)
                    this.axios({
                            method:"post",
                            data:{
                                type:2,
                                openId:JSON.parse(localStorage["qqlogin"]).openid
                            },
                            url:url_41
                        }).then(res =>{
                            if(res.data.code ==100){
                                localStorage.setItem("Token", res.data.data.token)
                                localStorage.setItem("user", JSON.stringify(res.data.data))
                                this.$toast({
                                    message:"登陆成功",
                                    duration:500
                                })
                                setTimeout(res=>{
                                    this.$router.push({name:"moyu1"})
                                    this.setIdx(0)
                                },500)                               
                            }else if(res.data.code ==404){
                                this.$router.push({name:"bind",params:{type:2,openId:JSON.parse(localStorage["qqlogin"]).openid}})
                            }
                        })
                });
            },
            wxlogin() {
                dsBridge.call("thirdPartyLogin",{type:1});
                dsBridge.register("wxlogin", res => {
                    localStorage.setItem("wxlogin", res)
                    this.axios({
                            method:"post",
                            data:{
                                type:1,
                                openId:JSON.parse(localStorage["wxlogin"]).openid
                            },
                            url:url_41
                        }).then(res =>{
                            if(res.data.code ==100){
                                localStorage.setItem("Token", res.data.data.token)
                                localStorage.setItem("user", JSON.stringify(res.data.data))
                                this.$router.push({name:"moyu1"})
                                this.setIdx(0)
                            }else if(res.data.code ==404){
                                this.$router.push({name:"bind",params:{type:1,openId:JSON.parse(localStorage["wxlogin"]).openid}})
                            }
                        })
                });
            }
        }
    }
</script>

<style scoped rel="stylesheet/less" lang='less'>
@wid6: 5.9rem;
.logo {
  margin: 0.34rem auto 0.6rem;
  width: 2.06rem;
  height: 2.06rem; // height: 1.27rem;
  img {
    display: block;
    width: 100%;
    height: 100%;
  }
}
.regi {
  img {
    display: block;
    width: 1.43rem;
    height: 0.68rem;
    margin: auto;
  }
}
.form {
  margin: 0.8rem auto 0; // padding-bottom:05rem;
  font-family: PingFang-SC-Regular;
  .flex {
    display: flex;
    justify-content: space-between;
  }
  .wrap2 {
    width: @wid6;
    margin: 0.3rem auto;
    font-size: 0.24rem;
    color: #7b7575;
  }
  .wrap {
    width: @wid6;
    margin: 0 auto 0.5rem;
    input {
      display: block;
      width: @wid6;
      height: 0.74rem;
      border-radius: 0.37rem;
      border: 0.04rem solid #199cd7;
      outline: none;
      text-indent: 0.64rem;
      color: #666;
      font-size: 0.3rem;
    }
  }
  .tijiao {
    display: block;
    width: @wid6;
    height: 0.74rem;
    font-size: 0.36rem;
    background-color: #199cd7;
    border-radius: 0.35rem;
    border: none;
    outline: none;
    margin: 0 auto;
    color: #feffff;
    letter-spacing: 2px;
  }
}
.login {
  display: flex;
  margin: 1rem auto 0.2rem;
  padding-top: 0.6rem;
  div {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
      width: 0.88rem;
      height: 0.88rem;
    }
  }
}
</style>