<template>
    <div class="dd">
        <pay1 :price='$route.params.price'></pay1>
    </div>
</template>

<script>
    import pay1 from '@/components/component/pay-1' 
    export default {
        components:{
            pay1    
        },
        data(){
            return{
                // price:35.42
            }
        },
        methods:{
            onSubmit(){

            }
        }
    }
</script>

<style scoped>

</style>