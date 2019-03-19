<template>
    <div ref="integ" class="integ">
        <hdTitle go="true" title="积分兑换"></hdTitle>
        <van-list v-model="loading" :finished="finished" :offset="300" @load="onload">
            <div class="wrap">
                <div class="item" v-for="(item,index) in list" :key="index">
                    <router-link :to='{name:"integralDetail",params:{id:item.id,type:item.type}}'>
                        <div class="wrapper">
                            <img :src="item.img |picUrl">
                        </div>
                        <div class="txt">
                            <div class="p1">
                                {{item.title}}
                            </div>
                            <div class="p2">
                                {{item.needNum}}积分
                            </div>
                        </div>
                    </router-link>
                </div>
            </div>
        </van-list>
    </div>
</template>

<script>
    import hdTitle from '@/components/component/hdTitle'
     import {
        imgUrl
    } from '@/filter/filter.js'
    import {
        url_24
    } from '../../serviceAPI.config.js'
    export default {
        components: {
            hdTitle
        },
        filters: {
            picUrl(url) {
                return imgUrl(url)
            }
        },
        data() {
            return {
                list: [],
                loading: false,
                finished: false,
                pageNum: 1,
              
            }
        },
        methods:{
            onload() {
                this.axios({
                    method: 'get',
                    params: {
                        pageNum: this.pageNum
                    },
                    url: url_24
                }).then(
                    res => {
                        if (res.data.code == 100) {
                            console.log(res)
                            this.pageNum++
                                for (let item of res.data.data) {
                                    item.img = item.img.split(",")[0]
                                }
                            this.list = this.list.concat(res.data.data)
                            this.loading = false
                            this.$toast.clear()
                            if (res.data.data.length < 10) {
                                this.$toast({
                                    message: '官人，没有数据啦',
                                    duration: "500"
                                });
                                this.finished = true
                            }
                        }
                    }
                )
            },
        },
        created(){
             this.$toast.loading({
                mask: true,
                message: '加载中...',
                // duration: "50000"
                duration: "50000"
            });
        },
        mounted() {
            var heig = document.documentElement.getBoundingClientRect().height
            // console.log(heig)
            this.$nextTick(res => this.$refs.integ.style.minHeight = `${heig}px`)
        },
        // methods: {
        //     onload() {
        //         this.loading = true;
        //         this.axios({
        //             method: 'get',
        //             data:{num:this.pageNum},
        //             url: 'http://zh1047664386.gz01.bdysite.com/auth/api.php?version=1&resource=admin_manage&method=get_list'
        //         }).then(
        //             res => {
        //                 this.list = this.list.concat(res.data.data)
        //                 this.loading = false
        //             }
        //         )
        //         this.pageNum++
        //     }
        // },
        // created() {
        //     this.onload()
        // }
    }
</script>

<style scoped lang="less">
    .integ {
        background-color: #f6f6f7;
        .wrap {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            width: 6.55rem;
            margin: auto;
            .item {
                width: 3.02rem;
                height: auto;
                margin-top: 0.3rem;
                background: white;
                box-shadow: 0px 3px 20px 1px rgba(0, 0, 0, 0.17);
                border-radius: 0.2rem;
                .wrapper{
                    width: 2.88rem;
                    max-height: 2.88rem;
                    border-radius: 0.15rem;
                    overflow: hidden;
                }
                img {
                    display: block;
                    width: 2.88rem;
                    height: auto;
                    margin: 0.07rem;
                    border-radius: 0.15rem;
                }
                .txt {
                    z-index: -1;
                    .p1 {
                        margin-top: 0.08rem;
                        font-family: PingFang-SC-Medium;
                        font-size: 0.3rem;
                        text-align: left;
                        text-indent: 0.2rem;
                    }
                    
                    .p2 {
                        font-family: PingFang-SC-Regular;
                        font-size: 0.3rem;
                        text-align: left;
                        text-indent: 0.2rem;
                        color: #ff5959;
                        padding-bottom: 0.12rem;
                    }
                }
            }
        }
    }
</style>