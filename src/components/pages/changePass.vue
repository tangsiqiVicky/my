<template>
    <div class="reg" ref="reg">
        <hdTitle go="true" title="更改密码"></hdTitle>
        <!-- 注册信息 -->
        <form class="form">
            <div class="wrap">
                <input class="phone" name="phone" type="tel" v-model.lazy.trim="phone" placeholder="请输入手机号" @blur="checkPhone">
            </div>
            <div class="wrap">
                <input class="mima1" name="pass1" type="password" v-model.lazy.trim="password1" placeholder="请输入数字、字母混合6-18位新密码">
            </div>
            <div class="flex wrap">
                <input class="yanzhengup" type="tel" name="yanzhengma" v-model.lazy.trim="yanzhengma" placeholder="输入验证码">
                <input class="yanzhengma" type="button" v-model.lazy.trim="getYanzheng" @click="time" :disabled="isDisab">
            </div>
            <!-- 禁用form事件 -->
            <input class="tijiao" type="button" value="更改密码" @click="upload">
        </form>
    </div>
</template>

<script>
    import hdTitle from '@/components/component/hdTitle'
    import { url_1, url_2,url_6 } from '../../serviceAPI.config';
    export default {
        components: {
            hdTitle
        },
        data() {
            return {
                phone: '',
                yanzhengma: '',
                password1: '',
                isPhone: false,
                getYanzheng: '短信验证',
                reg: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z_-]{6,18}$/,
                countdown: 59,
                isDisab: false,
                timer: null,
                isreg: false //是否注册
            }
        },
        // created(){
        //     console.log(localStorage)
        // },
        mounted() {
            var heig = document.documentElement.getBoundingClientRect().height
            // console.log(heig)
            this.$nextTick(res => this.$refs.reg.style.height = `${heig}px`)
        },
        methods: {
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
                this.axios({
                    method: "post",
                    url: url_1,
                    data: {
                        phone: this.phone
                    }
                }).then(res => {
                     if (res.data.code == 100) {
                        this.$toast({
                            message: '该手机号未注册',
                            duration: 1200
                        });
                        this.phone = ""
                        return this.isreg = true
                    }
                },res =>{
                    console.log("网络出错")
                })
                this.isPhone = true
            },
            time() {
                if (!this.isPhone) {
                    this.$dialog.alert({
                        message: '请填写正确手机号'
                    })
                    return false
                }
                if (this.password1) {
                    if (!this.reg.test(this.password1)) {
                        this.$dialog.alert({
                            message: '请输入数字、字母混合6-18位密码，不能为特殊字符'
                        })
                        return false
                    }
                }
                if (this.isreg) {
                    return false
                }
                this.axios({
                    method: 'post',
                    data: {
                        phone: this.phone
                    },
                    url: url_2
                }).then(res => {
                      if (res.data.code == 100) {
                        this.$toast({
                            message: '发送成功',
                            duration: 1200
                        });
                       
                        this.timer = setInterval(this.down, 1000)
                    }else{
                        this.$toast({
                            message: '发送失败',
                            duration: 1200
                        });
                    }
                })
            },
            down() {
                if (this.countdown == 0) {
                    clearInterval(this.timer)
                    this.timer = null
                    this.isDisab = false
                    this.getYanzheng = '获取验证码'
                    this.countdown = 59
                    return
                } else {
                    this.isDisab = true
                    this.getYanzheng = `重新发送(${this.countdown}s)`
                    this.countdown--
                }
            },
            upload() {
                if (!(this.phone && this.password1 && this.yanzhengma)) {
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
                        newPwd: this.password1,
                        code: this.yanzhengma
                    },
                    url: url_6
                }).then(res => {
                    if (res.data.code ==100) {
                        this.$toast({
                            message:"修改成功",
                            duration:500
                        })
                        setTimeout(
                            res =>{
                                this.$router.push({name:"login",params:{index:true}})
                            },500
                        )
                    } else {
                       this.$toast({
                            message:"修改失败",
                            duration:500
                        })
                    }
                })
            }
        }
    }
</script>

<style scoped rel="stylesheet/less" lang='less'>
    @wid6: 100%;
    .reg {
        background-color: #f6f6f7;
        .form {
            margin: 10px auto;
            font-family: PingFang-SC-Regular;
            .flex {
                display: flex;
                justify-content: space-between
            }
            .wrap {
                width: @wid6;
                margin-bottom: 4px;
                input {
                    display: block;
                    width: @wid6;
                    height: 0.9rem;
                    outline: none;
                    border: none;
                    text-indent: 0.64rem;
                    color: #666;
                    font-size: 0.3rem;
                }
                .yanzhengup {
                    flex: 1;
                }
                .yanzhengma {
                    width: 2.8rem;
                    height: 0.9rem;
                    background-color: #199cd7;
                    color: white;
                    text-indent: 0;
                    border: 0.04rem solid #199cd7;
                }
            }
            .tijiao {
                display: block;
                width: 6.68rem;
                height: 0.8rem;
                font-size: 0.36rem;
                background-color: #199cd7;
                border-radius: 0.4rem;
                border: none;
                outline: none;
                margin: 1.4rem auto 0;
                color: #feffff;
                letter-spacing: 2px;
            }
        }
    }
</style>