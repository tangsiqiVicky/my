<template>
    <div>
        <div class="pay">
        
            <button class="van-button col" @click="ff">
                <span class="van-button__text">立即退款</span>
            </button>
       
        </div>
    </div>
</template>

<script>
    export default {
        methods:{
            ff(){
                console.log(1)
            }
        }
    }
</script>

<style scoped lang='less'>
 .pay{
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        // display: flex;
        height: 50px;
        font-size: 16px;
        background-color: #fff;
        user-select: none;
        text-align: right;
        .van-button {
            display: inline-block;
            position: relative;
            width: 110px;
            height: 100%;
            line-height: 43px;
            box-sizing: border-box;
            border-radius: 0;
            // padding: 0 15px;
            color: black;
            background-color: #ccc;
            border: 1px solid #ccc;
            text-align: center;
            -webkit-appearance: none;
            font-size: 14px;
        }
    //     @media screen and (max-width:350px){
    //          .van-button{
    //               width: 90px;
    //          }
    //     }
    //     .col{
    //         background-color: #ccc;
    //         border: 1px solid #ccc;
    //     }
    // }
    //  @media screen and (max-width:300px){
    //      .pay{
    //          height: 40px;
    //          .van-button{
    //               width: 70px;
    //          }
    //      }
     }
</style>