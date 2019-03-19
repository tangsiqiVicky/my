<template>
    <div ref="pub" class="pub">
        <hd-title go="true" title="发布记录"></hd-title>
        <van-list v-model="loading" :finished="finished" :offset="300" @load="onload">
            <div class="wrap">
                <div class="item" v-for="(item,index) in info" :key="index" @click="$router.push({name:'moViDe',params:{id:item.id,type:item.type}})">
                    <div class="img">
                        <img :src="item.imgUrl |picUrl">
                    </div>
                    <div class="info">
                        <p class="tit">{{item.title}}</p>
                        <p class="time">{{item.createTime |getTimeStyle}}</p>
                        <span :class='[!item.type?"video":"img"]' v-if="type">{{type[item.type]}}</span>
                    </div>
                    <div class="dele">
                        <el-button class="di" @click.stop="dele(item.id,index)" type="danger" icon="el-icon-delete" circle></el-button>
                    </div>
                </div>
            </div>
        </van-list>
    </div>
</template>

<script>
import hdTitle from "@/components/component/hdTitle";
import { url_31, url_39 } from "../../serviceAPI.config.js";
import { imgUrl, getTimeS } from "@/filter/filter.js";
export default {
  components: {
    hdTitle
  },
  filters: {
    picUrl(url) {
      return imgUrl(url);
    },
    getTimeStyle(time) {
      return getTimeS(time);
    }
  },
  data() {
    return {
      type: ["视频", "图片"],
      info: [],
      loading: false,
      finished: false,
      pageNum: 1
    };
  },
  methods: {
    onload() {
      this.axios({
        method: "get",
        params: {
          userId: JSON.parse(localStorage["user"]).id,
          pageNum: this.pageNum
        },
        url: url_31
      }).then(res => {
        if (res.data.code == 100) {
          this.pageNum++;
          for (let item of res.data.data) {
            item.imgUrl = item.imgUrl.split(",")[0];
          }
          this.info = this.info.concat(res.data.data);
          this.loading = false;
          this.$toast.clear();
          if (res.data.data.length < 10) {
            this.$toast({
              message: "官人，没有数据啦",
              duration: "500"
            });
            this.finished = true;
          }
        }
      });
    },
    dele(idx, index) {
      this.$dialog
        .confirm({
          message: "删除本条发布记录？",
          showCancelButton: true,
          confirmButtonText: "删除"
        })
        .then(() => {
          this.axios({
            method: "post",
            data: {
              id: idx
            },
            url: url_39
          }).then(res => {
            if (res.data.code == 100) {
              this.info.splice(index, 1);
              this.$toast({
                message: res.data.msg,
                duration: 1000
              });
            }
          });
        })
        .catch(() => {});
    }
  },
  created() {
    this.$toast.loading({
      mask: true,
      message: "加载中...",
      duration: "50000"
    });
  },
  mounted() {
    var heig = document.documentElement.getBoundingClientRect().height;
    // console.log(heig)
    this.$nextTick(res => (this.$refs.pub.style.minHeight = `${heig}px`));
  }
};
</script>

<style scoped lang="less">
.pub {
  background-color: #f6f6f7;
  .wrap {
    .item {
      display: flex;
      margin-top: 0.1rem;
      padding: 0.2rem;
      background-color: white;
      .dele {
        position: relative;
        flex: 1;
        .di {
          position: absolute;
          right: 0;
          bottom: 0;
        }
      }
      .img {
        width: 2.2rem;
        max-width: 2.2rem;
        height: 1.64rem;
        margin-right: 0.3rem;
        overflow: hidden;
        img {
          display: block;
          // width: auto;
          width: 2.2rem;
          height: 1.64rem;
        }
      }
      .info {
        text-align: left;
        .tit {
          font-family: PingFang-SC-Regular;
          font-size: 0.3rem;
          color: black;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .time {
          font-family: PingFang-SC-Medium;
          font-size: 0.24rem;
          color: #b3b0b0;
        }
        .video {
          font-size: 0.2rem;
          padding: 0.05rem 0.1rem;
          background-color: #5cb85c;
          border-radius: 0.1rem;
        }
        .img {
          font-size: 0.2rem;
          padding: 0.05rem 0.1rem;
          background-color: #3aa6f6;
          border-radius: 0.1rem;
        }
      }
    }
  }
}
</style>