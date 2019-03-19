<template>
    <div ref="index" class="index">
        <div class="tit">
            <span :class="{secelt:idx == index}" @click="go(index)" v-for="(item,index) in items" :key="index">
                    {{item}}
            </span>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                items:[
                    "热门","关注"
                ],
                idx: 0
            }
        },
        mounted() {
            var heig = document.documentElement.getBoundingClientRect().height
            this.$nextTick(res => this.$refs.index.style.minHeight = `${heig}px`)
        },
        methods:{
            go(index){
                this.idx = index
                !index? this.$router.push("moyu1") :this.$router.push("moyu2") 
            }
        }
    }
</script>

<style scoped lang="less">
    .index {
        background-color: #f6f6f7;
        .tit {
            height: 0.88rem;
            line-height: 0.88rem;
            font-family: PingFang-SC-Regular;
            font-size: 0.36rem;
            background-color: white;
            color: #000000; // font-weight:bold; 
            span.secelt {
                color: #1296db;
                &::after{
                    content:"";
                    position: absolute;
                    bottom: 0;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 0.4rem;
                    height: 2px;
                    background-color:#1296db; 
                }
            }
            span {
                display: inline-block;
                position: relative;
                &:nth-child(1) {
                    margin-right: 0.44rem;
                }
            }
        }
    }
</style>