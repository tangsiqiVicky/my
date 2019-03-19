<template>
    <div ref="nickName" class="nickName">
        <hdTitle go="true" title="更改昵称"></hdTitle>
        <input class="inp1" type="text" placeholder="更改昵称" v-model.lazy.trim="val">
        <div class="upload" @click="upload">确认更改</div>
    </div>
</template>

<script>
    import hdTitle from '@/components/component/hdTitle'
    import {
        url_7
    } from '../../serviceAPI.config';
    export default {
        components: {
            hdTitle
        },
        data() {
            return {
                val: ""
            }
        },
        methods: {
            upload() {
                if (this.val.length == 0) {
                    this.$toast({
                        message: "请输入新昵称",
                        duration: 1000
                    })
                    return false
                }
                this.axios({
                    method: "post",
                    data: {
                        userId: JSON.parse(localStorage["user"]).id,
                        newName: this.val
                    },
                    url: url_7
                }).then(
                    res => {
                        if (res.data.code == 100) {
                            this.$toast({
                                message: "修改成功",
                                duration: 1000
                            })
                            this.$router.go(-1)
                        } else {
                            this.$toast({
                                message: "修改失败"
                            })
                        }
                    },
                    res => {
                        this.$toast({
                            message: "修改失败"
                        })
                    }
                )
            }
        },
        mounted() {
            var heig = document.documentElement.getBoundingClientRect().height
            // console.log(heig)
            this.$nextTick(res => this.$refs.nickName.style.height = `${heig}px`)
        }
    }
</script>

<style scoped lang="less" rel="stylesheet/less">
    .nickName {
        background-color: #F6F6F7;
        .inp1 {
            display: block;
            border: none;
            outline: none;
            width: 7.2rem;
            height: 0.8rem;
            line-height: 0.8rem;
            border-bottom: 1px solid #1296db;
            margin: 30px auto;
            background-color: #F6F6F7; // text-align: center;
        }
        .upload {
            width: 6.68rem;
            height: 0.8rem;
            background-color: #1296db;
            border-radius: 0.4rem;
            line-height: 0.8rem;
            margin: 1.5rem auto;
            color: #fefefe;
            font-size: 0.36rem;
        }
    }
</style>