<template>
    <div class="hdTitle">
        <div v-if="go" class="back" @click="$router.go(-1)">
            <img src="../../../static/images/fanhui.png">
        </div>
        <p>{{title}}</p>
    </div>
</template>

<script>
    export default {
        props: ['title', 'go']
    }
</script>

<style scoped lang='less'>
    .hdTitle {
        position: relative;
        top: 0;
        left: 0;
        height: 0.88rem;
        line-height: 0.88rem;
        text-align: center;
        background-color: white;
        font-family: PingFang-SC-Medium;
        font-size: 0.36rem;
        color: black;
        .back {
            position: absolute;
            top: 0;
            left: 0;
            width: 0.86rem;
            height: 100%;
            img {
                display: block;
                width: 0.16rem;
                height: 0.3rem;
                margin: 0.3rem 0.25rem;
            }
        }
        p {
            width: 5.12rem;
            height: 0.88rem;
            margin: auto;
            line-height: 0.88rem;
            text-align: center;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
    }
</style>