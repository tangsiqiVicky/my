<template>
    <div class="commentBox">
        <h3>评论({{comments.length?comments.length:"0"}})</h3>
        <p v-if="comments.length==0">暂无评论，我来发表第一篇评论！</p>
       
        <div v-else>
            <div class="comment" v-for="(item,index) in comment" :key="index" >
                <div class="replyer">
                    <div class="avatar">
                        <img :src="item.user.photo?hh+item.user.photo:photo">
                    </div>
                    <div class="info">
                        <p class="nickName">
                            {{item.user.userName}}
                        </p>
                        <p class="time">
                            <!-- <span>#{{item.floor}}</span> -->
                            <span class="date">{{item.createTime | getTimeStyle}}</span>
                        </p>
                        <p class="con" @click="changeCommenter(item.id,item.userId,item.user.userName)">
                            {{item.content}}
                        </p>
                        <div v-if="item.ccrs.length > 0">
                            <div class="reply" v-for="(reply,index2) in item.ccrs" :key="index2">
                                <div class="reInfo">
                                    {{reply.fromUserName}}  回复  {{reply.toUserName}} <span>{{reply.createTime | getTimeStyle}}</span>
                                    <p @click="changeCommenter(reply.commentId,reply.fromUserId,reply.fromUserName)">{{reply.content}}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- <h4>{{item.name}}<span>{{item.time}}</span></h4>
                <p @click="changeCommenter(item.name,index)">{{item.content}}</p>
                <div v-if="item.reply.length > 0">
                    <div class="reply" v-for="(reply,index2) in item.reply" :key="index2">
                        <h4>{{reply.responder}}  回复  {{reply.reviewers}}<span>{{reply.time}}</span></h4>
                        <p @click="changeCommenter(reply.responder,index)">{{reply.content}}</p>
                    </div>
                </div> -->
            </div>
        </div>
    </div>
</template>

<script>
    import { getTimeS ,imgUrl} from '@/filter/filter.js'
    import {
        url
    } from '../../serviceAPI.config.js'
    export default {
        props:['comment'],
        data(){
            return{
                comments:[],
                photo:require("../../../static/images/touxiang.png"),
                hh: url
            }
        },
        methods:{
            changeCommenter(comTd,useId,useName){
                this.$emit('change1',comTd,useId,useName,"1")
            }
        },
        filters:{
            getTimeStyle(time){
                return getTimeS(time)
            },
            picUrl(url) {
                return imgUrl(url)
            }
        },
        created(){
            this.hh = url
        },
        watch:{
            comment:{
                handler:function(val){
                    this.comments = this.comment
                },
                deep:true
            }
        }

    }
</script>

<style scoped lang='less' rel='stylesheet/less'>
    @pl:0.2rem;
    .commentBox{
        margin-bottom: 1rem;
        h3{
            width: 7.5rem;
            height: 0.6rem;
            margin-top: 0.1rem;
            margin-bottom: 0.1rem;
            line-height: 0.6rem;
            text-align: left;
            font-family: PingFang-SC-Light;
	        font-size: 0.24rem;
            text-indent:@pl;
            background-color: white;
        }
        h3+p{
            padding-left:@pl;
            color:chocolate;
            text-align: left;
            background-color: white;
        }
        .comment {
            padding: 0.1rem 0.2rem;
            background-color: white;
            border-bottom: 0.05rem solid #f6f6f7;
            
            .replyer{
                display: flex;
                .avatar{
                    width: 0.54rem;
                    height: 0.54rem;
                    img{
                        width: 0.54rem;
                        height: 0.54rem;
                    }
                }
                .info{
                    width: 6rem;
                    margin-left: 0.2rem;
                    text-align: left;
                    .nickName{
                        margin-top: 0.08rem;
                        font-size: 0.24rem;
                        font-family: PingFang-SC-Light;
                        color: black;
                    }
                    .time{
                        font-family: PingFang-SC-Light;
	                    font-size: 0.18rem;
	                    color: #b8b8b9;
                    }
                    .con{
                        font-family: PingFang-SC-Light;
	                    font-size: 0.2rem;
                    }
                    .reply{
                        .reInfo{
                            margin-top: 0.08rem;
                            font-size: 0.24rem;
                            font-family: PingFang-SC-Light;
                            color: black;
                            span{
                                font-family: PingFang-SC-Light;
	                            font-size: 0.18rem;
	                            color: #b8b8b9;
                            }
                            p{  
                                margin-left: 0.5rem;
                                font-family: PingFang-SC-Light;
                                font-size: 0.2rem;
                                color:#2c3e50;
                            }
                        }
                    }
                }
            }

        }
        
    }
</style>