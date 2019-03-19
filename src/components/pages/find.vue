<template>
    <div v-show="isShow">
        <aweSwiper :pic="pics"></aweSwiper>
        <main>
            <!-- 免费兑换区 -->
            <div class="exc">
                <h3 @click="$router.push('/integral')">墨鱼环球免费兑换区 <img class="fr" src="../../../static/images/more.png"></h3>
                <div class="con">
                    <swiper :options="swiperOption1" class="swiper1" v-if="show1">
                        <swiper-slide v-for="(item,index) in exchange" :key="index">
                            <img :src='item.titleImg | picUrl' @click="$router.push({name:'integralDetail',params:{id:item.id}})">
                            <div>
                                <p class="p1">{{item.title}}</p>
                                <p class="p2">{{item.needNum}}积分</p>
                            </div>
                        </swiper-slide>
                        <!-- <div class="swiper-pagination" slot="pagination"></div> -->
                    </swiper>
                </div>
                <hr>
            </div>
            <!-- 限时秒杀 -->
            <div class="seckill">
                <h3 @click="$router.push({name:'seckill'})">限时秒杀专区<img class="fr" src="../../../static/images/more.png"></h3>
                <div class="con">
                    <swiper :options="swiperOption2" class="swiper2" v-if="show2">
                        <swiper-slide v-for="(item,index) in secKill" :key="index">
                            <div class="pr">
                                <img :src='item.titleImg | picUrl' @click="$router.push({name:'seckillDetail',params:{id:item.id}})">
                                <div class="pa">
                                    抢购 {{item.newTime}}
                                </div>
                            </div>
                            <div class="info">
                                <p class="p1"><span>￥{{item.price}}</span>起/人</p>
                                <!-- <p class="p2">{{add[index].jifen}}分</p> -->
                            </div>
                        </swiper-slide>
                        <!-- <div class="swiper-pagination" slot="pagination"></div> -->
                    </swiper>
                </div>
                <hr>
            </div>
            <!-- 资讯 -->
            <div class="news">
                <h3 @click="$router.push('/info')">墨鱼环球资讯<img class="fr" src="../../../static/images/more.png"></h3>
                <div class="con" @click="$router.push({
                            name:'infoDetail',
                            params:{id:news.id}
                        })">
                    <h4>{{news.title}}</h4>
                    <div class="item">
                        <div>{{news.content}}</div>
                        <div class="wrap">
                            <img :src="news.img | picUrl">
                        </div>
                    </div>
                </div>
                <hr>
            </div>
            <!-- 热门推荐 -->
            <div class="hot">
                <h3 @click="$router.push('/recom')">热门推荐<img class="fr" src="../../../static/images/more.png"></h3>
                <div class="con" v-for="(item,index) in recom" :key="index" @click="$router.push({name:'recomDetail',params:{id:item.id}})">
                    <img :src="item.titleImg |picUrl">
                    <span>
                            {{item.title}}
                        </span>
                    <p>
                        ￥{{item.price}}/人
                    </p>
                </div>
                <hr>
            </div>
        </main>
    </div>
</template>

<script>
    import {
        url_19,
        url,
        url_29
    } from '@/serviceAPI.config.js'
    import {
        imgUrl
    } from '@/filter/filter.js'
    import aweSwiper from '@/components/component/aweSwiper'
    import 'swiper/dist/css/swiper.css'
    import {
        swiper,
        swiperSlide
    } from 'vue-awesome-swiper'
    import store from '../../../vuex/store'
    import {
        mapState,
        mapMutations
    } from "vuex"
    export default {
        components: {
            aweSwiper,
            swiper,
            swiperSlide
        },
        data() {
            return {
                isShow: false,
                timer: null, //定时器
                pics: [], //ad轮播
                exchange: [], //积分兑换
                swiperOption1: {
                    direction: 'horizontal',
                    // notNextTick: true,
                    // loop : true,
                    // pagination:{
                    //     el:".swiper-pagination",
                    //     clickable:true
                    // },
                    // onmousewheel:true,
                    observer: true, //修改swiper自己或子元素时，自动初始化swiper
                    observeParents: true, //修改swiper的父元素时，自动初始化swiper
                    freeMode: true,
                    slidesPerView: 3,
                    // spaceBetween: 15
                    // autoplay: true
                    // speed: 300,
                },
                show1: false,
                swiperOption2: {
                    direction: 'horizontal',
                    // notNextTick: true,
                    // loop : true,
                    // pagination:{
                    //     el:".swiper-pagination",
                    //     clickable:true
                    // },
                    // onmousewheel:true,
                    observer: true, //修改swiper自己或子元素时，自动初始化swiper
                    observeParents: true, //修改swiper的父元素时，自动初始化swiper
                    freeMode: true,
                    slidesPerView: 2
                    // spaceBetween: 12
                    // autoplay: true
                    // speed: 300,
                },
                show2: false,
                price: [
                    "8325", "5454", "4586", "1346"
                ],
                timedown: "00:00:00",
                news: {},
                recom: [],
                recom1: [],
                secKill: [],
                secKill1: [],
                time: []
            }
        },
        store,
        computed: mapState(["idx"]),
        destroyed() {
            clearInterval(this.timer)
        },
        methods: {
            ...mapMutations(["setIdx"]),
            timeDown() {
                this.timer = setInterval(() => {
                    var time = new Date().getTime()
                    var chuo
                    for (let item of this.secKill) {
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
        filters: {
            picUrl(url) {
                return imgUrl(url)
            }
        },
        created() {
            this.setIdx(1)
            this.$toast.loading({
                mask: true,
                message: '加载中...',
                duration: "10000"
            });
            this.axios({
                method: "get",
                url: url_19
            }).then(res => {
                if (res.data.code == 100) {
                    this.isShow = true
                    for (let item1 of res.data.data.adList) {
                        this.pics.push(url + item1.imgPath)
                    }
                    if(res.data.data.infoList[0].img){
                        res.data.data.infoList[0].img = res.data.data.infoList[0].img.split(",")[0]
                    }
                    this.news = res.data.data.infoList[0]
                    for (let item3 of res.data.data.exchangeList) {
                        item3.titleImg = item3.titleImg.split(",")[0]
                    }
                    if (res.data.data.exchangeList.length < 5) {
                        this.exchange = res.data.data.exchangeList
                    } else {
                        for (let i = 0;i < 4; i++) {
                            this.exchange.push(res.data.data.exchangeList[i])
                        }
                    }
                    this.show1 = true
                    for (let item2 of res.data.data.pathList) {
                        item2.titleImg = item2.titleImg.split(",")[0]
                        if (!parseInt(item2.type)) {
                            this.recom1.push(item2)
                        } else {
                            this.secKill1.push(item2)
                        }
                    }
                    if (this.recom1.length < 3) {
                        this.recom = this.recom1
                    } else {
                        for (let i = 0;i < 2; i++) {
                            this.recom.push(this.recom1[i])
                        }
                    }
                    if (this.secKill1.length < 5) {
                        this.secKill = this.secKill1
                    } else {
                        for (let i = 0;i < 4; i++) {
                            this.secKill.push(this.secKill1[i])
                        }
                    }
                    this.$toast.clear()
                    this.show2 = true
                    this.timeDown()
                }
            })
        }
    }
</script>

<style rel="stylesheet/less" scoped lang="less">
    main {
        width: 7rem;
        margin: 0 auto 2rem;
        hr {
            margin-top: 0.1rem;
            border: none;
            height: 2px;
            color: #F6F6F7;
            background-color: #F6F6F7;
        }
        div.exc {
            h3 {
                margin-top: 0.1rem;
                height: 0.9rem;
                line-height: 0.9rem;
                font-family: PingFang-SC-Regular;
                font-size: 0.3rem;
                color: black;
                text-align: left;
                img {
                    width: 0.6rem;
                    height: 0.6rem;
                    margin-top: 0.1rem;
                }
            }
            .con {
                width: 100%; // height: 2rem;
                .swiper1 {
                    // width: 2;
                    // height: 2rem;
                    img {
                        width: 2rem;
                        height: 2rem;
                    }
                    div {
                        z-index: -1;
                        p.p1 {
                            margin-top: 0.1rem;
                            font-family: PingFang-SC-Medium;
                            font-size: 0.24rem;
                            text-align: left;
                            text-indent: 0.2rem;
                            text-overflow: ellipsis;
                            overflow: hidden;
                            white-space: nowrap;
                        }
                        p.p2 {
                            font-family: PingFang-SC-Regular;
                            font-size: 0.24rem;
                            text-align: left;
                            text-indent: 0.2rem;
                            color: #ff5959;
                        }
                    }
                }
            }
        }
        div.seckill {
            h3 {
                margin-top: 0.1rem;
                height: 0.9rem;
                line-height: 0.9rem;
                font-family: PingFang-SC-Regular;
                font-size: 0.3rem;
                color: black;
                text-align: left;
                img {
                    width: 0.6rem;
                    height: 0.6rem;
                    margin-top: 0.1rem;
                }
            }
            .con {
                width: 100%; // height: 2rem;
                .swiper2 {
                    // width: 2;
                    // height: 2rem;
                    .pr {
                        position: relative;
                        img {
                            width: 3.33rem;
                            height: 2.53rem;
                        }
                        div.pa {
                            position: absolute;
                            left: 0.08rem;
                            top: 0;
                            width: 2rem;
                            line-height: 0.32rem;
                            height: 0.32rem;
                            font-size: 0.18rem;
                            background-color: #fee95a;
                        }
                    }
                    .info {
                        z-index: -1;
                        p.p1 {
                            margin-top: 0.1rem;
                            font-family: PingFang-SC-Medium;
                            font-size: 0.24rem;
                            text-align: left;
                            text-indent: 0.1rem;
                            text-overflow: ellipsis;
                            overflow: hidden;
                            white-space: nowrap;
                            span {
                                color: #ff9242;
                            }
                        }
                    }
                }
            }
        }
        div.news {
            h3 {
                margin-top: 0.1rem;
                height: 0.9rem;
                line-height: 0.9rem;
                font-family: PingFang-SC-Regular;
                font-size: 0.3rem;
                color: black;
                text-align: left;
                img {
                    width: 0.6rem;
                    height: 0.6rem;
                    margin-top: 0.1rem;
                }
            }
            .con {
                text-align: left;
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
                        -webkit-box-orient: vertical; // display: -moz-box;
                        // -moz-line-clamp: 2!important;
                        // -moz-box-orient: vertical;
                        // &::after {
                        //     background: linear-gradient(to right, rgba(255, 255, 255, 0), #FFFFFF 50%) repeat scroll 0 0 rgba(0, 0, 0, 0);
                        //     bottom: 0;
                        //     content: "...";
                        //     padding: 0 5px 1px 30px;
                        //     position: absolute;
                        //     right: 0;
                        // }
                    }
                    div.wrap {
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
        div.hot {
            h3 {
                margin-top: 0.1rem;
                height: 0.9rem;
                line-height: 0.9rem;
                font-family: PingFang-SC-Regular;
                font-size: 0.3rem;
                color: black;
                text-align: left;
                img {
                    width: 0.6rem;
                    height: 0.6rem;
                    margin-top: 0.1rem;
                }
            }
            .con {
                position: relative;
                height: 3.5rem;
                margin-bottom: 0.22rem;
                overflow: hidden;
                img {
                    width: 6.9rem;
                    height: auto;
                    min-height: 3.5rem;
                }
                span {
                    position: absolute;
                    left: 0.4rem;
                    top: 0.2rem;
                    font-size: 0.24rem;
                    color: white;
                }
                p {
                    position: absolute;
                    left: 0.4rem;
                    bottom: 0.2rem; // width: 1.72rem;
                    padding: 0 0.1rem;
                    font-size: 0.24rem;
                    color: white;
                    height: 0.4rem;
                    line-height: 0.4rem;
                    background-color: #ff9242;
                    border-radius: 0.2rem;
                }
            }
        }
    }
</style>