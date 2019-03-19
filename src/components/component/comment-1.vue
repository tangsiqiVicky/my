<template>
    <div class="article">
        <h3>{{article.title}}</h3>
        <div class="time clearFix">
            <span>{{article.time}}</span><span>阅读量：{{article.read}}</span>
        </div>
        
        <div class="con">
            {{article.content}}
        </div>
    </div>
</template>

<script>
    export default {
        props:['article'],
        data(){
            return {
                title:'',
                time:'',
                read:'',
                content:''
                
            }
        },
        methods:{
            
        },
        // watch:{
        //     article: function(val){
        //         console.log(val)
        //         console.log(article)
        //         console.log(this.article)
        //          this.title = this.article.title
        //          this.time = this.article.time
        //          this.read = this.article.read
        //          this.content = this.article.content
        //      }
         
        // },
        
    }
</script>

<style scoped lang='less' rel='stylesheet/less'>
    .article{
        h3{
            height: 0.9rem;
            font-size:16px;
            line-height: 0.9rem;
            background-color: #ededed;
        }
        .time{
            // height: 0.9rem;
            color: red;
            span{
                display: inline-block;
                font-size: 14px;
            }
            :nth-child(1){
                margin-left:3rem;
            }
            :nth-child(2){
                float: right;
               
                margin-right: 2em;
            }
        }
        .con{
            padding:0 15px;
            text-indent: 2em;
            font-size: 16px;
        }
    }
</style>