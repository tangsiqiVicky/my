<template>
    <div class="tips" ref="syTips">
        <hdTitle go="true" title="系统通知"></hdTitle>
        <div class="wrap" v-for="(item,index) in tips" :key="index">
            <div class="info1 clearFix">
                <img class="fl" src="../../../static/images/xitongtongzhitubiao.png">
                <span class="fl">系统通知</span>
            </div>
            <hr>
            <div class="info2">
                {{item.content}}
            </div>
            <hr>
            <div class="info3">
                {{item.createTime | getTimeStyle}}
            </div>
        </div>
    </div>
</template>

<script>
    import hdTitle from '@/components/component/hdTitle'
    import {url_27} from  '../../serviceAPI.config.js'
     import {
        imgUrl,getTimeS
    } from '@/filter/filter.js'
    export default {
        components: {
            hdTitle
        },
        filters: {
            picUrl(url) {
                return imgUrl(url)
            },
             getTimeStyle(time){
                return getTimeS(time)
            }
        },
        data() {
            return {
                tips: [
                ]
            }
        },
         created(){
            this.$toast.loading({
                mask:true,
                message:"加载中...",
                duration:500000
            })
            this.axios({
                method:"get",
                params:{
                    userId:JSON.parse(localStorage["user"]).id
                },
                url:url_27
            }).then(res=>{
                if(res.data.code == 100){
                    this.tips = res.data.data
                    this.$toast.clear()
                }
                
            })
        },
        mounted() {
            var heig = document.documentElement.getBoundingClientRect().height
            // console.log(heig)
            this.$nextTick(res => this.$refs.syTips.style.minHeight = `${heig}px`)
        }
    }
</script>

<style scoped lang="less">
    .tips {
        background-color: #f6f6f7;
        .wrap {
            width: 6.04rem; // height: 4.06rem;
            margin:0.15rem auto;
            background-color: white;
            hr {
                height: 2px;
                border: none;
                background-color: #f0f0f0;
            }
            .info1 {
                height: 0.84rem;
                img {
                    width: 0.48rem;
                    height: 0.48rem;
                    padding: 0.18rem 0.2rem;
                }
                span {
                    height: 0.84rem;
                    line-height: 0.84rem;
                    font-family: PingFang-SC-Bold;
                    font-size: 0.3rem;
                }
            }
            .info2 {
                width: 4.8rem;
                margin: 0.45rem auto;
                font-family: PingFang-SC-Medium;
                font-size: 0.24rem;
                text-align: left;
                text-indent: 2em;
            }
            .info3 {
                height: 0.5rem;
                line-height: 0.5rem;
                font-family: PingFang-SC-Medium;
                font-size: 0.18rem;
                text-align: right;
                transform: translateX(-0.34rem);
            }
        }
    }
</style>