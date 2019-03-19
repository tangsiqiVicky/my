<template>
    <div class="commentBox2">
        <input ref="inp1" class="pub" type="text" v-model.trim="commentText" :placeholder="printNa">
        <div class="cancel" @click="canComment">取消</div>
        <div class="publish" @click="addComment">发送</div>
    </div>
</template>

<script>
    export default {
        props:["printNa"],
        data(){
            return {
                commentText:'',
                // name:"输入评论"
            }
        }
        ,
        methods:{
            addComment(){
                this.$emit('submit1',this.commentText)
                this.commentText=""
            },
            canComment(){
                this.$emit('submit2',"0")
                this.commentText=""
            },
            auto(){
                this.$refs.inp1.focus()
            }
        },
        watch:{
            printNa(val){
                // console.log(1,val)
            }
            // printNa:{
            //     handler:function(val){
            //         console.log(1)
            //         console.log(val)
            //     },
            //     deep:true
            // }
        }
    }
</script>

<style scoped lang='less' rel='stylesheet/less'>
    @pl:0.2rem;
    .commentBox2{
        display: flex;
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 1rem;
        background-color: white;
        z-index: 699;
        .pub{
            width: 4.5rem;
            height: 0.56rem;
            margin-top: 0.22rem;
            border-radius: 0.28rem;
            background-color: #f2f2f3;
            margin-left: 0.2rem;
            outline: none;
            border: none;
            text-indent: 1em;
            font-size: 0.24rem;
        }
        .cancel{
            width: 1.13rem;
            height: 0.56rem;
            line-height: 0.56rem;
            color: white;
            margin-top: 0.22rem;
	        background-color: red;
            border-radius: 0.1rem;
            margin-left: 0.2rem;
            font-family: PingFang-SC-Light;
	        font-size: 0.24rem;
        }
        .publish{
            width: 1.13rem;
            height: 0.56rem;
            line-height: 0.56rem;
            color: white;
            margin-top: 0.22rem;
	        background-color: #0394d3;
            border-radius: 0.1rem;
            margin-left: 0.2rem;
            font-family: PingFang-SC-Light;
	        font-size: 0.24rem;
        }
    }
</style>