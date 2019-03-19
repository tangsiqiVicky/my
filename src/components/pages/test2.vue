<template>
  <div>
    <popup1 ref="popup"></popup1>
    <van-button type='primary' @click="isShow">举报</van-button>
    <van-rate
  v-model="value"
  :size="25"
  :count="6"
  color="#2ba"
  void-color="#ceefe8"

/>
    <!-- <p :class='["gg",{on:idx==true}]'>kkk</p>
    <van-button type='primary' @click="ff">oo</van-button> -->
    <!-- <p4 endTime="1490761620" :callback="callback" endText="已经结束了"></p4> -->
    <foot :idx='idx' @ddd='changeidx'></foot>
    <!-- <vanfoot></vanfoot> -->
    <input type="text" :disabled=false :class="yy">
  </div>
</template>

<script>
import foot from '@/components/component/foot'
import vanfoot from '@/components/component/vanfoot'
import popup1 from '@/components/component/popup-2'
// import p4 from '@/components/component/p4'
  export default {
    components:{
      foot,
      vanfoot,
      popup1
    },
    data(){
      return{
        idx:'',
        value:3,
        isReport:false,
        gg:false,
        yy:'yy'
        
      }
    },
    methods:{
      changeidx(data){
        this.idx = data;
      },
      callback(){

      },
      isShow(){
        this.$refs.popup.changeShow();
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
  .yy{
    display: block;
  }
</style>