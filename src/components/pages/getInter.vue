<template>
    <div class="infoDe" ref="infoDe">
        <hdTitle go="true" title="积分介绍"></hdTitle>
        <div class="wrap">
            <div class="con">
                <p>
                     1、点亮爱心每颗等于{{num}}积分
                </p>
               <p>
                   2、您可发布旅行相关短视频获得用户点亮爱心，也可以邀请好友为您发布的短视频点亮红心。
               </p>
               <p>
                   3、每人每天仅有5次点亮爱心权限
               </p>
               <p>
                   4、您所获得的积分可在积分兑换区兑换相应的产品
               </p>
               <p>
                   5、积分兑换完毕即会减去相应积分
               </p>
               <p>
                   6、红心点亮不可撤销
               </p>
               <p>
                   7、积分不可提现
               </p>
               <p>
                   8、积分兑换最终解释权归墨鱼环球所有
               </p>
            </div>
        </div>
    </div>
</template>

<script>
    import hdTitle from '@/components/component/hdTitle'
    import {
        url_48
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
               num:1
            }
        },
        created() {
           this.axios({
               method:"get",
               url:url_48
           }).then(res =>{
               if(res.data.code ==100){
                //    console.log(res.data.data)
                   this.num = res.data.data.num
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
            .con{
                text-align: left;
                // text-indent: 2em;
                padding: 10px;
                p{
                    width: 6rem;
                    margin: auto;
                    padding-top: 0.1rem;
                }
            }
        
        }
    }
</style>