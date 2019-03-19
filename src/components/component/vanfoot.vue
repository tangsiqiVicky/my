<template>
    <div>
        <van-tabbar v-model="active">
            <van-tabbar-item icon="shop">标签</van-tabbar-item>
            <van-tabbar-item icon="chat" dot>标签</van-tabbar-item>
            <van-tabbar-item icon="records" info="5">标签</van-tabbar-item>
            <van-tabbar-item icon="gold-coin" info="20">标签</van-tabbar-item>
        </van-tabbar>
        <van-tabbar v-model="active">
  <van-tabbar-item icon="shop">
    <span>自定义</span>
    <img
      slot="icon"
      slot-scope="props"
      :src="props.active ? icon.active : icon.normal"
    >
  </van-tabbar-item>
  <van-tabbar-item icon="chat">标签</van-tabbar-item>
  <van-tabbar-item icon="records">标签</van-tabbar-item>
</van-tabbar>
    </div>
</template>

<script>
    export default {
        data() {
    return {
      active: 0,
      icon: {
        normal: '//img.yzcdn.cn/icon-normal.png',
        active: '//img.yzcdn.cn/icon-active.png'
      }
    }
  }
    }
</script>

<style scoped>

</style>