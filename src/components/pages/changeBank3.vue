<template>
    <div class="yanzheng">
        <p v-if="issend">绑定银行卡需短信确认，请点击短信验证按钮发送验证码</p>
        <p v-else>绑定银行卡需要短信确认，验证码已发送到手机:{{phone}}</p>
        <p>请按提示操作</p>
        <div class="flex wrap">
            <input class="yanzhengup" type="tel" name="yanzhengma" v-model.lazy.trim="yanzhengma" placeholder="输入验证码">
            <input class="yanzhengma" type="button" v-model.lazy.trim="getYanzheng" @click="time" :disabled="isDisab">
        </div>
        <div class="upload" @click="upload">
            确认绑定
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                phone: "18112658876",
                issend: true,
                getYanzheng: "短信验证",
                yanzhengma: "",
                countdown: 59,
                isDisab: false
            }
        },
        methods: {
            time() {
                this.axios({
                    method: 'get',
                    data: {
                        phone: this.phone
                    },
                    url: 'https://www.easy-mock.com/mock/5b28e329e0859d132780ff31/example_copy/token'
                }).then(res => {
                    console.log(res)
                    if (res.status == 200) {
                        this.$toast({
                            message: '发送成功',
                            duration: 1200
                        });
                        // this.$dialog.alert({
                        //     message:'发送成功'
                        // })
                        this.issend = false;
                        this.timer = setInterval(this.down, 1000)
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
                this.axios({
                    method:"get",
                    data:{
                        yanzhengma:this.yanzhengma
                    },
                    url:"https://www.easy-mock.com/mock/5b28e329e0859d132780ff31/example_ctoken"
                }).then(res=>{
                    console.log(1)
                },res=>{
                    console.log(2)
                })
            }
        }
    }
</script>

<style rel="stylesheet/less" scoped lang="less">
    .yanzheng {
        padding-top: 0.3rem;
        p {
            width: 7rem;
            font-size: 0.24rem;
            margin: auto; // text-align: left
            text-align: left
        }
        .wrap {
            display: flex;
            justify-content: space-between;
            width: 6rem;
            margin: 0.6rem auto 0.5rem;
            input {
                display: block;
                height: 0.74rem;
                border-radius: 0.37rem;
                border: 0.04rem solid #199cd7;
                outline: none;
                text-indent: 0.64rem;
                color: #666;
                font-size: 0.3rem;
            }
            .yanzhengup {
                width: 2.8rem;
            }
            .yanzhengma {
                width: 2.8rem;
                height: 0.82rem;
                background-color: #199cd7;
                color: white;
                text-indent: 0;
                border: 0.04rem solid #199cd7;
            }
        }
        .upload {
            width: 6.68rem;
            height: 0.8rem;
            line-height: 0.8rem;
            color: white;
            margin: 1.4rem auto 0;
            background-color: #199cd7;
            border-radius: 0.4rem;
        }
    }
</style>