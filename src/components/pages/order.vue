<template>
    <div ref="tips" class="tips">
        <h222 go="true" title="我的订单" name1="user"></h222>
        <!-- 系统通知 -->
        <div class="jifen clearFix" @click="$router.push({name:'all'})">
            <span class="fl">购买订单</span>
             <img class="fr jian" src="../../../static/images/jiantou.png">
            <!-- <img class="fr" src="../../../static/images/notes.png"> -->
        </div>
        <!-- 提醒 -->
        <div class="jifen clearFix" @click="$router.push('/orderInte')">
            <span class="fl">兑换订单</span>
             <img class="fr jian" src="../../../static/images/jiantou.png">
            <!-- <img class="fr" src="../../../static/images/notes.png"> -->
        </div>
    </div>
</template>

<script>
    import h222 from '@/components/component/h2'
    
    export default {
         components: {
            h222
        },
      
         mounted() {
            var heig = document.documentElement.getBoundingClientRect().height
            // console.log(heig)
            this.$nextTick(res => this.$refs.tips.style.height = `${heig}px`)
        }
    }
</script>

<style scoped lang="less">
    .tips {
        background-color: #f6f6f7;
        .jifen {
            margin-top: 0.1rem;
            background-color: white;
            height: 0.9rem;
            line-height: 0.9rem;
            border-radius: 0.16rem;
            font-size: 0.3rem;
            span {
                font-weight: bold;
                padding-left: 0.25rem;
            }
           img.jian {
                width: 0.16rem;
                height: 0.27rem;
                padding-top: 0.3rem;
                padding-right: 0.3rem;
            }
        }
    }
</style>