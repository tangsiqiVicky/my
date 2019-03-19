<template>
  <div>
    <van-popup v-model="show" position="bottom" :overlay="gg">
      <div class="con">
        <van-nav-bar
            title="举报"
            left-text="返回"
            right-text="确定"
            left-arrow
            @click-left="changeShow"
            @click-right="changeShow"
        />
        <van-checkbox-group v-model="result">
          <van-cell-group>
            <van-cell
                v-for="(item,index) in list"
                :key="item"
                :index="index"
                :title="item"
                clickable
                @click="toggle(index)"
            >
              <van-checkbox :name="index" ref="checkbox"></van-checkbox>

            </van-cell>
          </van-cell-group>
        </van-checkbox-group>

      </div>

    </van-popup>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        // show:false,
        // icon: {

        //         pic:'../../../static/img/images/kuang.png',
        //         picSelect:'../../../static/img/images/lankuang.png'
        // },
        list: ['色情、暴力、血腥违法', '垃圾广告信息', '政治敏感', '垃圾视频', '辱骂、歧视、挑衅内容'],
        result: [],
        show: false,
        gg:true
        
      }
    },
    methods: {
      changeShow() {
        this.show = !this.show;
      },
      toggle(index) {
        this.$refs.checkbox[index].toggle()
      }
    }
  }
</script>

<style>
  .van-cell__title {
    width: 6.5rem;
    text-align: left;
    text-indent: 2em;
  }

  .van-cell__value {
    width: 1rem;
  }

  .van-cell__title, .van-cell__value {
    flex: auto!important;
  }
</style>