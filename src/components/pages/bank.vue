<template>
    <div class="bank" ref="bank">
        <hdTitle go="true" title="银行卡管理"></hdTitle>
        <!-- 绑定银行卡 -->
        <div class="nickName clearFix" @click="$router.push('/addBank')">
            <p class="fl">绑定银行卡</p>
            
            <img class="fr" src="../../../static/images/jiantou.png">
            <div class="fr" v-if="isbangding">未绑定</div>
        </div>
        <!-- 更换银行卡 -->
        <div class="nickName clearFix" @click="$router.push('/changeBank')">
            <p class="fl">更换银行卡</p>
            
            <img class="fr" :src="imgUrl">
        </div>
    </div>
</template>

<script>
    import hdTitle from '@/components/component/hdTitle'
    export default {
        components: {
            hdTitle
        },
        data() {
            return {
                isbangding:true,
                imgUrl:require("../../../static/images/jiantou.png")
            }
        },
        mounted() {
            var heig = document.documentElement.getBoundingClientRect().height
            // console.log(heig)
            this.$nextTick(res => this.$refs.bank.style.height = `${heig}px`)
        }
    }
</script>

<style scoped rel="stylesheet/less" lang="less">
    @whi:white;
    .bank {
        background-color: #f6f6f7;
        .nickName {
            margin-top: 10px;
            background-color: @whi;
            p {
                padding-left: 0.26rem;
                height: 0.9rem;
                line-height: 0.9rem;
            }
            div{
                height: 0.9rem;
                line-height: 0.9rem;
                color: #c1bfbf;
                padding-right: 0.21rem;
            }
            img {
                width: 0.16rem;
                height: 0.27rem;
                padding-top: 0.3rem;
                padding-right: 0.3rem;
            }
        }
    }
</style>