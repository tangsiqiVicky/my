<template>
    <div class="wrap">
        <swiper :options="swiperOption" class="swiper" v-if="show">
            <swiper-slide v-for="(item,index) in images" :key="index">
                <img :src='item' width="100%">
            </swiper-slide>
            <!-- <div class="swiper-pagination" slot="pagination"></div> -->
        </swiper>
    </div>
</template>

<script>
    // import {
    //     url2
    // } from '@/serviceAPI.config.js'
    import 'swiper/dist/css/swiper.css'
    import {
        swiper,
        swiperSlide
    } from 'vue-awesome-swiper'
    export default {
        components: {
            swiper,
            swiperSlide
        },
        props:["pic1","slideview"],
        data() {
            return {
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
                    slidesPerView: this.slideview,
                    spaceBetween: 15
                    // autoplay: true
                    // speed: 300,
                },
                show: false,
                images: [],
            }
        },
        created() {
            // this.axios({
            //     method: "post",
            //     url: url2
            // }).then(res => {
            //     this.images = res.data.data.slides
            //     this.show = true
            // })
        },
        watch:{
            pic1:{
                handler(val){
                    this.images = val
                    this.show = true
                    console.log(this.images)
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
            img {
                height: 4.9rem;
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