<template>
    <div>
        <van-button type='primary' @click="logout">
            注销
        </van-button>
    </div>
</template>

<script>
    export default {
        methods:{
            logout(){
                localStorage.removeItem("isguide")
            }
        }
    }
</script>

<style scoped>

</style>