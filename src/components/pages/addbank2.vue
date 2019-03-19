<template>
    <div>
        <div class="tips">请绑定持卡人本人的银行卡</div>
        <div class="item">
            <p>持卡人</p>
            <input type="text" v-model.lazy.trim="cardInfo.name" placeholder="姓名">
        </div>
        <div class="item">
            <p>卡号</p>
            <input type="text" v-model.lazy.trim="cardInfo.card" placeholder="请输入银行卡号">
        </div>
        <div class="item">
            <p>所开户银行</p>
            <input type="text" v-model.lazy.trim="cardInfo.cardName" placeholder="请输入开户银行">
        </div>
        <div class="item">
            <p>身份证号</p>
            <input type="text" v-model.lazy.trim="cardInfo.ident" placeholder="请输入身份证号">
        </div>
        <div class="item">
            <p>手机号</p>
            <input type="text" v-model.lazy.trim="cardInfo.phone" placeholder="请输入银行预留手机号">
        </div>
        <div class="upload" @click="$router.push('/addBank/addBank3')">确认提交</div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                cardInfo:{
                    name:'',
                    card:"",
                    cardName:"",
                    ident:"",
                    phone:""
                }
            }
        }
    }
</script>

<style scoped lang="less" rel="stylesheet/less">
    .tips {
        height: 0.67rem;
        line-height: 0.85rem;
        text-indent: 0.4rem;
        text-align: left;
        font-size: 0.24rem;
    }
    .item {
        display: flex;
        height: 0.9rem;
        background-color: white;
        margin-bottom: 3px;
        font-family: PingFang-SC-Regular;
        font-size: 0.3rem;
        p {
            width: 2.3rem;
            height: 0.9rem;
            line-height: 0.9rem;
            text-align: left;
            padding-left: 0.4rem;
            color: #000000;
        }
        input {
            flex: 1;
            outline: none;
            border: none;
        }
    }
    .upload {
        width: 6.68rem;
        height: 0.8rem;
        background-color: #1296db;
        border-radius: 0.4rem;
        line-height: 0.8rem;
        margin: 0.6rem auto 0;
        color: #fefefe;
        font-size: 0.36rem;
    }
</style>