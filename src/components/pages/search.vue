<template>
    <div ref="searchs" class="search">
        <hd-title go="true" title="搜索"></hd-title>
        <form action="/">
            <van-search class="sea" v-model.trim="search" placeholder="搜索" show-action @search="onSearch">
                <div slot="action" @click="onSearch">搜索</div>
            </van-search>
        </form>              
        <div class="record">
            <el-tag
                class="tag"
                v-for="(item,index) in record"
                :key="index"
                @click.native="tagSearch(item,index)"
                @close = "dele(index)"
                closable>
                    {{item}}
            </el-tag>
        </div>
        <van-list v-show="found" v-model="loading" :finished="finished" :offset="300" @load="onload">
            <div class="wrap">
                <div class="item" v-for="(item,index) in info" :key="index" @click="go(item.id,item.type)">
                    <img :src="item.titleImg |picUrl">
                    <p class="tit">{{item.title}}</p>
                    <p class="price">￥{{item.price}}/人起</p>
                    <p class="num" v-show="item.endTime">{{item.count}}人已抢购</p>
                    <div class="time" v-show="item.endTime">
                        抢购{{item.newTime}}
                    </div>
                </div>
            </div>
        </van-list>
        <div v-show="!found" class="img404">
            <img class="img" :src="img404">
            <p>抱歉，您搜索的内容没有找到，过几天再来吧！</p>
        </div>
    </div>
</template>

<script>
import hdTitle from "@/components/component/hdTitle";
import { imgUrl } from "@/filter/filter.js";
import { url_22 } from "../../serviceAPI.config.js";
export default {
  components: {
    hdTitle
  },
  filters: {
    picUrl(url) {
      return imgUrl(url);
    }
  },
  data() {
    return {
      img404: require("../../../static/images/404.jpg"),
      info: [],
      search: this.$route.params.search,
      loading: false,
      finished: false,
      pageNum: 1,
      timer: null,
      found: true,
      record: []
    };
  },
  methods: {
    go(idx, type) {
      if (type == 0) {
        this.$router.push({ name: "recomDetail", params: { id: idx } });
      } else {
        this.$router.push({ name: "seckillDetail", params: { id: idx } });
      }
    },
    onSearch() {
      clearInterval(this.timer);
      this.pageNum = 1;
      this.info = [];
    //   if (localStorage["searchRecord"]) {
    //     this.record = localStorage["searchRecord"].split(",");
    //   }
      if (this.record.length <= 8) {
        this.record.unshift(this.search);
      } else {
        this.record.unshift(this.search);  
        this.record.pop();
      }
      localStorage.setItem("searchRecord", this.record.join());
      this.onload();
    },
    tagSearch(tag,index){
        clearInterval(this.timer);
        this.pageNum = 1;
        this.info = [];
        this.record.splice(index,1)
        this.record.unshift(tag)
        localStorage.setItem("searchRecord", this.record.join())
        this.search = tag
        this.onload();
    },
    dele(index){
       this.record.splice(index,1)
       localStorage.setItem("searchRecord", this.record.join());
    },
    onload() {
      this.axios({
        method: "get",
        params: {
          pageNum: this.pageNum,
          title: this.search
        },
        url: url_22
      }).then(res => {
        if (res.data.code == 100) {
          this.$toast.clear();
          console.log(res);
          this.pageNum++;
          for (let item of res.data.data) {
            item.titleImg = item.titleImg.split(",")[0];
            item.img = item.img.split(",");
          }
          this.info = this.info.concat(res.data.data);
          if (this.info.length == 0) {
            this.found = false;
          } else {
            this.found = true;
          }
          this.timeDown();
          this.loading = false;
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
    timeDown() {
      this.timer = setInterval(() => {
        var time = new Date().getTime();
        var chuo;
        for (let item of this.info) {
          if (item.endTime) {
            chuo = item.endTime - time;
            if (chuo >= 0) {
              // let dd = Math.floor(chuo / 1000 /60 / 60 /24)
              let hh = Math.floor(chuo / 1000 / 60 / 60);
              let mm = Math.floor((chuo / 1000 / 60) % 60);
              let ss = Math.floor((chuo / 1000) % 60);
              item.newTime =
                this.getTime(hh) +
                ":" +
                this.getTime(mm) +
                ":" +
                this.getTime(ss);
            } else {
              this.axios({
                method: "post",
                data: {
                  id: item.id
                },
                url: url
              }).then(res => {});
              item.newTime = "失效";
            }
          }
        }
      }, 1000);
    },
    getTime(time) {
      return time < 10 ? "0" + time : time;
    }
  },
  destroyed() {
    clearInterval(this.timer);
  },
  created() {
    if (localStorage["searchRecord"]) {
      this.record = localStorage["searchRecord"].split(",");
    }
    if (this.record.length <= 8) {
      if (this.$route.params.search) {
        this.record.unshift(this.$route.params.search);
      }
    } else {
      this.record.pop();
    }
    localStorage.setItem("searchRecord", this.record.join());
    this.$toast.loading({
      mask: true,
      message: "加载中...",
      duration: "10000"
    });
  },
  mounted() {
    var heig = document.documentElement.getBoundingClientRect().height;
    // console.log(heig)
    this.$nextTick(res => (this.$refs.searchs.style.minHeight = `${heig}px`));
  }
};
</script>

<style scoped lang="less">
.record {
  display: flex;
  flex-wrap: wrap;
//   justify-content: space-around;
  max-height: 104px;
  overflow: hidden;
  .tag {
    margin: 10px 15px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
.search {
  background-color: white;
  .wrap {
    width: 6.9rem;
    margin: auto;
    padding-top: 0.1rem;
    .item {
      position: relative;
      margin-top: 0.1rem;
      letter-spacing: 1px;
      max-height: 3.5rem;
      overflow: hidden;
      img {
        display: block;
        width: 100%;
        height: auto;
      }
      .tit {
        position: absolute;
        left: 0.3rem;
        top: 0.3rem;
        font-family: PingFang-SC-Bold;
        font-size: 0.24rem;
        color: white;
        letter-spacing: 1px;
      }
      .price {
        position: absolute;
        left: 0.4rem;
        bottom: 0.2rem;
        // width: 1.72rem;
        padding: 0 0.1rem;
        height: 0.4rem;
        line-height: 0.4rem;
        background-color: #ff9242;
        border-radius: 0.2rem;
        font-size: 0.24rem;
      }
      .num {
        position: absolute;
        right: 0;
        padding: 0 0.15rem 0 0.2rem;
        bottom: 0.8rem; // width: 1.47rem;
        height: 0.4rem;
        line-height: 0.4rem;
        border-radius: 0.2rem 0 0 0.2rem;
        background-color: rgba(255, 255, 255, 0.15);
        color: white;
        font-family: PingFang-SC-Regular;
        font-size: 0.2rem;
      }
      .time {
        position: absolute;
        right: 0;
        bottom: 0.2rem;
        height: 0.4rem;
        line-height: 0.4rem;
        padding: 0 0.35rem 0 0.4rem;
        border-radius: 0.2rem 0 0 0.2rem;
        background-color: #fee95a;
        font-family: PingFang-SC-Regular;
        font-size: 0.2rem;
        letter-spacing: 0.04rem;
      }
    }
  }
  .img404 {
    .img {
      display: block;
      width: 7.44rem;
      height: 3rem;
      margin: 0.5rem auto 0;
    }
    p {
      margin-top: 0.2rem;
      font-family: "楷体";
      font-size: 0.32rem;
    }
  }
}
</style>