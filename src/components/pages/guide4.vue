<template>
    <div ref="guide4">
        <img :src="imgUrl" width="100%" height="100%">
    </div>
</template>

<script>
    export default {
        vuegConfig: {
            disable: false
        },
        data() {
            return {
                imgUrl:require("../../../static/images/guide4.png")
            }
        },
        mounted() {
            var heig = document.documentElement.getBoundingClientRect().height
            // console.log(heig)
            this.$nextTick(res => this.$refs.guide4.style.height = `${heig}px`)
        }
    }
</script>

<style scoped>

</style>