<template>
    <div class="commentBox">
        <h3>评论</h3>
        <p v-if="comment.length==0">暂无评论，我来发表第一篇评论！</p>
        <div v-else>
            <div class="comment" v-for="(item,index) in comment" :key="index" >
                <h4>{{item.name}}<span>{{item.time}}</span></h4>
                <p @click="changeCommenter(item.name,index)">{{item.content}}</p>
                <div v-if="item.reply.length > 0">
                    <div class="reply" v-for="(reply,index2) in item.reply" :key="index2">
                        <h4>{{reply.responder}}  回复  {{reply.reviewers}}<span>{{reply.time}}</span></h4>
                        <p @click="changeCommenter(reply.responder,index)">{{reply.content}}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props:['comment'],
        data(){
            return{
                
            }
        },
        methods:{
            changeCommenter(name,index){
                this.$emit('change',name,index)
            }
        }
    }
</script>

<style scoped lang='less' rel='stylesheet/less'>
    @pl:0.2rem;
    .commentBox{
        h3{
            height: 0.6rem;
            line-height: 0.6rem;
            text-align: left;
            font-size: 16px;
            padding-left:@pl;
            background-color: #ededed;
        }
        h3+p{
            padding-left:@pl;
            color:violet;
            text-align: left;
        }
        .comment {
            border-bottom: 1px solid #999;
            h4{
                padding-left:@pl;
                text-align: left;
                font-size: 14px;
                color: chocolate;
                span{
                    padding-left: 0.2rem;
                }
            }
            h4+p{
                padding-left:@pl;
                text-align: left;
                font-size: 14px;
            }
            .reply{
                padding-left: 1rem;
            }

        }
        
    }
</style>