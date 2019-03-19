<template>
    <div class="wrap">
        <div class="goods" v-for="(item,index) in pic" :key="index">
            <img :src="item.image" width="100%">
            <div class="idx">
                {{item.num}}
            </div>
            <div class="like" @click="like(index)">
                <img :src="item.isLike?likePic.likeyes:likePic.like" width="100%" height="100%">
            </div>
        </div>
    </div>
</template>

<script>
    import {url2} from '@/serviceAPI.config.js'
    export default {
        data(){
            return{
                pic:[],
                likePic:{
                    like:"../../../static/img/like.png",
                    likeyes:"../../../static/img/likeyes.png"
                },
                isLike:false
            }
        },
        created(){
            this.axios({
                method:'post',
                url:url2
            }).then(
                res=>{
                    this.pic = res.data.data.slides
                    console.log(this.pic)
                }
            )
        },
        methods:{
            like(index){
                if(localStorage["token"]){
                    if(this.pic[index].isLike){
                        this.$dialog.alert({
                            message:"您已经点过赞啦"
                        })
                    }else{
                        console.log(1)
                    }
                }else{
                     this.$dialog.confirm({
                        message:'登录才能评论',
                        showCancelButton:true,
                        confirmButtonText:"去登陆",
                    }).then(
                       ()=> this.$router.push("/login")
                        ).catch(()=>{})
                }
            }
        }
    }
</script>

<style scoped lang="less">
    .wrap{
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        .goods{
            position: relative;
            width:100%;
            height: auto;
            .idx{
                position: absolute;
                left: 0;
                bottom: 0;
            }
            .like{
                position: absolute;
                right: 0;
                bottom: 0;
                width: 0.3rem;
                height: 0.3rem;
                img{
                    display: block;
                }
            }
        }
       
    }

</style>