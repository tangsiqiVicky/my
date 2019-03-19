<template>
    <div class="commentBox2">
        <h3>发表评论</h3>
        <div class="nickname" v-if="type">你回复{{name}}</div>
        <textarea name="" v-model="commentText"></textarea>
        <van-button class='btn' type="primary" @click="addComment">发表</van-button>
        <van-button class='btn' type="primary" @click="cancelComment">取消</van-button>
        <!-- <button class="btn" @click="addComment">发表</button>
        <button class="btn" @click="cancelComment">取消</button> -->
    </div>
</template>

<script>
    export default {
        props:['type','name'],
        data(){
            return {
                commentText:''
            }
        }
        ,
        methods:{
            addComment(){
                this.$emit('submit',this.commentText)
                this.commentText=""
            },
            cancelComment(){
                this.$emit('cancel')
                this.commentText=""
            }
        }
    }
</script>

<style scoped lang='less' rel='stylesheet/less'>
    @pl:0.2rem;
    .commentBox2{
        width: 7.1rem;
        margin:0.2rem auto;
        text-align: left;
        h3{
            height: 0.6rem;
            line-height: 0.6rem;
            text-align: left;
            font-size: 16px;
            padding-left:@pl;
            background-color: #ededed;
        }
        .nickname{
            font-size: 14px;
            padding-left:@pl;
        }
        textarea{
            display: block;
            resize: none;
            width: 100%;
            height: 2rem;
        }
        .btn{
            float:right;
            margin-right: @pl;
        }

    }
</style>