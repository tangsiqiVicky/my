<template>
    <div ref="pub" class="pub">
        <h222 go="true" title="兑换记录" name1="order"></h222>
        <van-list v-model="loading" :finished="finished" :offset="300" @load="onload">
            <div class="wrap">
                <div class="item" v-for="(item,index) in info" :key="index" @click="alert">
                    <div class="img">
                        <img :src="item.img |picUrl">
                    </div>
                    <div class="info">
                        <p class="tit">{{item.exchangeTitle}}</p>
                        <p class="time">{{item.createTime |getTimeStyle}}</p>
                        <span :class='[!item.address?"video":"img"]' v-if="type">{{!item.address?type[1]:type[0]}}</span>
                    </div>
                </div>
            </div>
        </van-list>
    </div>
</template>

<script>
    import h222 from '@/components/component/h2'
    import {
        url_33
    } from '../../serviceAPI.config.js'
    import {
        imgUrl,
        getTimeS
    } from '@/filter/filter.js'
    export default {
        components: {
            h222
        },
        filters: {
            picUrl(url) {
                return imgUrl(url)
            },
            getTimeStyle(time) {
                return getTimeS(time)
            }
        },
        data() {
            return {
                type: ["物品", "路线"],
                info: [],
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
                        userId: JSON.parse(localStorage["user"]).id,
                        pageNum:this.pageNum
                    },
                    url: url_33
                }).then(
                    res => {
                        if (res.data.code == 100) {
                            this.pageNum++
                            this.info = this.info.concat(res.data.data)
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
            alert(){
                this.$toast({
                    message:'详情请联系客服',
                    duration:1000
                })
            }
        },
        created() {
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
            this.$nextTick(res => this.$refs.pub.style.minHeight = `${heig}px`)
        }
    }
</script>

<style scoped lang="less">
    .pub {
        background-color: #f6f6f7;
        .wrap {
            .item {
                display: flex;
                margin-top: 0.1rem;
                padding: 0.2rem;
                background-color: white;
                .img {
                    width: 2.2rem;
                    max-width: 2.2rem;
                    height: 1.64rem;
                    margin-right: 0.3rem;
                    overflow: hidden;
                    img {
                        display: block;
                        // width: auto;
                        width: 2.2rem;
                        height: 1.64rem;
                    }
                }
                .info {
                    text-align: left;
                    .tit {
                        font-family: PingFang-SC-Regular;
                        font-size: 0.3rem;
                        color: black;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                    .time {
                        font-family: PingFang-SC-Medium;
                        font-size: 0.24rem;
                        color: #b3b0b0;
                    }
                    .video {
                        font-size: 0.2rem;
                        padding: 0.05rem 0.1rem;
                        background-color: #5CB85C;
                        border-radius: 0.1rem;
                    }
                    .img {
                        font-size: 0.2rem;
                        padding: 0.05rem 0.1rem;
                        background-color: #3AA6F6;
                        border-radius: 0.1rem;
                    }
                }
            }
        }
    }
</style>