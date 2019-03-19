<template>
    <div ref="tips" class="tips">
        <hdTitle go="true" title="消息"></hdTitle>
        <!-- 系统通知 -->
        <div class="jifen clearFix" @click="$router.push('/syTips')">
            <span class="fl">系统通知</span>
            <!-- <img class="fr" src="../../../static/images/notes.png"> -->
        </div>
        <!-- 提醒 -->
        <div class="jifen clearFix" @click="$router.push('/tips2')">
            <span class="fl">提醒</span>
            <!-- <img class="fr" src="../../../static/images/notes.png"> -->
        </div>
    </div>
</template>

<script>
    import hdTitle from '@/components/component/hdTitle'
    export default {
        components: {
            hdTitle
        },
        data() {
            return {}
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
          
            img {
                width: 0.23rem;
                height: 0.23rem;
                margin-right: 0.1rem;
                margin-top: 0.1rem;
            }
        }
    }
</style>