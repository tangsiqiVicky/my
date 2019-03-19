<template>
    <div ref="seckill" class="seckill">
        <hdTitle go="true" title="限时秒杀"></hdTitle>
        <van-list v-model="loading" :finished="finished" :offset="300" @load="onload">
            <div class="wrap">
                <div class="item" v-for="(item,index) in sec" :key="index" @click="$router.push({name:'seckillDetail',params:{id:item.id}})">
                    <img :src="item.titleImg |picUrl">
                    <p class="tit">{{item.title}}</p>
                    <span class="price">￥{{item.price}}/人起</span>
                    <p class="num">{{item.count}}人已抢购</p>
                    <div class="time">
                        抢购{{item.newTime}}
                    </div>
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
        url_22,
        url_29
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
                sec: [],
                loading: false,
                finished: false,
                pageNum: 1,
                timer:null
            }
        },
        methods: {
            onload() {
                this.axios({
                    method: 'get',
                    params: {
                        pageNum: this.pageNum,
                        type: 1
                    },
                    url: url_22
                }).then(
                    res => {
                        if (res.data.code == 100) {
                            this.pageNum++
                                for (let item of res.data.data) {
                                    item.titleImg = item.titleImg.split(",")[0]
                                    item.img = item.img.split(",")
                                }
                            this.sec = this.sec.concat(res.data.data)
                            this.timeDown()
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
            timeDown() {
                this.timer = setInterval(() => {
                    var time = new Date().getTime()
                    var chuo
                    for (let item of this.sec) {
                        chuo = item.endTime - time
                        if (chuo >= 0) {
                            // let dd = Math.floor(chuo / 1000 /60 / 60 /24)
                            let hh = Math.floor(chuo / 1000 / 60 / 60)
                            let mm = Math.floor(chuo / 1000 / 60 % 60)
                            let ss = Math.floor(chuo / 1000 % 60)
                            item.newTime = this.getTime(hh) + ":" + this.getTime(mm) + ":" + this.getTime(ss)
                        } else {
                            this.axios({
                                method: "post",
                                data: {
                                    id: item.id
                                },
                                url: url_29
                            }).then(res => {
                                if (res.data.code == 100) {
                                    // console.log(res)
                                }
                            })
                            item.newTime = "失效"
                        }
                    }
                }, 1000)
            },
            getTime(time) {
                return time < 10 ? "0" + time : time
            }
        },
        destroyed() {
            clearInterval(this.timer)
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
                    padding: 0 0.1rem;
                    height: 0.4rem;
                    line-height: 0.4rem;
                    background-color: #ff9242;
                    border-radius: 0.2rem;
                    font-size: 0.24rem;
                }
                .num {
                    position: absolute;
                    right: 0;
                    padding: 0 0.15rem 0 0.2rem;
                    bottom: 0.8rem; // width: 1.47rem;
                    height: 0.4rem;
                    line-height: 0.4rem;
                    border-radius: 0.2rem 0 0 0.2rem;
                    background-color: rgba(255, 255, 255, 0.15);
                    color: white;
                    font-family: PingFang-SC-Regular;
                    font-size: 0.2rem;
                }
                .time {
                    position: absolute;
                    right: 0;
                    bottom: 0.2rem;
                    height: 0.4rem;
                    line-height: 0.4rem;
                    padding: 0 0.35rem 0 0.4rem;
                    border-radius: 0.2rem 0 0 0.2rem;
                    background-color: #fee95a;
                    font-family: PingFang-SC-Regular;
                    font-size: 0.2rem;
                    letter-spacing: 0.04rem;
                }
            }
        }
    }
</style>