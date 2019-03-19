<template>
  <div>
    <van-list class="wrap" v-model="loading" :finished="finished" :offset="num" @load="onload">
      <div class="blo" v-for="(item,index) in demo" :key="index">
        <router-link :tag="div" class="img" :to='{name:"moViDe",params:{id:item.id,type:item.type}}'>
          <img :src="item.imgUrl">
          <span>{{item.title}}</span>
        </router-link>
        <div class="info">
          <div>
            {{item.info}}
          </div>
        </div>
        <div class="user">
          <div class="zhubo">
            <img :src="item.user.photo">
            <span>{{item.user.userName}}</span>
          </div>
          <!-- 点赞 -->
          <div class="guanzhu">
            <!-- <img :src="item.isLike?love[1]:love[0]" @click="like(item.isLike,item.id)"> -->
            <img :src="item.isLike?love[1]:love[0]" @click="dianzan(item.isLike,item.id,index)">
            <span>{{item.likeNum}}</span>
          </div>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>
  import {
    url_14,
    url_13,
    url
  } from '@/serviceAPI.config.js'
  import store from '../../../vuex/store'
  import {
    imgUrl
  } from '@/filter/filter.js'
  import {
    mapState,
    mapMutations
  } from "vuex"
  export default {
    data() {
      return {
        num: 300,
        div: "div",
        love: [require("../../../static/images/weixuanzhongzhuangtai.png"), require("../../../static/images/guanzhuxuanzbongzhuangtai.png")],
        demo: [],
        loading: false,
        finished: false,
        pageNum: 1,
        uid: null,
        photo:require("../../../static/images/touxiang.png"),
      }
    },
    filters: {
      picUrl(url) {
        return imgUrl(url)
      }
    },
    store,
    computed: mapState(["idx"]),
    methods: {
      ...mapMutations(["setIdx"]),
      onload() {
        console.log(1)
        if (!!localStorage["user"]) {
          this.uid = JSON.parse(localStorage["user"]).id
        }
        this.axios({
          method: 'get',
          params: {
            userId: this.uid,
            pageNum: this.pageNum
          },
          url: url_14
        }).then(
          res => {
            if (res.data.code == 100) {
              for (let item of res.data.data) {
                item.imgUrl = url + item.imgUrl.split(",")[0]
                if(item.user.photo){
                  item.user.photo = url + item.user.photo
                }else{
                  item.user.photo = this.photo
                }
              }
              this.pageNum++
              this.demo = this.demo.concat(res.data.data)
              this.loading = false
              this.$toast.clear()
              if (res.data.data.length < 10) {
                this.$toast({
                  message: '官人，没有更多数据啦',
                  duration: "500"
                });
                this.finished = true
              }
            }
          }
        )
      },
      // 点赞
      dianzan(bool,idx,index1) {
        if (localStorage["Token"]) {
          if (bool) {
            this.$toast({
              mask: true,
              message: "您已经点过赞了",
              // duration: "50000"
              duration: "500"
            });
          } else {
            console.log(this.demo)
            this.axios({
              method: "post",
              data: {
                userId: JSON.parse(localStorage["user"]).id,
                issueId: idx
              },
              url: url_13
            }).then(res => {
              if (res.data.code == 100) {
                this.demo[index1].likeNum++
                this.demo[index1].isLike = true;
                this.$toast({
                  mask: true,
                  message: res.data.msg,
                  // duration: "50000"
                  duration: "1000"
                });
              }else{
                this.$toast({
                  mask: true,
                  message: res.data.msg,
                  // duration: "50000"
                  duration: "1000"
                });
              }
            });
          }
        } else {
          this.$dialog
            .confirm({
              message: "登录才能点赞",
              showCancelButton: true,
              confirmButtonText: "去登陆"
            })
            .then(() => this.$router.push("/login"))
            .catch(() => {});
        }
      },
    },
    created() {
      this.setIdx("0")
      this.$toast.loading({
        mask: true,
        message: '加载中...',
        // duration: "50000"
        duration: "10000"
      });
      // this.onload()
    }
  }
</script>

<style scoped rel="stylesheet/less" lang="less">
  p {
    font-size: 20px;
    color: blue;
  }
  h3 {
    font-size: 20px;
    color: red;
  }
  .wrap {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 0 0.1rem 70px;
    .blo {
      width: 3.55rem;
      margin-top: 10px;
      border-radius: 0.2rem;
      background-color: white;
      overflow: hidden; // flex: 1;
      .img {
        position: relative;
        img {
          display: block;
          width: 3.55rem;
          height: auto;
          /*height: 5.05rem;*/
          border-radius: 0.2rem 0.2rem 0 0;
        }
        span {
          position: absolute;
          bottom: 0.16rem;
          left: 0.21rem;
          font-size: 0.24rem;
          font-family: PingFang-SC-Light;
          color: #ffffff;
        }
      }
      .info{
        div{
          text-align: left;
          font-size: 0.24rem;
          font-family: PingFang-SC-Light;
          color: #333333;
        }
      }
      .user {
        display: flex;
        height: 0.6rem;
        line-height: 0.6rem;
        text-align: left;
        .zhubo {
          flex: 1;
          img {
            width: 0.44rem;
            height: 0.45rem;
            margin: 0 0.17rem 0 0.13rem;
          }
          span {
            font-family: PingFang-SC-Regular;
            font-size: 0.24rem;
            color: black;
            font-weight: bold;
          }
        }
        .guanzhu {
          /*flex: 1;*/
          img {
            width: 0.41rem;
            height: 0.36rem;
            margin: 0 0.17rem 0 0.13rem;
          }
          span {
            font-family: PingFang-SC-Light;
            font-size: 0.24rem;
            color: #ccc;
            margin: 0 0.1rem 0 0;
          }
        }
      }
    }
  }
</style>
