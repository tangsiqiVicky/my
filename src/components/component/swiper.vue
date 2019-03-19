<template>
    <div class="rr">
        <van-swipe :autoplay ="3000">
            <van-swipe-item v-for="(item,index) in images" :key="index">
                <img v-lazy="item.image" width="100%"/>
            </van-swipe-item>
        </van-swipe>
    </div>
</template>

<script>
    // import url from '@/serviceAPI.config.js'
    import { Lazyload } from 'vant';
    export default {
        data(){
            return{
                images:[
                   
                ],
                time:10000
            }
        },
        created(){
            this.$toast.loading({
                    mask: true,
                    message: '加载中...',
                    duration:this.time
                });
            this.axios({
                method:'post',
                url:'https://www.easy-mock.com/mock/5b28c4729783c04a374a0cfe/example/lala'
             }).then(res=>{
                console.log(res)
                this.$toast.clear()   
                this.images = res.data.data.slides;
            })
        }
    }
</script>

<style scoped lang='less'>
    .rr{
        width: 100%;
        height: 3.34rem;
        overflow: hidden;
        clear:both;
    }
</style>