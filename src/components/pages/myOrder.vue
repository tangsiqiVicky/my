<template>
    <div class="myOrder" ref="myOrder">
        <h222 go="true" title="购买订单" name1="order"></h222>
        <div class="head">
            <div class="item" v-for="(item,index) in tabs" :key="index" @click="idx =index;$router.push({name:item.push})">
                <img :src="item.imgUrl">
                <p :class="{on:index == idx}">{{item.txt}}</p>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
    import h222 from '@/components/component/h2'
    export default {
        components:{
            h222
        },
        data() {
            return {
                idx:null,
                tabs:[
                    {
                        imgUrl:require("../../../static/images/quanbudingdan.png"),
                        txt:"全部订单",
                        push:"all"
                    },
                    {
                        imgUrl:require("../../../static/images/daifukuan.png"),
                        txt:"待付款",
                        push:"paying"
                    },
                    {
                        imgUrl:require("../../../static/images/daichuyou.png"),
                        txt:"待出游",
                        push:"traving"
                    },
                    {
                        imgUrl:require("../../../static/images/daipingjia.png"),
                        txt:"待评价",
                        push:"evaling"
                    },
                    {
                        imgUrl:require("../../../static/images/tuikuan.png"),
                        txt:"退款",
                        push:"cancel"
                    }
                ]
            }
        },
        mounted(){
            this.idx = localStorage["order"]
            console.log(this.idx)
            var heig = document.documentElement.getBoundingClientRect().height
            // console.log(heig)
            this.$nextTick(res => this.$refs.myOrder.style.minHeight = `${heig}px`)
        }

    }
</script>

<style scoped lang="less">
    .myOrder{
        background-color: #f6f6f7;
        .head{
            margin-top: 0.13rem;
            background-color: white;
            display: flex;
            .item{
                flex: 1;
                img{
                    height: 0.52rem;
                    width: auto;
                    margin-top: 0.21rem;
                }
                p{
                    margin-bottom: 0.1rem;
                    font-family: PingFang-SC-Medium;
                    font-size: 0.24rem;
                    font-weight: bold;
                }
                p.on{
                    color:#ff7979;
                }
            }
        }
    }
</style>