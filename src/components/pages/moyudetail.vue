<template>
    <div>
        <foot></foot>
        <player></player>
        <!-- <video class="pp" src='../../../static/video/test.mp4'>

        </video> -->
        
        <!-- <span class="ico ico-video" :class="{ hide: isPlay }" v-on:click="playClick()"></span> -->
        <!-- <video-player  class="video-player vjs-custom-skin"
                     ref="videoPlayer"
                     :playsinline="true"
                     :options="playerOptions"
                     @play="onPlayerPlay($event)"
                     @pause="onPlayerPause($event)"
                     src='../../../static/video/test.mp4'
      >
      </video-player> -->
        <p @click="ff">ddd</p>
        {{$route.params.id}}
    </div>
</template>

<script>
    import axios from 'axios'
    import {url} from '@/serviceAPI.config.js'
    import foot from '@/components/component/footer'
    // import { videoPlayer } from 'vue-video-player';
    import player from '@/components/component/player'

    export default {
        components:{
            foot,
            player
        },
        data(){
            return{
               
            }
        },
        created(){
            
             axios({
                    method:'get',
                    // data:{dd:"1"},
                    url:`${url}?${this.$route.params.id}`
                }).then(
                    res=>{
                        // console.log(res);
                        this.demo = this.demo.concat(res.data.data)
                        console.log(this.demo)
                         this.loading = false
                        // this.demo1.sort((a,b)=>parseInt(b.num) - parseInt(a.num))
                    }
                )
        },
        methods:{
            ff(){
                this.$router.back(-1)
            }
        }
    }
</script>

<style scoped rel='stylesheet/less' lang='less'>
    .pp{
        width: 7.5rem;
        height: 5rem;
    }
</style>