<template>
  <div id="app">
    <router-view></router-view>
    <!-- <foot :idx='idx' @ddd='changeidx' v-if="$route.meta.show"></foot> -->
    <foot v-show="$route.meta.show "></foot>
  </div>
</template>

<script>
import foot from '@/components/component/foot'
export default {
  components:{
    foot
  },
  name: 'App',
   data(){
      return{
      }
    },
    beforeUpdate(){
      
    },
    methods:{
    }
}
</script>

<style>
html{
  height: 100%;
}
body{
  /* min-height: 100%; */
}
#app {
  min-height: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

}
.el-picker-panel__body{
  z-index: 9999999!important;
}
.el-picker-panel{
   z-index: 9999999!important;
}
</style>
