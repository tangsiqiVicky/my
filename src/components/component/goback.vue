<template>
    <div class="hd">
        <div v-if="title?false:true" class="back" @click="$router.go(-1)">
            <img src="../../../static/images/fanhui.png"><span>返回</span>
        </div>
        {{title}}
    </div>
</template>

<script>
    export default {
        props:['title']
    }
</script>

<style scoped lang="less" rel="stylesheet/less">
.hd{
    position: relative;
    top: 0;
    left: 0;
    height: 1.2rem;
    line-height: 1.2rem;
    text-align: center;
    font-family: PingFang-SC-Regular;
    font-size: 0.36rem;
    color: black;
    background: white;
    .back{
        display: flex;
        position: absolute;
        top: 0;
        left: 0;
        // width: 0.86rem;
        height: 100%;
        font-size: 0.3rem;
        img{
            // display: i;
            width: 0.22rem;
            height: 0.39rem;
            margin:0.4rem 0.21rem 0.4rem 0.4rem;
        }
    }
}
</style>