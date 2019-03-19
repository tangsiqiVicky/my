<template>
    <div class="addBank" ref="addBank">
        <hdTitle go="true" title="绑定银行卡"></hdTitle>
        <router-view></router-view>
    </div>
</template>

<script>
    import hdTitle from '@/components/component/hdTitle'
    export default {
        components: {
            hdTitle
        },
        mounted() {
            var heig = document.documentElement.getBoundingClientRect().height
            // console.log(heig)
            this.$nextTick(res => this.$refs.addBank.style.height = `${heig}px`)
        }
    }
</script>

<style scoped lang="less" rel="stylesheet/less">
    .addBank {
        background-color: #f6f6f7;
       
    }
</style>