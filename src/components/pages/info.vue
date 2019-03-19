<template>
    <div class="info" ref="info">
        <hdTitle go="true" title="墨鱼环球资讯"></hdTitle>
        <van-list v-model="loading" :finished="finished" :offset="300" @load="onload">
            <div class="wrap">
                <div class="con" v-for="(item,index) in news" :key="index" @click="$router.push({
                        name:'infoDetail',
                        params:{id:item.id}
                    })">
                    <h4>{{item.title}}</h4>
                    <div class="item">
                        <div>{{item.content}}</div>
                        <div class="wrapper">
                            <img :src="item.img | picUrl">
                        </div>
                    </div>
                </div>
            </div>
        </van-list>
    </div>
</template>

<script>
    import hdTitle from '@/components/component/hdTitle'
    import {
        url_20
    } from '../../serviceAPI.config.js'
    import {
        imgUrl
    } from '@/filter/filter.js'
    export default {
        components: {
            hdTitle
        },
        data() {
            return {
                news: [],
                loading: false,
                finished: false,
                pageNum: 1,
            }
        },
        filters: {
            picUrl(url) {
                return imgUrl(url)
            }
        },
        methods: {
            onload() {
                this.axios({
                    method: 'get',
                    params: {
                        pageNum: this.pageNum
                    },
                    url: url_20
                }).then(
                    res => {
                        if (res.data.code == 100) { 
                            this.pageNum++
                            for(let item of res.data.data){
                                item.img = item.img.split(",")[0]
                            }
                            this.news = this.news.concat(res.data.data)
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
            this.$nextTick(res => this.$refs.info.style.minHeight = `${heig}px`)
        }
    }
</script>

<style scoped lang="less">
    .info {
        background-color: #f6f6f7;
        .wrap {
            padding: 0.2rem 0.1rem 0.7rem;
            .con {
                padding: 0.2rem;
                background-color: white;
                border-radius: 0.2rem;
                text-align: left;
                margin-bottom: 0.04rem;
                h4 {
                    font-size: 0.24rem;
                    font-family: PingFang-SC-Medium;
                }
                .item {
                    display: flex;
                    justify-content: space-between;
                    color: #818181;
                    div {
                        width: 4.96rem;
                        height: 0.73rem;
                        font-size: 0.24rem;
                        line-height: 0.375rem;
                        position: relative; // ...这里添加relative
                        /*多行文本省略*/
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-line-clamp: 2;
                        -webkit-box-orient: vertical;
                        display: -moz-box;
                        -moz-line-clamp: 2!important;
                        -moz-box-orient: vertical; // &::after {
                        //     background: linear-gradient(to right, rgba(255, 255, 255, 0), #FFFFFF 50%) repeat scroll 0 0 rgba(0, 0, 0, 0);
                        //     bottom: 0;
                        //     content: "...";
                        //     padding: 0 5px 1px 30px;
                        //     position: absolute;
                        //     right: 0;
                        // }
                    }
                    div.wrapper {
                        width: 1.81rem;
                        height: 1.28rem;
                        overflow: hidden;
                        transform: translateY(-0.3rem);
                        img {
                            display: block;
                            width: 1.81rem;
                            height: auto;
                        }
                    }
                }
            }
        }
    }
</style>