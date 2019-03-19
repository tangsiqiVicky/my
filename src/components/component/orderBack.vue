<template>
    <div class="hd">
        <div v-if="title?false:true" class="back" @click="$router.go(-1)">
            <img src="../../../static/images/fanhui.png"><span>{{titLeft}}</span>
        </div>
        {{title}}
        <div class="share" v-if="share">
            <img class="more" src="../../../static/images/gengduo.png" @click="ani">
            <transition enter-active-class="animated flip" leave-active-class="animated bounceOut">
                <div class="jubao" v-show="!jb">
                    <img class="s1" src="../../../static/images/fenxiang.png" @click="showShare">
                    <img class="j1" src="../../../static/images/jvbao.png" @click="showAlert">
                </div>
            </transition>                
        </div>
    </div>
</template>

<script>
    export default {
        props:['title','titLeft','share'],
        data() {
            return {
                jb:false,
            }
        },
        methods:{
            ani(){
                this.jb = !this.jb
            },
            showAlert(){
                this.$emit("alert",true)
            },
            showShare(){
                this.$emit("share1",true)
            }
        }
    }
</script>

<style scoped lang="less" rel="stylesheet/less">
.hd{
    position: relative;
    top: 0;
    left: 0;
    height: 0.88rem;
    line-height: 0.88rem;
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
            margin:0.24rem 0.21rem 0.4rem 0.24rem;
        }
        span{
            padding-left:0 0 0 0.4rem; 
        }
    }
    .share{
        position: absolute;
        width: 0.7rem;
        height: 0.88rem;
        right: 0;
        top: 0;
        z-index: 999;
        .more{
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            top: 0;
            width: 0.1rem;
            height: 0.49rem;
            margin: auto;
        }
        .jubao{
            position: absolute;
            right: 0.04rem;
            bottom: -1.66rem;
            width: 0.66rem;
            height: 1.66rem;
            background-color: white;
            border-radius: 0 0 0.33rem 0.33rem;
            .s1{
                display: block;
                margin: 0.1rem auto 0;
                width: 0.38rem;
                height: 0.43rem;
            }
            .j1{
                display: block;
                margin: 0.3rem auto 0;
                width: 0.39rem;
                height: 0.42rem;
            }
        }
    }
}
</style>