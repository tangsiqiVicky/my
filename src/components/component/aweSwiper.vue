<template>
    <div class="wrap">
        <swiper :options="swiperOption" class="swiper" v-if="show">
            <swiper-slide v-for="(item,index) in images" :key="index">
                <img :src='item' width="100%" @click="showImage(index)">
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
  <input class="sear" type="search" placeholder="搜索" v-model.trim="searchsth" :style="backImg" @change="search">
        
        <!-- <van-search class="sear" placeholder="请输入商品名称" v-model="searchsth" background="transparent"/> -->
    </div>
</template>

<script>
    // import {
    //     url2
    // } from '@/serviceAPI.config.js'
    import 'swiper/dist/css/swiper.css'
    import {
        ImagePreview
    } from 'vant';
    import {
        swiper,
        swiperSlide
    } from 'vue-awesome-swiper'
    export default {
        components: {
            swiper,
            swiperSlide
        },
        props:["pic"],
        data() {
            return {
                searchsth: "",
                swiperOption: {
                    // direction:'vertical',
                    notNextTick: true,
                    loop: true,
                    pagination: {
                        el: ".swiper-pagination",
                        clickable: true
                    },
                    // onmousewheel:true,
                    observer: true, //修改swiper自己或子元素时，自动初始化swiper
                    observeParents: true, //修改swiper的父元素时，自动初始化swiper
                    // freeMode:true,
                    // slidesPerView: 'auto',
                    autoplay: true
                    // speed: 300,
                },
                show: false,
                images: [],
                backImg: {
                    backgroundImage: "url(" + require("../../../static/images/sousuo.png") + ")",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "0.3rem center",
                    backgroundSize: "0.44rem 0.44rem"
                },
            }
        },
        methods:{
               // 展示图片
            showImage(index) {
                let showI = ImagePreview({images:this.pic,startPosition: index})
            },
            search(){
                this.$router.push({name:"search",params:{search:this.searchsth}})
            }
        },
        created() {
         
        },
        watch:{
            pic:{
                handler(val){
                    this.images = val
                    this.show = true
                },
                deep:true
            }
            // pic(val){
            //     handle()
            //     this.images = this.pic
            //     console.log(this.pic)
            //     console.log(this.images)
            // }
        }

        // watch:{
        //     publish(val){
        //         console.log(this.publish);
        //     } 
        // }
    }
</script>

<style scoped lang='less'>
    .wrap {
        position: relative;
        .swiper {
            width: 100%;
            height: 4.9rem;
            overflow: hidden;
            img {
                display: block;
                width: 100%;
                height: 5rem;
            }
        }
        .sear {
            display: block;
            position: absolute;
            text-indent: 0.95rem;
            top: 0.6rem;
            left: 0.2rem;
            width: 7.1rem;
            height: 0.6rem; // transform: translateX(-50%);
            z-index: 99;
            border-radius: 0.3rem;
            outline: none;
            border: none;
        }
    }
</style>