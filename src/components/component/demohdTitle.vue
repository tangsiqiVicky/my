<template>
    <div class="hd">
        <div class="back" @click="$router.go(-1)">
            <img src="../../../static/img/images/fanhui.png">
        </div>
        {{title}}
    </div>
</template>

<script>
    export default {
        props:['title']
    }
</script>

<style scoped lang='less'>
.hd{
    position: relative;
    top: 0;
    left: 0;
    height: 0.88rem;
    line-height: 0.88rem;
    text-align: center;
    background-color: #236cee;
    font-family: PingFang-SC-Medium;
    font-size: 0.36rem;
    color: #fffefe;
    .back{
         position: absolute;
        top: 0;
        left: 0;
        width: 0.86rem;
        height: 100%;
        img{
            display: block;
        width: 0.16rem;
        height: 0.3rem;
        margin:0.3rem 0.25rem ;
        }
    }
}
</style>