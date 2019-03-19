<template>
    <div ref="seckill" class="seckill">
        <hdTitle go="true" title="热门推荐"></hdTitle>
        <van-list v-model="loading" :finished="finished" :offset="300" @load="onload">
            <div class="wrap">
                <div class="item" v-for="(item,index) in recom" :key="index" @click="$router.push({name:'recomDetail',params:{id:item.id}})">
                    <img :src="item.titleImg |picUrl">
                    <p class="tit">{{item.title}}</p>
                    <span class="price">￥{{item.price}}/人起</span>
                    <!-- <p class="num">{{item.num}}人已抢购</p>
                        <div class="time">
                            抢购{{item.time.hh}}:{{item.time.mm}}:{{item.time.ss}}
                        </div> -->
                </div>
            </div>
        </van-list>
    </div>
</template>

<script>
    import hdTitle from '@/components/component/hdTitle'
    import {
        imgUrl
    } from '@/filter/filter.js'
    import {
        url_22
    } from '../../serviceAPI.config.js'
    export default {
        components: {
            hdTitle
        },
        filters: {
            picUrl(url) {
                return imgUrl(url)
            }
        },
        data() {
            return {
                recom:[],
                loading: false,
                finished: false,
                pageNum: 1,
            }
        },
        methods: {
            onload() {
                this.axios({
                    method: 'get',
                    params: {
                        pageNum: this.pageNum,
                        type: 0
                    },
                    url: url_22
                }).then(
                    res => {
                        if (res.data.code == 100) {
                            console.log(res)
                            this.pageNum++
                                for (let item of res.data.data) {
                                    item.titleImg = item.titleImg.split(",")[0]
                                    item.img = item.img.split(",")
                                }
                            this.recom = this.recom.concat(res.data.data)
                            this.loading = false
                            this.$toast.clear()
                            if (res.data.data.length < 10) {
                                this.$toast({
                                    message: '官人，没有数据啦',
                                    duration: "500"
                                });
                                this.finished = true
                            }
                        }
                    }
                )
            },
        },
        created(){
            this.$toast.loading({
                mask: true,
                message: '加载中...',
                // duration: "50000"
                duration: "50000"
            });
        },
        mounted() {
            var heig = document.documentElement.getBoundingClientRect().height
            // console.log(heig)
            this.$nextTick(res => this.$refs.seckill.style.minHeight = `${heig}px`)
        }
    }
</script>

<style scoped lang="less">
    .seckill {
        background-color: #f6f6f7;
        .wrap {
            width: 6.9rem;
            margin: auto;
            padding-top: 0.1rem;
            .item {
                position: relative;
                margin-top: 0.1rem;
                letter-spacing: 1px;
                max-height: 3.5rem;
                overflow: hidden;
                img {
                    display: block;
                    width: 100%;
                    height: auto;
                }
                .tit {
                    position: absolute;
                    left: 0.3rem;
                    top: 0.3rem;
                    font-family: PingFang-SC-Bold;
                    font-size: 0.24rem;
                    color: white;
                    letter-spacing: 1px
                }
                .price {
                    position: absolute;
                    left: 0.4rem;
                    bottom: 0.2rem;
                    // width: 1.72rem;
                    height: 0.4rem;
                    padding: 0 0.1rem;
                    line-height: 0.4rem;
                    background-color: #ff9242;
                    border-radius: 0.2rem;
                    font-size: 0.24rem;
                }
            }
        }
    }
</style>