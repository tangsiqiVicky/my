<template>
    <div class="player">
        <video src="../../../static/video/test2.mp4" :poster="poster" controls>
            您的浏览器不支持video
        </video>
        <!-- <span class="ico ico-sound" :class="{ active: isMute }" v-on:click="closeSoundClick()"></span>
        <span class="ico ico-skip"></span>
        <span class="ico ico-video" :class="{ hide: isPlay }" v-on:click="playClick()"></span> -->
    </div>
</template>

<script>
    export default {
        data(){
            return{
                poster:"../../../static/images/tupianDe.png"
            }
        },
        pause:false   
    }
</script>

<style scoped lang="less">
    .player{
        width: 100%;
        height: calc(7.5/16*9rem);
    }
</style>