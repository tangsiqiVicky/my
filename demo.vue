<template>

</template>

<script>
  export default {

    data() {
      return {
        // 把所有的必填项的值整合到一个对象里面，方便监听
        userObj: {
          user: '',
          pwd: '',
          tel: '',
          address: '',
        },
        allTrue: false,
      }
    },
    methods: {
      changeType() {
        for (let key in this.userObj) {
          let item = this.userObj[key];
          return !(item === '' || item === null || item === undefined);
        }
      }
    },
    watch: {
      userObj: {
        // 实现深度监听 newVal为userObj数据改变后的值 watch中不能使用箭头函数否则会改变当前的this指向，无法正常的指向vue实例
        handler(newVal) {
          this.allTrue = this.changeType();
        },
        deep: true
      }
    }

  }
</script>

<style scoped lang="less" rel="stylesheet/less">

</style>