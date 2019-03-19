<template>
    <div class="my">
        <hdTitle :go="back" title="我的"></hdTitle>
        <!-- <goback title="我的"></goback> -->
        <div class="main">
            <!-- 用户头像昵称粉丝数 -->
            <div class="user-info">
                <img class="avatar" :src="setPhoto?userInfo.photo:photo">
                <p class="nickName">{{userInfo.userName}}</p>
                <p class="persign">墨鱼ID：{{id}}</p>
                <p class="persign">{{userInfo.signature}}</p>
                <div class="wrap">
                    <div class="clearFix">
                        <span class="fr">粉丝数：{{userInfo.fansNum}}</span>
                    </div>
                    <div class="clearFix">
                        <span class="fl">关注数：{{userInfo.attNum}}</span>
                    </div>
                </div>
            </div>
            <!-- 发布记录 -->
            <div class="publish">
                <h3 @click="$router.push('/publishDe')">发布记录<img class="fr" src="../../../static/images/more.png"></h3>
                <hr>
                <div class="con">
                    <swiper :options="swiperOption" class="swiper" v-if="show">
                        <swiper-slide v-for="(item,index) in publish" :key="index">
                            <img :src='item.imgUrl | picUrl' height="100%" @click="$router.push({name:'moViDe',params:{id:item.id,type:item.type}})"> 
                        </swiper-slide>
                        <!-- <div class="swiper-pagination" slot="pagination"></div> -->
                    </swiper>
                    <van-loading class="load" color="black" v-else />
                </div>
            </div>
            <!-- 积分 -->
            <div class="jifen clearFix" @click="$router.push('/getInter')">
                <span class="fl">积分</span>
                <span class="fr">{{userInfo.integralNum}}</span>
            </div>
            <!-- 订单 -->
            <div class="jifen clearFix" @click="$router.push({
                            name:'order'
                        })">
                <span class="fl">我的订单</span>
            </div>
            <!-- 消息 -->
            <div class="jifen clearFix" @click="$router.push('/tips')">
                <span class="fl">消息</span>
                <!-- <img class="fr" src="../../../static/images/notes.png"> -->
            </div>
            <!-- 认证 -->
            <div class="jifen clearFix" @click="ident">
                <span class="fl">认证</span>
                <span class="fr">{{iden[parseInt(userInfo.isAc)]}}</span>
            </div>
            <!-- 设置 -->
            <div class="jifen clearFix" @click="$router.push('/set')">
                <span class="fl">设置</span>
            </div>
        </div>
        <!-- 导航 -->
        <!-- <foot :idx="id" @ddd='changeidx'></foot> -->
    </div>
</template>

<script>
    import {
        imgUrl,
        getTimeS
    } from '@/filter/filter.js'
    import hdTitle from '@/components/component/hdTitle'
    import {
        url_30
    } from '../../serviceAPI.config.js'
    // import foot from '@/components/component/foot'
    import 'swiper/dist/css/swiper.css'
    import store from '../../../vuex/store'
    import {
        mapState,
        mapMutations
    } from "vuex"
    import {
        swiper,
        swiperSlide
    } from 'vue-awesome-swiper'
    import {
        url_14,url
    } from '../../serviceAPI.config';
    // import aweSwiper from '@/components/component/aweSwiper'
    export default {
        components: {
            // foot,
            hdTitle,
            swiper,
            swiperSlide
            // aweSwiper
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
                id:JSON.parse(localStorage["user"]).id,
                back: false,
                userInfo: {},
                publish: [],
                publish1: [],
                iden:["未验证","验证中","已验证","验证失败"],
                swiperOption: {
                    // direction:'vertical',
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
                    slidesPerView: "auto",
                    spaceBetween: 15
                    // autoplay: true
                    // speed: 300,
                },
                show: false,
                setPhoto:false,
                photo:require("../../../static/images/touxiang.png"),
                ver:0 //认证
                // id:""
            }
        },
        store,
        computed: mapState(["idx"]),
        methods: {
            ...mapMutations(["setIdx"]),
            ident(){
                if((parseInt(this.userInfo.isAc)==0) || (parseInt(this.userInfo.isAc)==3)) {
                    this.$router.push('/ident')
                }
            }
            // changeidx(res){
            //     this.id = res;
            //     console.log("*",res,this.id,"*")
            // },
        },
        created() {
            this.setIdx(3)
            this.$toast.loading({
                mask: true,
                message: '加载中...',
                // duration: "50000"
                duration: "10000"
            });
            this.axios({
                method: "get",
                params: {
                    userId: JSON.parse(localStorage["user"]).id
                },
                url: url_30
            }).then(res => {
                if (res.data.code == 100) {
                    this.$toast.clear()
                    console.log(res)
                    if(!res.data.data.userInfo.photo){
                        this.setPhoto = false
                    }else {
                        res.data.data.userInfo.photo = url +res.data.data.userInfo.photo
                        this.setPhoto = true
                    }
                    this.userInfo =res.data.data.userInfo
                    for (let item of res.data.data.list) {
                        item.imgUrl = item.imgUrl.split(",")[0]
                    }
                    this.publish1 = res.data.data.list
                    if (this.publish1.length < 5) {
                        this.publish = this.publish1
                    } else {
                        for (let i = 0; i < 4; i++) {
                            this.publish.push(this.publish1[i])
                        }
                    }
                    this.show = true;
                }
            })
        }
    }
</script>

<style scoped rel="stylesheet/less" lang="less">
    .my {
        background-color: #F6F6F7;
        height: 100%;
        .main {
            width: 7.3rem;
            margin: auto;
            padding-bottom: 1.55rem;
            .user-info {
                display: flex;
                width: 7.1rem;
                align-items: center;
                flex-direction: column;
                margin: 10px auto 20px;
                border-radius: 0.4rem;
                background-color: white;
                .avatar {
                    margin-top: 0.26rem;
                    width: 1.5rem;
                    height: 1.5rem;
                    border-radius: 50%;
                    border: 1px solid #eee;
                }
                .nickName {
                    margin-top: 0.05rem;
                    font-family: PingFang-SC-Regular;
                    font-size: 0.3rem;
                    font-weight: bold;
                }
                .persign {
                    font-family: PingFang-SC-Regular;
                    font-size: 0.24rem;
                }
                .wrap {
                    display: flex;
                    margin: 0.3rem auto;
                    div {
                        width: 3.3rem;
                        &:first-child {
                            margin-right: 0.3rem;
                            span {
                                background-color: #7ad1ff;
                            }
                        }
                        span {
                            padding: 0.09rem 0.14rem;
                            font-family: PingFang-SC-Regular;
                            font-size: 0.2rem;
                            color: white;
                            background-color: #ff7a7a;
                            border-radius: 0.14rem;
                        }
                    }
                }
            }
            .publish {
                padding: 0.25rem 0.21rem;
                background-color: white;
                border-radius: 0.16rem;
                h3 {
                    font-family: PingFang-SC-Regular;
                    font-size: 0.3rem;
                    font-weight: bold;
                    text-align: left;
                    margin-bottom: 0.25rem; // text-indent: 0.21rem;
                    img {
                        width: 0.6rem;
                        height: 0.6rem;
                        // margin-top: 0.1rem;
                    }
                }
                hr {
                    border: none;
                    height: 2px;
                    color: #F6F6F7;
                    background-color: #F6F6F7;
                }
                .con {
                    margin: 0.3rem auto;
                    .load {
                        margin: auto;
                    }
                    .swiper {
                        width: 100%;
                        height: 1.1rem;
                        .swiper-slide {
                            width: auto!important;
                        }
                    }
                }
            }
            .jifen {
                margin-top: 10px;
                background-color: white;
                height: 0.9rem;
                line-height: 0.9rem;
                border-radius: 0.16rem;
                font-size: 0.3rem;
                span:nth-child(1) {
                    font-weight: bold;
                    padding-left: 0.25rem;
                }
                span:nth-child(2) {
                    font-weight: bold;
                    padding-right: 0.25rem;
                    color: #b8b8b9;
                }
                img {
                    width: 0.23rem;
                    height: 0.23rem;
                    margin-right: 0.1rem;
                    margin-top: 0.1rem;
                }
            }
        }
    }
</style>