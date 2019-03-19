<template>
    <div class="pay">
        <div class="van-submit-bar__price">
            <span>合计：</span>
            <span class="van-submit-bar__price-integer">¥{{price}}</span>
            <!-- <span class="van-submit-bar__price-decimal">50</span> -->
        </div>
        <button class="van-button col"><!---->
            <span class="van-button__text">取消订单</span>
        </button>
        <button class="van-button"><!---->
            <span class="van-button__text">立即付款</span>
        </button>
    </div>
</template>

<script>
    export default {
        props:['price'],
        data(){
            return {
                
            }
        }
    }
</script>

<style scoped lang='less'>
    @colf44:#f44;
    .pay{
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        display: flex;
        height: 50px;
        font-size: 16px;
        -webkit-box-align: center;
        align-items: center;
        background-color: #fff;
        user-select: none;
        .van-submit-bar__price{
            -webkit-box-flex: 1;
            flex: 1;
            text-align: right;
            color: #666;
            padding-right: 12px;
            span{
                display: inline-block;
            }
            .van-submit-bar__price-integer {
                color: @colf44;
            }
            // .van-submit-bar__price-decimal {
            //     color: @colf44;
            //     font-size: 12px;
            // }
        }
        .van-button {
            display: inline-block;
            position: relative;
            width: 110px;
            height: 100%;
            line-height: 43px;
            box-sizing: border-box;
            border-radius: 0;
            // padding: 0 15px;
            color: #fff;
            background-color:@colf44;
            border: 1px solid @colf44;
            text-align: center;
            -webkit-appearance: none;
            font-size: 14px;
        }
        @media screen and (max-width:350px){
             .van-button{
                  width: 90px;
             }
        }
        .col{
            background-color: #ccc;
            border: 1px solid #ccc;
        }
    }
     @media screen and (max-width:300px){
         .pay{
             height: 40px;
             .van-button{
                  width: 70px;
             }
         }
     }
</style>