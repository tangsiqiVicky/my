<template>
    <div class="infoDe" ref="infoDe">
        <hdTitle go="true" title="墨鱼环球资讯"></hdTitle>
        <div class="wrap">
            <div class="title" v-html="title"></div>
            <p class="time">{{time | getTimeStyle}}</p>
            <div class="con" v-html="con"></div>
            <div class="pic">
                <img :src="item | picUrl" v-for="(item,index) in pic" :key="index">
            </div>
            <!-- <div>
                {{$route.params.title}}
            </div>
            <div>
                {{$route.params.con}}
            </div> -->
        </div>
    </div>
</template>

<script>
    import hdTitle from '@/components/component/hdTitle'
    import {
        url_21
    } from '../../serviceAPI.config.js'
    import {
        imgUrl,getTimeS
    } from '@/filter/filter.js'
    export default {
        components: {
            hdTitle
        },
        data() {
            return {
                title: '',
                con:"",
                pic:[],
                time:"",
                id:null
            }
        },
         filters: {
            picUrl(url) {
                return imgUrl(url)
            },
            getTimeStyle(time){
                return getTimeS(time)
            }
        },
        created() {
            this.$toast.loading({
                mask: true,
                message: '加载中...',
                // duration: "50000"
                duration: "50000"
            });
            if (this.$route.params.id) {
                this.id = this.$route.params.id
                localStorage.setItem("infoId",this.$route.params.id)
            } else {
                this.id = localStorage["infoId"]
            }
            this.axios({
                method: "get",
                params: {
                    id: this.id
                },
                url: url_21
            }).then(res => {
                if(res.data.code ==100){
                    this.title = res.data.data.title
                    this.con = res.data.data.content
                    this.time = res.data.data.createTime
                    this.pic = res.data.data.img.split(",")
                    this.$toast.clear()
                }

            })
        },
        mounted() {
            var heig = document.documentElement.getBoundingClientRect().height
            // console.log(heig)
            this.$nextTick(res => this.$refs.infoDe.style.minHeight = `${heig}px`)
        }
    }
</script>

<style scoped lang="less">
    .infoDe {
        background-color: #f6f6f7;
        .wrap {
            .title{
                margin-top: 10px;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
            }
            .time{
                padding-right: 1rem;
                font-size: 12px;
                text-align: right;
            }
            .con{
                text-align: left;
                text-indent: 2em;
                padding: 10px;
            }
            .pic{
                padding: 10px;
                height: auto;
                margin: auto;
                img{
                    display: block;
                    width: 100%;
                    height: auto;
                    margin-bottom: 10px;
                }
            }
        }
    }
</style>