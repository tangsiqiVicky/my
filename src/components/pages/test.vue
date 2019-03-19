<template>
  <div>
    <popup1 :report='isReport' @changeIsre='changeIs'></popup1>
    <share1 ref='share'></share1>
    <van-button type='primary' @click="isReport = !isReport">举报</van-button>
    <van-button type='primary' @click="change">分享</van-button>
    <van-rate
      v-model="value"
      :size="25"
      :count="6"
      color="#2ba"
      void-color="#ceefe8"
    />
<aweSwiper></aweSwiper>
<swiper></swiper>

    <!-- <p :class='["gg",{on:idx==true}]'>kkk</p>
    <van-button type='primary' @click="ff">oo</van-button> -->
    <!-- <p4 endTime="1490761620" :callback="callback" endText="已经结束了"></p4> -->
    <foot :idx='idx' @ddd='changeidx'></foot>
    <!-- <vanfoot></vanfoot> -->
  </div>
</template>

<script>
import foot from '@/components/component/foot'
import vanfoot from '@/components/component/vanfoot'
import popup1 from '@/components/component/popup-1'
import swiper from '@/components/component/swiper'
import aweSwiper from '@/components/component/aweSwiper'
import share1 from '@/components/component/share-1'
// import p4 from '@/components/component/p4'
  export default {
    components:{
      foot,
      vanfoot,
      popup1,
      swiper,
      aweSwiper,
      share1
    },
    data(){
      return{
        idx:'',
        value:3,
        isReport:false
      }
    },
    methods:{
      changeidx(data){
        this.idx = data;
      },
      callback(){

      },
      changeIs(data){
        // console.log(data)
        if(!data){
          this.isReport = !this.isReport
        }
      },
      change(){
        this.$refs.share.change2()
      }
    }
  }
</script>

<style scoped>
  .gg{
    color: brown;
  }
  .on{
    font-size: 60px;
  }
</style>