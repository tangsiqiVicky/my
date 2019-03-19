<template>
    <div ref="tips" class="tips">
        <hdTitle go="true" title="提醒"></hdTitle>
        <div class="wrap" v-for="(item,index) in info" :key="index" @click="go(item.issueId,item.type,item.issueType)">
            <div class="jifen clearFix">
                <span class="fl">{{item.title}}</span>
                <!-- <img class="fr" src="../../../static/images/notes.png"> -->
            </div>
            <div class="jifen2">
                <!-- <span>{{item.title}}：</span> -->
                <span>{{item.content}}</span>
            </div>
        </div>
    </div>
</template>

<script>
    import hdTitle from '@/components/component/hdTitle'
    import {
        url_26
    } from '@/serviceAPI.config.js'
    export default {
        components: {
            hdTitle
        },
        data() {
            return {
                info: [
                ]
            }
        },
        created() {
            this.axios({
                method:"get",
                params:{
                    userId:JSON.parse(localStorage["user"]).id
                },
                url:url_26
            }).then(
                res=>{
                    if(res.data.code == 100){
                        this.info = res.data.data
                        console.log(this.info)
                    }
                }
            )
        },
        methods:{
            go(idx,type1,type2){
                if(type1 == 0){
                    console.log(idx,type2)
                    this.$router.push({name:"moViDe",params:{id:idx,type:type2}})
                }
            }
        },
        mounted() {
            var heig = document.documentElement.getBoundingClientRect().height
            // console.log(heig)
            this.$nextTick(res => this.$refs.tips.style.minHeight = `${heig}px`)
        }
    }
</script>

<style scoped lang="less">
    .tips {
        background-color: #f6f6f7;
        .wrap {
            margin-top: 0.1rem;
            .jifen {
                background-color: white;
                height: 0.7rem; // line-height: 0.7rem;
                // border-radius: 0.16rem;
                font-size: 0.3rem; // transform: translateY(-0.1rem);
                span {
                    max-width: 5rem;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    height: 0.7rem;
                    line-height: 0.9rem;
                    font-weight: bold;
                    padding-left: 0.25rem;
                }
                img {
                    width: 0.23rem;
                    height: 0.23rem;
                    margin-right: 0.1rem;
                    margin-top: 0.1rem;
                }
            }
            .jifen2 {
                background-color: white;              
                line-height: 0.5rem; // border-radius: 0.16rem;
                font-size: 0.24rem;
                text-align: left;
                padding-left: 0.25rem;
                span{
                     height: 0.7rem;
                }
            }
        }
    }
</style>